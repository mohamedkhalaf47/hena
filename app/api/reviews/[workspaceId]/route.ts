import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Review from "@/models/review";
import { auth } from "@clerk/nextjs/server";
import Workspace from "@/models/workspace";

export async function GET(
	req: Request,
	{ params }: { params: Promise<{ workspaceId: string }> },
) {
	try {
		await connectDB();

		const { searchParams } = new URL(req.url);

		const page = Number(searchParams.get("page") || 1);

		const limit = 4;

		const skip = (page - 1) * limit;

		const reviews = await Review.find({
			workspace: (await params).workspaceId,
		})
			.sort({
				createdAt: -1,
			})
			.skip(skip)
			.limit(limit);

		return NextResponse.json(reviews);
	} catch (error) {
		return NextResponse.json(
			{
				message:
					error instanceof Error ? error.message : "An unknown error occurred",
			},
			{
				status: 500,
			},
		);
	}
}

export async function DELETE(
	_: Request,
	{ params }: { params: Promise<{ workspaceId: string }> },
) {
	try {
		const { userId } = await auth();

		if (!userId) {
			return NextResponse.json(
				{
					message: "Unauthorized",
				},
				{
					status: 401,
				},
			);
		}

		await connectDB();

		const review = await Review.findById((await params).workspaceId);

		if (!review) {
			return NextResponse.json(
				{
					message: "Review not found",
				},
				{
					status: 404,
				},
			);
		}

		if (review.clerkUserId !== userId) {
			return NextResponse.json(
				{
					message: "Forbidden",
				},
				{
					status: 403,
				},
			);
		}

		await review.deleteOne();

		const result = await Review.aggregate([
			{ $match: { workspace: review.workspace } },
			{ $group: { _id: null, avg: { $avg: "$rating" }, count: { $sum: 1 } } },
		]);

		await Workspace.findByIdAndUpdate(review.workspace, {
			averageRating: result[0]?.avg ?? 0,
			reviewsCount: result[0]?.count ?? 0,
		});

		return NextResponse.json({
			success: true,
		});
	} catch (error) {
		return NextResponse.json(
			{
				message:
					error instanceof Error ? error.message : "An unknown error occurred",
			},
			{
				status: 500,
			},
		);
	}
}

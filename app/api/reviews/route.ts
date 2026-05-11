import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import Review from "@/models/review";
import Workspace from "@/models/workspace";
import { Types } from "mongoose";

export async function POST(req: Request) {
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

		const user = await currentUser();
		if (!user) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const body = await req.json();

		const review = await Review.findOneAndUpdate(
			{ clerkUserId: userId, workspace: body.workspace },
			{
				rating: body.rating,
				comment: body.comment,
				userName: user.fullName,
				userImage: user.imageUrl,
			},
			{ upsert: true, new: true },
		);

		const result = await Review.aggregate([
			{ $match: { workspace: new Types.ObjectId(body.workspace) } },
			{ $group: { _id: null, avg: { $avg: "$rating" }, count: { $sum: 1 } } },
		]);

		await Workspace.findByIdAndUpdate(body.workspace, {
			averageRating: result[0]?.avg ?? 0,
			reviewsCount: result[0]?.count ?? 0,
		});

		return NextResponse.json(review, {
			status: 201,
		});
	} catch (error) {
		console.log(error);
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

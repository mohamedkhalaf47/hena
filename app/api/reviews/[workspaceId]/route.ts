import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Review from "@/models/review";

export async function GET(
	_req: unknown,
	{ params }: { params: Promise<{ workspaceId: string }> },
) {
	try {
		await connectDB();
		const { workspaceId } = await params;

		const reviews = await Review.find({
			workspace: workspaceId,
		}).sort({ createdAt: -1 });

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

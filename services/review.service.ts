import { connectDB } from "@/lib/db";

import Review from "@/models/review";

export async function getWorkspaceReviews(workspaceId: string, limit = 4) {
	try {
		await connectDB();

		const reviews = await Review.find({
			workspace: workspaceId,
		})
			.sort({
				createdAt: -1,
			})
			.limit(limit)
			.lean();

		return JSON.parse(JSON.stringify(reviews));
	} catch (error) {
		console.error(error);

		throw new Error("Failed to fetch reviews");
	}
}

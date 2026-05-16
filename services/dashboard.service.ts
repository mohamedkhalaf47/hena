import { connectDB } from "@/lib/db";
import Workspace from "@/models/workspace";
import Review from "@/models/review";

export async function getDashboardStats() {
	await connectDB();

	const [totalWorkspaces, totalReviews, ratingResult] = await Promise.all([
		Workspace.countDocuments(),
		Review.countDocuments(),
		Workspace.aggregate([
			{ $match: { averageRating: { $gt: 0 } } },
			{ $group: { _id: null, avg: { $avg: "$averageRating" } } },
		]),
	]);

	return {
		totalWorkspaces,
		totalReviews,
		averageRating: ratingResult[0]?.avg
			? Number(ratingResult[0].avg.toFixed(1))
			: 0,
	};
}

export async function getDashboardWorkspaces() {
	await connectDB();
	const workspaces = await Workspace.find({})
		.select("name shortAddress averageRating reviewsCount pricing createdAt")
		.sort({ createdAt: -1 })
		.lean();
	return JSON.parse(JSON.stringify(workspaces));
}

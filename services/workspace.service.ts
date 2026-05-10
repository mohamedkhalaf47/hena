import { connectDB } from "@/lib/db";
import Workspace from "@/models/workspace";

interface GetWorkspacesParams {
	search?: string;
	feature?: string | string[];
	sort?: string;
	minPrice?: string;
	maxPrice?: string;
}

export async function getWorkspaces(params: GetWorkspacesParams = {}) {
	await connectDB();

	const query: Record<string, unknown> = {};

	if (params.search) {
		query.$text = { $search: params.search };
	}

	if (params.feature) {
		const features = Array.isArray(params.feature)
			? params.feature
			: [params.feature];
		query.features = { $all: features };
	}

	if (params.minPrice || params.maxPrice) {
		query["pricing.startingFrom"] = {
			...(params.minPrice && { $gte: Number(params.minPrice) }),
			...(params.maxPrice && { $lte: Number(params.maxPrice) }),
		};
	}

	let sortQuery: Record<string, 1 | -1> = { createdAt: -1 };
	if (params.sort === "rating") sortQuery = { averageRating: -1 };
	else if (params.sort === "price-asc")
		sortQuery = { "pricing.startingFrom": 1 };
	else if (params.sort === "price-desc")
		sortQuery = { "pricing.startingFrom": -1 };

	const workspaces = await Workspace.find(query).sort(sortQuery).lean();
	return JSON.parse(JSON.stringify(workspaces));
}

export async function getAllFeatures(): Promise<string[]> {
	await connectDB();
	const workspaces = await Workspace.find({}).select("features").lean();
	const features = (workspaces as { features: string[] }[]).flatMap(
		(ws) => ws.features,
	);
	return [...new Set(features)];
}

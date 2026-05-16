import type { MetadataRoute } from "next";
import { connectDB } from "@/lib/db";
import Workspace from "@/models/workspace";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	await connectDB();

	const workspaces = (await Workspace.find({})
		.select("slug updatedAt")
		.lean()) as { slug: string; updatedAt: Date }[];

	const workspaceUrls = workspaces.map((ws) => ({
		url: `https://hena-workspaces.vercel.app/workspaces/${ws.slug}`,
		lastModified: ws.updatedAt,
		changeFrequency: "weekly" as const,
		priority: 0.8,
	}));

	return [
		{
			url: "https://hena-workspaces.vercel.app",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 1,
		},
		{
			url: "https://hena-workspaces.vercel.app/workspaces",
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.9,
		},
		...workspaceUrls,
	];
}

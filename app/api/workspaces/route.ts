import { NextResponse } from "next/server";
import slugify from "slugify";

import { connectDB } from "@/lib/db";
import Workspace from "@/models/workspace";
import { workspaceSchema } from "@/lib/validations/workspace.validation";
import { getWorkspaces } from "@/services/workspace.service";

export async function POST(req: Request) {
	try {
		await connectDB();

		const body = await req.json();

		const validatedData = workspaceSchema.parse(body);

		const slug = slugify(validatedData.name, {
			lower: true,
			strict: true,
		});

		const existingWorkspace = await Workspace.findOne({ slug });

		if (existingWorkspace) {
			return NextResponse.json(
				{
					message: "Workspace already exists",
				},
				{
					status: 400,
				},
			);
		}

		const workspace = await Workspace.create({
			...validatedData,
			slug,
		});

		return NextResponse.json(workspace, {
			status: 201,
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

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);

		const workspaces = await getWorkspaces({
			search: searchParams.get("search") ?? undefined,
			feature: searchParams.getAll("feature"),
			sort: searchParams.get("sort") ?? undefined,
			minPrice: searchParams.get("minPrice") ?? undefined,
			maxPrice: searchParams.get("maxPrice") ?? undefined,
		});

		return NextResponse.json(workspaces);
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

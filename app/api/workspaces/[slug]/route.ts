import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Workspace from "@/models/workspace";

export async function GET(
	_req: unknown,
	{ params }: { params: Promise<{ slug: string }> },
) {
	try {
		await connectDB();
		const { slug } = await params;

		const workspace = await Workspace.findOne({
			slug: slug,
		});

		if (!workspace) {
			return NextResponse.json(
				{
					message: "Workspace not found",
				},
				{
					status: 404,
				},
			);
		}

		return NextResponse.json(workspace);
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

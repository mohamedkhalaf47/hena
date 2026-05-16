import { notFound } from "next/navigation";
import WorkspaceGallery from "@/components/workspace/workspace-gallery";
import WorkspaceHeader from "@/components/workspace/workspace-header";
import {
	getRelatedWorkspaces,
	getWorkspaceBySlug,
} from "@/services/workspace.service";
import WorkspaceAbout from "@/components/workspace/workspace-about";
import WorkspaceFeatures from "@/components/workspace/workspace-features";
import WorkspaceWorkingHours from "@/components/workspace/workspace-working-hours";
import WorkspaceSidebar from "@/components/workspace/workspace-sidebar";
import { auth } from "@clerk/nextjs/server";
import RelatedWorkspaces from "@/components/workspace/related-workspaces";
import { getWorkspaceReviews } from "@/services/review.service";
import WorkspaceReviewsSection from "@/components/workspace/workspace-reviews-section";
import Workspace from "@/models/workspace";
import { connectDB } from "@/lib/db";
import type { Metadata } from "next";

interface Props {
	params: Promise<{
		slug: string;
	}>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;

	await connectDB();
	const workspace = (await Workspace.findOne({ slug })
		.select("name shortAddress description images")
		.lean()) as {
		name: string;
		shortAddress: string;
		description: string;
		images: string[];
	} | null;

	if (!workspace) {
		return {
			title: "Workspace Not Found",
		};
	}

	return {
		title: workspace.name,
		description: workspace.description,
		openGraph: {
			title: `${workspace.name} | Hena`,
			description: workspace.description,
			images: workspace.images[0]
				? [{ url: workspace.images[0], width: 1200, height: 630 }]
				: [],
		},
		twitter: {
			card: "summary_large_image",
			title: `${workspace.name} | Hena`,
			description: workspace.description,
			images: workspace.images[0] ? [workspace.images[0]] : [],
		},
	};
}

export async function generateStaticParams() {
	await connectDB();
	const workspaces = (await Workspace.find({}).select("slug").lean()) as {
		slug: string;
	}[];
	return workspaces.map((ws) => ({ slug: ws.slug }));
}

export default async function WorkspacePage({ params }: Props) {
	const { slug } = await params;

	const workspace = await getWorkspaceBySlug(slug);

	if (!workspace) {
		notFound();
	}

	const relatedWorkspaces = await getRelatedWorkspaces(workspace._id);

	const { userId } = await auth();

	const reviews = await getWorkspaceReviews(workspace._id);

	return (
		<main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
			<div className="space-y-8">
				<WorkspaceHeader workspace={workspace} />
				<WorkspaceGallery images={workspace.images} />
				<div className="grid gap-12 lg:grid-cols-[1fr_380px]">
					{/* Left Content */}
					<div className="space-y-14">
						<WorkspaceAbout description={workspace.description} />

						<WorkspaceFeatures features={workspace.features} />

						<WorkspaceWorkingHours
							open={workspace.workingHours.open}
							close={workspace.workingHours.close}
						/>

						<WorkspaceReviewsSection
							initialReviews={reviews}
							workspaceId={workspace._id}
							currentUserId={userId}
							showForm={!!userId}
							averageRating={workspace.averageRating}
							reviewsCount={workspace.reviewsCount}
						/>
						<RelatedWorkspaces workspaces={relatedWorkspaces} />
					</div>

					{/* Sidebar */}
					<WorkspaceSidebar workspace={workspace} />
				</div>
			</div>
		</main>
	);
}

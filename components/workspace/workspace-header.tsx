import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { WorkspaceSlug } from "@/types/types";

interface Props {
	workspace: WorkspaceSlug;
}

export default function WorkspaceHeader({ workspace }: Props) {
	return (
		<section className="space-y-4">
			{/* Breadcrumbs */}
			<div className="flex items-center gap-1.5 text-label-sm font-label-sm text-muted-foreground">
				<Link
					href="/workspaces"
					className="transition-colors hover:text-primary"
				>
					Workspaces
				</Link>
				<span className="text-muted-foreground/50">/</span>
				<span className="text-foreground">{workspace.name}</span>
			</div>

			{/* Title */}
			<h1 className="max-w-4xl font-heading text-4xl font-bold tracking-tight lg:text-5xl">
				{workspace.name}
			</h1>

			{/* Meta */}
			<div className="flex flex-wrap items-center gap-6">
				<div className="flex items-center gap-1.5">
					<Star className="h-4 w-4 fill-warning-accent text-warning-accent" />
					<span className="font-label-md text-label-md font-medium">
						{workspace.averageRating.toFixed(1)}
					</span>
					<span className="text-body-sm text-muted-foreground">
						({workspace.reviewsCount} reviews)
					</span>
				</div>

				<div className="flex items-center gap-1.5 text-muted-foreground">
					<MapPin className="h-4 w-4" />
					<a
						href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(workspace.address)}`}
						target="_blank"
						rel="noopener noreferrer"
						className="text-body-sm underline decoration-dotted underline-offset-4 transition-colors hover:text-primary"
					>
						{workspace.address}
					</a>
				</div>
			</div>
		</section>
	);
}

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { Workspace } from "@/types/types";

interface Props {
	workspaces: Workspace[];
}

export default function RelatedWorkspaces({ workspaces }: Props) {
	return (
		<section className="space-y-8">
			<div className="space-y-2">
				<h2 className="font-heading text-2xl font-bold tracking-tight">
					You may also like
				</h2>
				<div className="h-1 w-12 rounded-full bg-primary/20" />
			</div>

			<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
				{workspaces.map((workspace) => (
					<Link
						key={workspace._id}
						href={`/workspaces/${workspace.slug}`}
						className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-md"
					>
						{/* Image */}
						<div className="relative h-52 overflow-hidden">
							<Image
								src={workspace.images[0]}
								alt={workspace.name}
								fill
								className="object-cover transition-transform duration-500 group-hover:scale-105"
							/>
						</div>

						{/* Content */}
						<div className="space-y-3 p-5">
							<div>
								<h3 className="font-label-md font-semibold text-foreground">
									{workspace.name}
								</h3>
								<p className="mt-1 text-body-sm text-muted-foreground">
									{workspace.shortAddress}
								</p>
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center gap-1.5">
									<Star className="h-4 w-4 fill-warning-accent text-warning-accent" />
									<span className="text-label-sm font-medium">
										{workspace.averageRating.toFixed(1)}
									</span>
								</div>

								<span className="text-body-sm">
									<span className="font-semibold text-primary">
										{workspace.pricing.startingFrom} EGP
									</span>
									<span className="text-muted-foreground"> /hr</span>
								</span>
							</div>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
}

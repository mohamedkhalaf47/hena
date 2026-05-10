import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Workspace } from "@/types/types";
import { FEATURE_LABELS } from "@/utils/constants";

export function WorkspaceCard({ workspace }: { workspace: Workspace }) {
	return (
		<Card className="overflow-hidden border-border hover:shadow-lg transition-shadow flex flex-col group">
			{/* Image */}
			<div className="relative h-48 w-full overflow-hidden bg-linear-to-br from-[#e2dfff] to-[#4f46e5]">
				{workspace.images[0] && (
					<Image
						src={workspace.images[0]}
						alt={workspace.name}
						className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
						fill={true}
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				)}
				{/* Rating Badge */}
				<div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
					<Star size={14} className="fill-amber-400 text-amber-400" />
					<span className="font-plex text-xs font-semibold text-on-surface">
						{workspace.averageRating > 0
							? workspace.averageRating.toFixed(1)
							: "New"}
					</span>
				</div>
			</div>

			{/* Content */}
			<div className="p-4 flex flex-col grow">
				<div className="mb-1">
					<h3 className="font-jakarta font-bold text-lg text-on-surface group-hover:text-primary transition-colors">
						{workspace.name}
					</h3>
					<p className="font-inter text-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
						<MapPin size={13} />
						{workspace.shortAddress}
					</p>
				</div>

				{/* Features */}
				<div className="flex flex-wrap gap-1.5 my-3">
					{workspace.features.slice(0, 3).map((feature) => (
						<span
							key={feature}
							className="px-2 py-0.5 bg-muted text-muted-foreground rounded-full text-[10px] uppercase font-bold tracking-wider font-plex"
						>
							{FEATURE_LABELS[feature] ?? feature}
						</span>
					))}
				</div>

				{/* Footer */}
				<div className="mt-auto flex items-center justify-between border-t border-border pt-4">
					<div>
						<p className="text-xs font-inter text-on-surface-variant">
							Starts from
						</p>
						<p className="font-jakarta font-bold text-lg text-primary">
							{workspace.pricing.startingFrom} EGP{" "}
							<sub className="text-black">/hr</sub>
						</p>
					</div>
					<Button asChild className="font-plex font-medium py-6 px-6">
						<Link href={`/workspaces/${workspace.slug}`}>View Details</Link>
					</Button>
				</div>
			</div>
		</Card>
	);
}

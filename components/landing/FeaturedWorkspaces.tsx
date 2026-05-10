import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import Workspace from "@/models/workspace";
import Image from "next/image";

interface WorkspaceDoc {
	_id: string;
	name: string;
	slug: string;
	address: string;
	images: string[];
	features: string[];
	averageRating: number;
	pricing: {
		startingFrom: number;
	};
}

async function getFeaturedWorkspaces(): Promise<WorkspaceDoc[]> {
	await connectDB();
	const workspaces = await Workspace.find({})
		.limit(3)
		.sort({ averageRating: -1 })
		.lean();
	return JSON.parse(JSON.stringify(workspaces));
}

export async function FeaturedWorkspaces() {
	const workspaces = await getFeaturedWorkspaces();

	return (
		<section className="py-12 md:py-16 bg-[#f5f2ff]">
			<div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mb-12">
					<h2 className="text-3xl md:text-4xl font-jakarta font-bold text-on-surface mb-2">
						Featured Workspaces
					</h2>
					<p className="font-inter text-on-surface-variant">
						Popular spaces loved by students and professionals
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-6">
					{workspaces.map((ws) => (
						<Card
							key={ws._id}
							className="overflow-hidden hover:shadow-lg transition-shadow border-outline-variant"
						>
							{/* Image */}
							<div className="h-48 relative bg-linear-to-br from-primary-container to-primary">
								{ws.images[0] && (
									<Image
										src={ws.images[0]}
										alt={ws.name}
										width={500}
										height={300}
										className="w-full h-full object-cover"
									/>
								)}
								<div className="absolute top-3 right-3">
									<Badge className="bg-primary text-primary-foreground flex gap-1 font-plex">
										<Star size={14} className="fill-current" />
										{ws.averageRating > 0 ? ws.averageRating.toFixed(1) : "New"}
									</Badge>
								</div>
							</div>

							{/* Content */}
							<div className="p-4">
								<div className="flex justify-between items-start mb-3">
									<h3 className="font-jakarta font-bold text-lg text-on-surface flex-1">
										{ws.name}
									</h3>
									<p className="font-jakarta font-bold text-primary whitespace-nowrap ml-2">
										{ws.pricing.startingFrom} EGP/hr
									</p>
								</div>

								<p className="font-inter text-sm text-on-surface-variant mb-4">
									{ws.address}
								</p>

								{/* Features */}
								<div className="flex flex-wrap gap-2 mb-4">
									{ws.features.slice(0, 3).map((feature) => (
										<Badge
											key={feature}
											variant="outline"
											className="text-xs font-plex border-outline-variant capitalize"
										>
											{feature}
										</Badge>
									))}
								</div>

								<Button
									asChild
									variant="default"
									className="w-full font-plex font-medium"
								>
									<Link href={`/workspaces/${ws.slug}`}>View</Link>
								</Button>
							</div>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}

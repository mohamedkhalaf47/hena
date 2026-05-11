import Link from "next/link";
import { ExternalLink, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkspaceSlug } from "@/types/types";

interface Props {
	workspace: WorkspaceSlug;
}

export default function WorkspaceSidebar({ workspace }: Props) {
	return (
		<aside className="self-start lg:sticky lg:top-24">
			<div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
				{/* Price */}
				<div className="border-b border-border pb-5">
					<div className="flex items-end gap-2">
						<span className="font-heading text-4xl font-bold text-foreground">
							{workspace.pricing.startingFrom}{" "}
							<span className="text-primary">EGP</span>
						</span>
						<span className="mb-1 text-body-sm text-muted-foreground">/hr</span>
					</div>
				</div>

				{/* Packages */}
				<div className="space-y-3 py-5">
					{workspace.pricing.packages.map((pkg, index) => (
						<div
							key={index}
							className="rounded-xl border border-border bg-surface-container-low p-4 transition-colors duration-200 hover:border-primary/20"
						>
							<div className="flex items-center justify-between">
								<h3 className="font-label-md font-semibold text-foreground">
									{pkg.label}
								</h3>
								<span className="font-label-md font-semibold text-primary">
									{pkg.price} EGP
								</span>
							</div>
							<p className="mt-1.5 text-body-sm text-muted-foreground">
								{pkg.description}
							</p>
						</div>
					))}
				</div>

				{/* CTA */}
				<div className="space-y-2.5 border-t border-border pt-5">
					{workspace.contact.whatsapp && (
						<Button asChild className="h-11 w-full rounded-xl">
							<Link
								href={`https://wa.me/${workspace.contact.whatsapp}`}
								target="_blank"
							>
								<MessageCircle className="mr-2 h-4 w-4" />
								Contact on WhatsApp
							</Link>
						</Button>
					)}

					{workspace.contact.phone && (
						<Button
							asChild
							variant="outline"
							className="h-11 w-full rounded-xl"
						>
							<Link href={`tel:${workspace.contact.phone}`}>
								<Phone className="mr-2 h-4 w-4" />
								Call Workspace
							</Link>
						</Button>
					)}

					<Button
						asChild
						variant="secondary"
						className="h-11 w-full rounded-xl"
					>
						<Link
							href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(workspace.address)}`}
							target="_blank"
						>
							<ExternalLink className="mr-2 h-4 w-4" />
							Open in Maps
						</Link>
					</Button>
				</div>
			</div>
		</aside>
	);
}

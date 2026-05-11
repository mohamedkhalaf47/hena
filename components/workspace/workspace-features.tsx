import { FEATURES } from "@/utils/constants";

interface Props {
	features: string[];
}

export default function WorkspaceFeatures({ features }: Props) {
	return (
		<section className="space-y-6">
			<div className="space-y-2">
				<h2 className="font-heading text-2xl font-bold tracking-tight">
					Amenities
				</h2>
				<div className="h-1 w-12 rounded-full bg-primary/20" />
			</div>

			<div className="grid gap-3 sm:grid-cols-2">
				{features.map((feature) => {
					const item = FEATURES[feature as keyof typeof FEATURES];
					if (!item) return null;
					const Icon = item.icon;

					return (
						<div
							key={feature}
							className="group rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/20 hover:bg-surface-container-low"
						>
							<div className="flex items-start gap-4">
								<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary/15">
									<Icon className="h-5 w-5" />
								</div>
								<div className="space-y-1">
									<h3 className="font-label-md text-label-md font-semibold text-foreground">
										{item.label}
									</h3>
									<p className="text-body-sm text-muted-foreground">
										{item.description}
									</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}

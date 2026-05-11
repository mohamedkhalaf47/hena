interface Props {
	open: string;
	close: string;
}

export default function WorkspaceWorkingHours({ open, close }: Props) {
	return (
		<section className="space-y-6">
			<div className="space-y-2">
				<h2 className="font-heading text-2xl font-bold tracking-tight">
					Working hours
				</h2>
				<div className="h-1 w-12 rounded-full bg-primary/20" />
			</div>

			<div className="rounded-xl border border-border bg-card p-5">
				<div className="flex items-center justify-between">
					<div>
						<h3 className="font-label-md font-semibold text-foreground">
							Open Daily
						</h3>
						<p className="mt-1 text-body-sm text-muted-foreground">
							Hosted by Hena
						</p>
					</div>

					<div className="text-right">
						<p className="font-label-md font-semibold text-foreground">
							{open} – {close}
						</p>
						<p className="mt-1 text-body-sm text-success-accent">
							Available now
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

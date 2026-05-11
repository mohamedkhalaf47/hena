export default function WorkspaceReviewsSkeleton() {
	return (
		<div className="space-y-4">
			{Array.from({ length: 3 }).map((_, index) => (
				<div
					key={index}
					className="animate-pulse rounded-xl border border-border bg-card p-6"
				>
					<div className="flex items-start gap-4">
						<div className="h-11 w-11 shrink-0 rounded-full bg-muted" />
						<div className="flex-1 space-y-3">
							<div className="space-y-1.5">
								<div className="h-4 w-28 rounded-lg bg-muted" />
								<div className="h-3 w-20 rounded-lg bg-muted" />
							</div>
							<div className="space-y-2">
								<div className="h-3 w-full rounded-lg bg-muted" />
								<div className="h-3 w-4/5 rounded-lg bg-muted" />
								<div className="h-3 w-3/5 rounded-lg bg-muted" />
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

import { Skeleton } from "@/components/ui/skeleton";

export default function WorkspaceDetailsLoading() {
	return (
		<main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
			{/* Images */}
			<Skeleton className="w-full h-80 rounded-2xl" />

			{/* Header */}
			<div className="flex justify-between items-start">
				<div className="space-y-2">
					<Skeleton className="h-8 w-64" />
					<Skeleton className="h-4 w-40" />
				</div>
				<Skeleton className="h-8 w-24 rounded-full" />
			</div>

			{/* Details Grid */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{Array.from({ length: 3 }).map((_, i) => (
					<div
						key={i}
						className="rounded-xl border border-border p-5 space-y-3"
					>
						<Skeleton className="h-5 w-28" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-3/4" />
					</div>
				))}
			</div>

			{/* Features */}
			<div className="space-y-3">
				<Skeleton className="h-5 w-24" />
				<div className="flex flex-wrap gap-2">
					{Array.from({ length: 6 }).map((_, i) => (
						<Skeleton key={i} className="h-7 w-20 rounded-full" />
					))}
				</div>
			</div>

			{/* Reviews */}
			<div className="space-y-4">
				<Skeleton className="h-6 w-32" />
				{Array.from({ length: 3 }).map((_, i) => (
					<div
						key={i}
						className="rounded-xl border border-border p-4 space-y-2"
					>
						<div className="flex items-center gap-3">
							<Skeleton className="h-9 w-9 rounded-full" />
							<div className="space-y-1">
								<Skeleton className="h-4 w-28" />
								<Skeleton className="h-3 w-20" />
							</div>
						</div>
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-3/4" />
					</div>
				))}
			</div>
		</main>
	);
}

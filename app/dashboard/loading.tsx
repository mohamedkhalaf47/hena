import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
	return (
		<div className="space-y-8">
			{/* Header */}
			<div className="space-y-2">
				<Skeleton className="h-7 w-32" />
				<Skeleton className="h-4 w-56" />
			</div>

			{/* Stats */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{Array.from({ length: 3 }).map((_, i) => (
					<div
						key={i}
						className="rounded-xl border border-border p-6 flex items-center gap-4 bg-white"
					>
						<Skeleton className="h-12 w-12 rounded-xl" />
						<div className="space-y-2">
							<Skeleton className="h-3 w-24" />
							<Skeleton className="h-7 w-16" />
						</div>
					</div>
				))}
			</div>

			{/* Table */}
			<div className="rounded-xl border border-border overflow-hidden bg-white">
				<div className="flex justify-between items-center px-6 py-4 border-b border-border">
					<Skeleton className="h-5 w-28" />
					<Skeleton className="h-9 w-28 rounded-lg" />
				</div>
				<div className="divide-y divide-border">
					{Array.from({ length: 4 }).map((_, i) => (
						<div key={i} className="flex items-center gap-4 px-6 py-4">
							<Skeleton className="h-4 w-40" />
							<Skeleton className="h-4 w-28 ml-4" />
							<Skeleton className="h-4 w-16 ml-auto" />
							<Skeleton className="h-4 w-12" />
							<Skeleton className="h-4 w-8" />
							<Skeleton className="h-8 w-8 rounded-lg" />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

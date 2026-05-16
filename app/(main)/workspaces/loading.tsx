import { Skeleton } from "@/components/ui/skeleton";

export default function WorkspacesLoading() {
	return (
		<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
			{/* Sidebar Skeleton */}
			<aside className="hidden md:block w-64 shrink-0 space-y-6">
				<Skeleton className="h-6 w-24" />
				<div className="space-y-3">
					<Skeleton className="h-4 w-20" />
					<Skeleton className="h-10 w-full" />
					<Skeleton className="h-10 w-full" />
				</div>
				<div className="space-y-3">
					<Skeleton className="h-4 w-20" />
					{Array.from({ length: 6 }).map((_, i) => (
						<Skeleton key={i} className="h-5 w-full" />
					))}
				</div>
			</aside>

			{/* Main Skeleton */}
			<section className="grow">
				<div className="flex justify-between items-center mb-8">
					<div className="space-y-2">
						<Skeleton className="h-8 w-48" />
						<Skeleton className="h-4 w-32" />
					</div>
					<Skeleton className="h-10 w-36" />
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
					{Array.from({ length: 6 }).map((_, i) => (
						<div
							key={i}
							className="rounded-xl border border-border overflow-hidden"
						>
							<Skeleton className="h-48 w-full" />
							<div className="p-4 space-y-3">
								<Skeleton className="h-5 w-3/4" />
								<Skeleton className="h-4 w-1/2" />
								<div className="flex gap-2">
									<Skeleton className="h-5 w-16 rounded-full" />
									<Skeleton className="h-5 w-16 rounded-full" />
									<Skeleton className="h-5 w-16 rounded-full" />
								</div>
								<div className="flex justify-between items-center pt-2 border-t border-border">
									<Skeleton className="h-6 w-20" />
									<Skeleton className="h-9 w-28 rounded-lg" />
								</div>
							</div>
						</div>
					))}
				</div>
			</section>
		</main>
	);
}

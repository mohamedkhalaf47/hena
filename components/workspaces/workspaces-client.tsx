"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { WorkspaceCard } from "./workspace-card";
import { MapPin } from "lucide-react";
import { Workspace } from "@/types/types";
import { SidebarFilters } from "./sidebar-filters";
import { MobileFilters } from "./mobile-filters";

interface Props {
	initialWorkspaces: Workspace[];
	features: string[];
	initialParams: {
		search?: string;
		feature?: string;
		sort?: string;
	};
}

export function WorkspacesClient({
	initialWorkspaces,
	features,
	initialParams,
}: Props) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const selectedFeatures = searchParams.getAll("feature");

	const updateFeatures = useCallback(
		(features: string[]) => {
			const params = new URLSearchParams(searchParams.toString());
			params.delete("feature");
			features.forEach((f) => params.append("feature", f));
			router.push(`${pathname}?${params.toString()}`);
		},
		[router, pathname, searchParams],
	);

	const updateParam = useCallback(
		(key: string, value: string | null) => {
			const params = new URLSearchParams(searchParams.toString());
			if (value) params.set(key, value);
			else params.delete(key);
			router.push(`${pathname}?${params.toString()}`);
		},
		[router, pathname, searchParams],
	);

	return (
		<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
			{/* Sidebar — Desktop only */}
			<aside className="hidden md:block w-64 shrink-0">
				<SidebarFilters
					features={features}
					selectedFeatures={selectedFeatures}
					onFeaturesChange={updateFeatures}
				/>
			</aside>

			{/* Main Content */}
			<section className="grow">
				{/* Header */}
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-16 mb-8">
					<div className="flex items-center gap-3 md:flex-row flex-col">
						{/* Mobile Filter Button */}
						<MobileFilters
							features={features}
							selectedFeatures={selectedFeatures}
							onFeaturesChange={updateFeatures}
						/>
						<div>
							<h1 className="font-jakarta font-bold text-3xl text-on-surface">
								Available Spaces
							</h1>
							<p className="font-inter text-on-surface-variant mt-1">
								{initialWorkspaces.length}{" "}
								{initialWorkspaces.length === 1 ? "workspace" : "workspaces"} in
								Assiut
							</p>
						</div>
					</div>

					{/* Sort */}
					<div className="flex items-center gap-2">
						<span className="text-sm font-inter text-on-surface-variant">
							Sort by:
						</span>
						<select
							value={initialParams.sort ?? ""}
							onChange={(e) => updateParam("sort", e.target.value || null)}
							className="rounded-lg border border-border text-sm font-inter bg-background text-on-surface px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
						>
							<option value="">Latest</option>
							<option value="rating">Top Rated</option>
							<option value="price-asc">Price: Low to High</option>
							<option value="price-desc">Price: High to Low</option>
						</select>
					</div>
				</div>

				{/* Grid */}
				{initialWorkspaces.length === 0 ? (
					<div className="flex flex-col items-center justify-center py-24 text-center">
						<MapPin size={48} className="text-muted-foreground mb-4" />
						<h3 className="font-jakarta font-bold text-xl text-on-surface mb-2">
							No workspaces found
						</h3>
						<p className="font-inter text-on-surface-variant">
							Try adjusting your filters
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
						{initialWorkspaces.map((ws) => (
							<WorkspaceCard key={ws._id} workspace={ws} />
						))}
					</div>
				)}
			</section>
		</main>
	);
}

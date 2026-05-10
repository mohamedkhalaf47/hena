"use client";

import { FeaturesFilter } from "./features-filter";
import { PriceRangeFilter } from "./price-range-filter";
import { useRouter, usePathname } from "next/navigation";

interface Props {
	features: string[];
	selectedFeatures: string[];
	onFeaturesChange: (val: string[]) => void;
}

export function SidebarFilters({
	features,
	selectedFeatures,
	onFeaturesChange,
}: Props) {
	const router = useRouter();
	const pathname = usePathname();

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="font-jakarta font-bold text-lg text-primary">Filters</h2>
				<button
					onClick={() => router.push(pathname)}
					className="text-xs font-medium text-primary hover:underline font-plex cursor-pointer"
				>
					Clear all
				</button>
			</div>

			<PriceRangeFilter />
			<FeaturesFilter
				features={features}
				selected={selectedFeatures}
				onChange={onFeaturesChange}
			/>
		</div>
	);
}

"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function PriceRangeFilter() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [min, setMin] = useState(searchParams.get("minPrice") ?? "");
	const [max, setMax] = useState(searchParams.get("maxPrice") ?? "");

	useEffect(() => {
		const timeout = setTimeout(() => {
			setMin(searchParams.get("minPrice") ?? "");
			setMax(searchParams.get("maxPrice") ?? "");
		}, 0);
		return () => clearTimeout(timeout);
	}, [searchParams]);

	// Apply after user stops typing
	useEffect(() => {
		const timeout = setTimeout(() => {
			const params = new URLSearchParams(searchParams.toString());

			if (min) params.set("minPrice", min);
			else params.delete("minPrice");

			if (max) params.set("maxPrice", max);
			else params.delete("maxPrice");

			router.push(`${pathname}?${params.toString()}`);
		}, 0);

		return () => clearTimeout(timeout);
	}, [min, max]);

	return (
		<div className="space-y-3">
			<label className="font-inter text-sm font-medium text-on-surface">
				Price Range (EGP)
			</label>
			<div className="flex items-center gap-2">
				<input
					type="number"
					placeholder="Min"
					value={min}
					min={0}
					onChange={(e) => setMin(e.target.value)}
					className="w-full rounded-lg border border-border bg-background text-sm font-inter text-on-surface px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
				/>
				<span className="text-on-surface-variant font-inter text-sm">–</span>
				<input
					type="number"
					placeholder="Max"
					value={max}
					min={0}
					onChange={(e) => setMax(e.target.value)}
					className="w-full rounded-lg border border-border bg-background text-sm font-inter text-on-surface px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
				/>
			</div>
		</div>
	);
}

"use client";

import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTrigger,
} from "@/components/ui/sheet";
import { SidebarFilters } from "./sidebar-filters";

interface Props {
	features: string[];
	selectedFeatures: string[];
	onFeaturesChange: (val: string[]) => void;
}

export function MobileFilters({
	features,
	selectedFeatures,
	onFeaturesChange,
}: Props) {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant="outline"
					className="flex items-center gap-2 md:hidden font-plex"
				>
					<SlidersHorizontal size={16} />
					Filters
					{selectedFeatures.length > 0 && (
						<span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
							{selectedFeatures.length}
						</span>
					)}
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="w-full overflow-y-auto py-2 px-6">
				<SheetHeader className="mb-1"></SheetHeader>
				<SidebarFilters
					features={features}
					selectedFeatures={selectedFeatures}
					onFeaturesChange={onFeaturesChange}
				/>
			</SheetContent>
		</Sheet>
	);
}

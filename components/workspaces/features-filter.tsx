"use client";

import { FEATURE_LABELS } from "@/utils/constants";

interface Props {
	features: string[];
	selected: string[];
	onChange: (val: string[]) => void;
}

export function FeaturesFilter({ features, selected, onChange }: Props) {
	const toggle = (feature: string) => {
		if (selected.includes(feature)) {
			onChange(selected.filter((f) => f !== feature));
		} else {
			onChange([...selected, feature]);
		}
	};

	return (
		<div className="space-y-3">
			<label className="font-inter text-sm font-medium text-on-surface">
				Features
			</label>
			<div className="space-y-2">
				{features.map((feature) => (
					<label
						key={feature}
						className="flex items-center gap-3 cursor-pointer group"
					>
						<input
							type="checkbox"
							checked={selected.includes(feature)}
							onChange={() => toggle(feature)}
							className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
						/>
						<span className="font-inter text-sm text-on-surface-variant group-hover:text-primary transition-colors">
							{FEATURE_LABELS[feature] ?? feature}
						</span>
					</label>
				))}
			</div>
		</div>
	);
}

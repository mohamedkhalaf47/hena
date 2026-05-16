import { Building2, Star, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Props {
	stats: {
		totalWorkspaces: number;
		totalReviews: number;
		averageRating: number;
	};
}

const cards = (stats: Props["stats"]) => [
	{
		label: "Total Workspaces",
		value: stats.totalWorkspaces,
		icon: Building2,
		color: "text-primary",
		bg: "bg-[#e2dfff]",
	},
	{
		label: "Total Reviews",
		value: stats.totalReviews,
		icon: MessageSquare,
		color: "text-[#22C55E]",
		bg: "bg-[#dcfce7]",
	},
	{
		label: "Average Rating",
		value:
			stats.averageRating > 0 ? `${stats.averageRating} / 5` : "No ratings yet",
		icon: Star,
		color: "text-[#F59E0B]",
		bg: "bg-[#fef3c7]",
	},
];

export function StatsCards({ stats }: Props) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
			{cards(stats).map((card) => (
				<Card key={card.label} className="p-6 flex items-center justify-center gap-3 text-center">
					<div className={`${card.bg} p-3 rounded-xl`}>
						<card.icon size={22} className={`${card.color}`} />
					</div>
					<div>
						<p className="font-inter text-sm text-on-surface-variant">
							{card.label}
						</p>
						<p className="font-jakarta font-bold text-2xl text-on-surface">
							{card.value}
						</p>
					</div>
				</Card>
			))}
		</div>
	);
}

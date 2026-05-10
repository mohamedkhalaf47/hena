"use client";
import { Search, ArrowLeftRight, Rocket } from "lucide-react";

const steps = [
	{
		icon: Search,
		title: "Search",
		description:
			"Browse through dozens of verified workspaces in Assiut with real photos and pricing.",
	},
	{
		icon: ArrowLeftRight,
		title: "Compare",
		description:
			"Filter by your needs—quietness, proximity, or budget—to find your perfect match.",
	},
	{
		icon: Rocket,
		title: "Go",
		description:
			"Book your desk instantly or just drop by. Your productivity won't wait.",
	},
];

export function HowItWorks() {
	return (
		<section className="py-12 md:py-16 bg-surface">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-jakarta font-bold text-on-surface mb-2">
						How It Works
					</h2>
					<p className="font-inter text-on-surface-variant">
						Find your perfect workspace in 3 simple steps
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					{steps.map((step, index) => {
						const Icon = step.icon;
						return (
							<div
								key={index}
								className="text-center p-8 rounded-lg transition-shadow hover:shadow-md hover:shadow-primary/20 cursor-default border border-outline-variant"
							>
								<div className="mb-4 flex justify-center">
									<div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
										<Icon className="text-primary" size={32} />
									</div>
								</div>
								<h3 className="font-jakarta font-bold text-xl text-on-surface mb-2">
									{step.title}
								</h3>
								<p className="font-inter text-on-surface-variant">
									{step.description}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}

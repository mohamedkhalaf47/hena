import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function HeroSection() {
	return (
		<section className="py-16 md:py-20 bg-linear-to-b from-surface via-surface-container-lowest to-surface">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Main Headline */}
				<div className="text-center mb-12">
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-jakarta font-bold text-on-surface mb-4">
						Find the perfect workspace
						<span className="text-primary block mt-2">in Assiut</span>
					</h1>
					<p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto">
						Discover and compare the best workspaces for studying, working, or
						meeting in Assiut. All in one place.
					</p>
				</div>

				{/* Search Bar */}
				<div className="max-w-2xl mx-auto mb-6">
					<div className="relative">
						<Search
							className="absolute left-4 top-1/2 transform -translate-y-1/2 text-on-surface-variant"
							size={20}
						/>
						<Input
							type="text"
							placeholder="Search by name"
							className="w-full pl-12 pr-4 py-7 text-base rounded-lg border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary-container"
						/>
						<Button className="absolute right-4 top-1/2 transform -translate-y-1/2 py-4 px-6 cursor-pointer">
							Search
						</Button>
					</div>
				</div>

				{/* Quick Categories */}
				<div className="flex flex-wrap justify-center gap-3 mb-8">
					{["Wifi","Study", "Quiet", "Meeting Room", "Near University"].map(
						(category) => (
							<Button
								key={category}
								variant="outline"
								className="rounded-full border-outline-variant hover:border-primary hover:text-primary transition-colors cursor-pointer"
							>
								{category}
							</Button>
						),
					)}
				</div>
			</div>
		</section>
	);
}

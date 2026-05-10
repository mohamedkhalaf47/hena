import { HeroSection } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FeaturedWorkspaces } from "@/components/landing/FeaturedWorkspaces";
import CTA from "@/components/landing/CTA";

export default function Home() {
	return (
		<main className="flex-1">
			<HeroSection />
			<FeaturedWorkspaces />
			<HowItWorks />
			<CTA />
		</main>
	);
}

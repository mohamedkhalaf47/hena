import CTA from "@/components/about/CTA";
import Hero from "@/components/about/Hero";
import Problem from "@/components/about/Problem";
import Solution from "@/components/about/Solution";
import Vision from "@/components/about/Vision";

export default function AboutPage() {
	return (
		<main className="overflow-hidden min-h-screen bg-background">
			<Hero />
			<Problem />
			<Solution />
			<Vision />
			<CTA />
		</main>
	);
}

import Link from "next/link";
import { Button } from "../ui/button";

export default function Hero() {
	return (
		<section className="relative border-b border-border">
			<div className="absolute inset-0 bg-linear-to-b from-primary/5 via-transparent to-transparent" />

			<div className="relative py-20 lg:py-24 max-md:px-15">
				<div className="mx-auto max-w-4xl text-center">
					<div className="inline-flex items-center rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
						About Hena
					</div>

					<h1 className="mt-8 text-5xl font-heading font-bold leading-[1.1] tracking-tight text-balance text-foreground lg:text-7xl">
						Finding a workspace in Assiut should feel simple.
					</h1>

					<p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-muted-foreground lg:text-xl">
						Hena helps students, freelancers, and remote workers discover the
						best workspaces in Assiut based on their needs, budget, and
						productivity style.
					</p>

					<div className="mt-10 flex flex-wrap items-center justify-center gap-4">
						<Button asChild size="lg" className="h-12 rounded-xl px-6">
							<Link href="/workspaces">Explore Workspaces</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}

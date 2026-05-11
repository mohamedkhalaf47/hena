import { Info, MapPin, Sparkles } from "lucide-react";

export default function Solution(){
  return(
    <section className="border-y border-border bg-muted/30">
				<div className="py-20 lg:py-24 px-15">
					<div className="mx-auto max-w-3xl text-center">
						<div className="inline-flex rounded-full bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
							Our Solution
						</div>

						<h2 className="mt-6 text-4xl font-heading font-bold tracking-tight lg:text-5xl">
							One platform for all workspaces in Assiut.
						</h2>

						<p className="mt-6 text-lg leading-8 text-muted-foreground">
							Hena makes workspace discovery simple. Compare places by pricing,
							atmosphere, internet quality, quietness, and facilities — all in
							one experience.
						</p>
					</div>

					<div className="mt-16 grid gap-6 md:grid-cols-3">
						<div className="group rounded-3xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 flex items-center justify-center flex-col">
							<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
								<Sparkles size={32} />
							</div>

							<h3 className="mt-6 text-xl font-semibold">Smart Discovery</h3>

							<p className="mt-4 leading-7 text-muted-foreground text-center">
								Find workspaces that match your study or work style in just a
								few clicks.
							</p>
						</div>

						<div className="group rounded-3xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 flex items-center justify-center flex-col">
							<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
								<Info size={32} />
							</div>

							<h3 className="mt-6 text-xl font-semibold">Real Information</h3>

							<p className="mt-4 leading-7 text-muted-foreground text-center">
								Pricing, reviews, facilities, and workspace details clearly
								organized in one place.
							</p>
						</div>

						<div className="group rounded-3xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 flex items-center justify-center flex-col">
							<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
								<MapPin size={32} />
							</div>

							<h3 className="mt-6 text-xl font-semibold">Built for Assiut</h3>

							<p className="mt-4 leading-7 text-muted-foreground text-center">
								Focused on the real needs of students, freelancers, and remote
								workers in Assiut.
							</p>
						</div>
					</div>
				</div>
			</section>
  )
}
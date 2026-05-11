export default function Problem() {
	return (
		<section>
			<div className="py-20 lg:py-24">
				<div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20 px-15">
					{/* Left Content */}
					<div className="space-y-8">
						<div className="inline-flex rounded-full bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
							The Problem
						</div>

						<div className="space-y-4">
							<h2 className="text-4xl font-heading font-bold leading-tight tracking-tight lg:text-5xl">
								Too many people struggle to find the right place to focus.
							</h2>

							<div className="space-y-5 text-base leading-8 text-muted-foreground lg:text-lg">
								<p>
									Every year, thousands of students move to Assiut searching for
									comfortable places to study and work.
								</p>

								<p>
									Most people rely on random Facebook posts, recommendations, or
									trial and error.
								</p>

								<p>
									Some places are crowded. Others are expensive. And many users
									don’t know which workspace actually matches their needs.
								</p>
							</div>
						</div>
					</div>

					{/* Right Cards */}
					<div className="relative">
						<div className="absolute -left-6 top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />

						<div className="relative space-y-4">
							{[
								"Where can I find a quiet workspace near the university?",
								"Is there an affordable place with reliable WiFi?",
								"I wasted hours trying different places that didn’t fit me.",
							].map((quote, index) => (
								<div
									key={index}
									className="rounded-3xl border border-border bg-card p-6 shadow-sm"
								>
									<p className="text-base leading-7 text-muted-foreground">
										“{quote}”
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

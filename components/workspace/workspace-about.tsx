interface Props {
	description: string;
}

export default function WorkspaceAbout({ description }: Props) {
	return (
		<section className="space-y-5">
			<div className="space-y-2">
				<h2 className="font-heading text-2xl font-bold tracking-tight">
					About this workspace
				</h2>
				<div className="h-1 w-12 rounded-full bg-primary/20" />
			</div>

			<p className="max-w-3xl text-body-lg font-body-md leading-relaxed text-muted-foreground">
				{description}
			</p>
		</section>
	);
}

import Image from "next/image";
import { Star, Trash2 } from "lucide-react";
import { Review } from "@/types/types";

interface Props {
	review: Review;
	canDelete?: boolean;
	onDelete?: () => void;
}

export default function WorkspaceReviewCard({
	review,
	canDelete,
	onDelete,
}: Props) {
	return (
		<div className="flex flex-col gap-4 rounded-xl bg-surface-container-low p-5">
			{/* Header */}
			<div className="flex items-center justify-between gap-3">
				<div className="flex items-center gap-3">
					<div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
						<Image
							src={review.userImage || "/images/default-avatar.png"}
							alt={review.userName}
							fill
							className="object-cover"
						/>
					</div>
					<div>
						<h3 className="font-label-md font-semibold text-foreground">
							{review.userName}
						</h3>
						<p className="text-body-sm text-muted-foreground">
							{new Date(review.createdAt).toLocaleDateString("en-US", {
								month: "long",
								year: "numeric",
							})}
						</p>
						{canDelete && (
							<button
								onClick={onDelete}
								className="mt-1.5 flex cursor-pointer items-center gap-1.5 text-body-sm text-destructive transition-colors hover:text-destructive/80"
							>
								<Trash2 className="h-3.5 w-3.5" />
								Delete
							</button>
						)}
					</div>
				</div>

				{/* Stars */}
				<div className="flex items-center gap-0.5">
					{Array.from({ length: 5 }).map((_, index) => (
						<Star
							key={index}
							className={`h-4 w-4 ${
								index < review.rating
									? "fill-warning-accent text-warning-accent"
									: "fill-muted text-muted"
							}`}
						/>
					))}
				</div>
			</div>

			{/* Comment */}
			<p className="text-body-md leading-relaxed text-muted-foreground">
				{review.comment}
			</p>
		</div>
	);
}

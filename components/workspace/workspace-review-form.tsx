"use client";

import { useState } from "react";
import { Loader2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Review } from "@/types/types";

interface Props {
	workspaceId: string;
	existingReview?: Review;
	onReviewUpserted: (review: Review) => void;
}

export default function WorkspaceReviewForm({
	workspaceId,
	existingReview,
	onReviewUpserted,
}: Props) {
	const [rating, setRating] = useState(existingReview?.rating ?? 2);
	const [comment, setComment] = useState(existingReview?.comment ?? "");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const isEditing = !!existingReview;

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			setLoading(true);
			const response = await api.post("/reviews", {
				workspace: workspaceId,
				rating,
				comment,
			});
			onReviewUpserted(response.data);
			toast.success(
				isEditing
					? "Review updated successfully"
					: "Review submitted successfully",
			);
			if (!isEditing) {
				setComment("");
				setRating(2);
			}
			router.refresh();
		} catch (error) {
			console.error(error);
			toast.error("Failed to submit review");
		} finally {
			setLoading(false);
		}
	}

	return (
		<section className="rounded-xl border border-border bg-card p-6">
			<div className="mb-6">
				<h3 className="font-heading text-xl font-semibold">
					{isEditing ? "Edit your review" : "Share your experience"}
				</h3>
				<p className="mt-1.5 text-body-sm text-muted-foreground">
					{isEditing
						? "Update your rating or comment."
						: "Help other students and freelancers find their perfect space."}
				</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-5">
				<div className="space-y-2.5">
					<div className="flex items-center justify-between">
						<label className="text-label-md font-medium text-foreground">
							Your Rating
						</label>
						<span className="text-body-sm text-muted-foreground">
							{rating} / 5
						</span>
					</div>

					<div className="flex items-center gap-1">
						{Array.from({ length: 5 }).map((_, index) => {
							const value = index + 1;
							return (
								<button
									key={value}
									type="button"
									onClick={() => setRating(value)}
									className="cursor-pointer rounded-lg p-1 transition-transform duration-200 hover:scale-110"
								>
									<Star
										className={`h-7 w-7 transition-all duration-200 ${
											value <= rating
												? "fill-warning-accent text-warning-accent"
												: "text-muted-foreground/30"
										}`}
									/>
								</button>
							);
						})}
					</div>
				</div>

				<textarea
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					placeholder="Write your review..."
					rows={4}
					className="w-full rounded-xl border border-border bg-background px-4 py-3 text-body-md text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary"
					required
				/>

				<Button
					type="submit"
					disabled={loading}
					className="h-11 cursor-pointer rounded-xl px-6"
				>
					{loading ? (
						<Loader2 className="h-4 w-4 animate-spin" />
					) : isEditing ? (
						"Update Review"
					) : (
						"Submit Review"
					)}
				</Button>
			</form>
		</section>
	);
}

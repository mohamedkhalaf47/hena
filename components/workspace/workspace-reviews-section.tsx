"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Review } from "@/types/types";
import WorkspaceReviewCard from "./workspace-review-card";
import WorkspaceReviewForm from "./workspace-review-form";
import { toast } from "sonner";

interface Props {
	initialReviews: Review[];
	workspaceId: string;
	currentUserId?: string | null;
	showForm?: boolean;
	averageRating: number;
	reviewsCount: number;
}

export default function WorkspaceReviewsSection({
	initialReviews,
	workspaceId,
	currentUserId,
	showForm,
	averageRating,
	reviewsCount,
}: Props) {
	const [reviews, setReviews] = useState(initialReviews);
	const [visibleCount, setVisibleCount] = useState(3);
  const [stats, setStats] = useState({
		averageRating,
		reviewsCount,
	});

	const existingReview = currentUserId
		? reviews.find((r) => r.clerkUserId === currentUserId)
		: undefined;

function upsertReview(review: Review) {
	setReviews((prev) => {
		const exists = prev.find((r) => r._id === review._id);
		if (exists) {
			return prev.map((r) => (r._id === review._id ? review : r));
		}
		const updated = [review, ...prev];
		const avg = updated.reduce((sum, r) => sum + r.rating, 0) / updated.length;
		setStats({ averageRating: avg, reviewsCount: updated.length });
		return updated;
	});
}

async function deleteReview(reviewId: string) {
	try {
		await api.delete(`/reviews/${reviewId}`);
		toast.success("Deleted review successfully");
		setReviews((prev) => {
			const updated = prev.filter((r) => r._id !== reviewId);
			const avg = updated.length
				? updated.reduce((sum, r) => sum + r.rating, 0) / updated.length
				: 0;
			setStats({ averageRating: avg, reviewsCount: updated.length });
			return updated;
		});
	} catch (error) {
		console.error(error);
	}
}

	return (
		<section className="space-y-8">
			<div className="space-y-2">
				<div className="flex items-center gap-2">
					<Star className="h-6 w-6 fill-foreground text-foreground" />
					<h2 className="font-heading text-2xl font-bold tracking-tight">
						{stats.averageRating.toFixed(1)}
						<span className="mx-2 text-muted-foreground">•</span>
						{stats.reviewsCount} reviews
					</h2>
				</div>
			</div>

			{showForm && (
				<WorkspaceReviewForm
					workspaceId={workspaceId}
					existingReview={existingReview}
					onReviewUpserted={upsertReview}
				/>
			)}

			{reviews.length === 0 ? (
				<div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
					<h3 className="font-heading text-xl font-semibold">No reviews yet</h3>
					<p className="mt-2 text-body-sm text-muted-foreground">
						Be the first to share your experience.
					</p>
				</div>
			) : (
				<>
					<div className="grid gap-5 md:grid-cols-2">
						{reviews.slice(0, visibleCount).map((review) => (
							<WorkspaceReviewCard
								key={review._id}
								review={review}
								canDelete={currentUserId === review.clerkUserId}
								onDelete={() => deleteReview(review._id)}
							/>
						))}
					</div>

					{reviews.length > visibleCount && (
						<Button onClick={() => setVisibleCount((prev) => prev + 3)}>
							Show more reviews
						</Button>
					)}
				</>
			)}
		</section>
	);
}

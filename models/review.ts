import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
	{
		clerkUserId: {
			type: String,
			required: true,
		},

		workspace: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Workspace",
			required: true,
		},

		userName: {
			type: String,
			required: true,
		},

		userImage: {
			type: String,
		},

		rating: {
			type: Number,
			required: true,
			min: 1,
			max: 5,
		},

		comment: {
			type: String,
			required: true,
			maxlength: 500,
		},
	},
	{
		timestamps: true,
	},
);

reviewSchema.index({ clerkUserId: 1, workspace: 1 }, { unique: true });

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;

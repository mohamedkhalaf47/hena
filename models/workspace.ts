import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},

		slug: {
			type: String,
			required: true,
			unique: true,
		},

		description: {
			type: String,
			required: true,
		},

		address: {
			type: String,
			required: true,
		},

		shortAddress: {
			type: String,
			required: true,
		},

		images: [
			{
				type: String,
			},
		],
		pricing: {
			startingFrom: Number,
			packages: [
				{
					label: String,
					price: Number,
					description: String,
				},
			],
		},

		features: [
			{
				type: String,
				enum: ["wifi", "quiet", "ac", "meeting-room", "printing", "kitchen"],
			},
		],

		workingHours: {
			open: String,
			close: String,
		},

		contact: {
			phone: String,
			whatsapp: String,
			facebook: String,
		},

		averageRating: {
			type: Number,
			default: 0,
		},

		reviewsCount: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	},
);

workspaceSchema.index({
	name: "text",
});

const Workspace =
	mongoose.models.Workspace || mongoose.model("Workspace", workspaceSchema);

export default Workspace;

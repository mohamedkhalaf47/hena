import { z } from "zod";

export const workspaceSchema = z.object({
	name: z.string().min(3),
	description: z.string().min(10),
	address: z.string().url(),
	images: z.array(z.string().url()),

	pricing: z.object({
		startingFrom: z.number().optional(),
		packages: z.array(
			z.object({
				label: z.string(),
				price: z.number(),
				description: z.string(),
			})
		),
	}),

	features: z.array(z.string()),

	workingHours: z.object({
		open: z.string(),
		close: z.string(),
	}),

	contact: z.object({
		phone: z.string().optional(),
		whatsapp: z.string().optional(),
		facebook: z.string().optional(),
	}),
});

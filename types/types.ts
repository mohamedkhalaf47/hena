export type Workspace = {
	_id: string;
	name: string;
	slug: string;
	address: string;
	shortAddress: string;
	images: string[];
	features: string[];
	averageRating: number;
	pricing: { startingFrom: number };
};

export type WorkspacePackage = {
	label: string;
	price: number;
	description: string;
};

export type WorkspaceSlug = {
	_id: string;

	name: string;

	slug: string;

	description: string;

	address: string;

	shortAddress: string;

	images: string[];

	pricing: {
		startingFrom: number;

		packages: WorkspacePackage[];
	};

	features: string[];

	workingHours: {
		open: string;
		close: string;
	};

	contact: {
		phone?: string;
		whatsapp?: string;
		facebook?: string;
	};

	averageRating: number;

	reviewsCount: number;

	createdAt: string;

	updatedAt: string;
};

export type Review = {
	_id: string;

	clerkUserId: string;

	workspace: string;

	userName: string;

	userImage?: string;

	rating: number;

	comment: string;

	createdAt: string;
}
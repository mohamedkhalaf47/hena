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

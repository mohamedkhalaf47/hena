import { WorkspacesClient } from "@/components/workspaces/workspaces-client";
import { getWorkspaces, getAllFeatures } from "@/services/workspace.service";

interface PageProps {
	searchParams: Promise<{
		search?: string;
		feature?: string | string[];
		sort?: string;
		minPrice?: string;
		maxPrice?: string;
	}>;
}

export default async function WorkspacesPage({ searchParams }: PageProps) {
	const params = await searchParams;

	const [workspaces, features] = await Promise.all([
		getWorkspaces(params),
		getAllFeatures(),
	]);

	const initialParams = {
		...params,
		feature: Array.isArray(params.feature) ? params.feature[0] : params.feature,
	};

	return (
			<WorkspacesClient
				initialWorkspaces={workspaces}
				features={features}
				initialParams={initialParams}
			/>
	);
}

import {
	getDashboardStats,
	getDashboardWorkspaces,
} from "@/services/dashboard.service";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { WorkspacesTable } from "@/components/dashboard/workspaces-table";

export default async function DashboardPage() {
	const [stats, workspaces] = await Promise.all([
		getDashboardStats(),
		getDashboardWorkspaces(),
	]);

	return (
		<div className="space-y-8">
			<div>
				<h1 className="font-jakarta font-bold text-2xl text-on-surface">
					Overview
				</h1>
				<p className="font-inter text-sm text-on-surface-variant mt-1">
					Manage your workspaces and monitor activity
				</p>
			</div>
			<StatsCards stats={stats} />
			<WorkspacesTable workspaces={workspaces} />
		</div>
	);
}

import { AddWorkspaceForm } from "@/components/dashboard/add-workspace-form";

export default function NewWorkspacePage() {
	return (
		<div className="space-y-6 max-w-3xl">
			<div>
				<h1 className="font-jakarta font-bold text-2xl text-on-surface">
					Add Workspace
				</h1>
				<p className="font-inter text-sm text-on-surface-variant mt-1">
					Fill in the details to add a new workspace
				</p>
			</div>
			<AddWorkspaceForm />
		</div>
	);
}

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, PlusCircle } from "lucide-react";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { sessionClaims } = await auth();

	if (sessionClaims?.metadata?.role !== "admin") {
		redirect("/");
	}

	const links = [
		{ label: "Overview", href: "/dashboard", icon: <LayoutDashboard /> },
		{
			label: "Add Workspace",
			href: "/dashboard/workspaces/new",
			icon: <PlusCircle />,
		},
	];

	return (
		<div className="min-h-screen bg-[#f5f2ff]">
			{/* Sidebar */}
			<aside className="fixed left-0 top-0 h-full w-56 bg-white border-r border-border flex flex-col py-8 px-4 gap-2">
				<h1 className="font-jakarta font-bold text-xl text-primary px-3 mb-6">
					Hena Admin
				</h1>
				{links.map((link) => (
					<Link
						key={link.label}
						href={link.href}
						className={`flex items-center gap-3 px-3 py-2 rounded-lg font-inter text-sm text-on-surface hover:bg-[#f5f2ff] hover:text-primary transition-colors`}
					>
						{link.icon}
						{link.label}
					</Link>
				))}
			</aside>

			{/* Main */}
			<main className="ml-56 p-8">{children}</main>
		</div>
	);
}

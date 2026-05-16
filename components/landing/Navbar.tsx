"use client";

import Link from "next/link";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { UserButton, useUser, useAuth } from "@clerk/nextjs";

export function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();
	const { user } = useUser();
	const { sessionClaims } = useAuth();

	const isAdmin = sessionClaims?.metadata?.role === "admin";

	const navLinks = [
		{ href: "/", label: "Home" },
		{ href: "/workspaces", label: "Explore" },
		{ href: "/about", label: "About" },
	];

	return (
		<nav className="sticky top-0 z-50 bg-surface-container border-b border-border-subtle backdrop-blur-md">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo and Links */}
					<div className="flex items-center gap-8">
						<span className="font-jakarta font-bold text-xl text-primary">
							Hena
						</span>
						<div className="hidden md:flex items-center gap-8">
							{navLinks.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									className={`font-inter ${
										pathname === link.href
											? "text-primary font-semibold"
											: "text-on-surface-variant hover:text-primary transition-colors"
									}`}
								>
									{link.label}
								</Link>
							))}
						</div>
					</div>

					{/* Right Side */}
					<div className="hidden md:flex items-center gap-3">
						{isAdmin && (
							<Button
								asChild
								variant="outline"
								size="sm"
								className="font-plex font-medium gap-2 border-primary text-primary hover:bg-[#f5f2ff]"
							>
								<Link href="/dashboard">
									<LayoutDashboard size={15} />
									Dashboard
								</Link>
							</Button>
						)}
						{user ? (
							<UserButton />
						) : (
							<Button asChild className="font-plex font-medium py-4 px-6">
								<Link href="/sign-in">Login</Link>
							</Button>
						)}
					</div>

					{/* Mobile */}
					<div className="flex md:hidden items-center gap-3">
						{isAdmin && (
							<Button
								asChild
								variant="outline"
								size="sm"
								className="font-plex gap-1.5 border-primary text-primary hover:bg-[#f5f2ff]"
							>
								<Link href="/dashboard">
									<LayoutDashboard size={14} />
									Dashboard
								</Link>
							</Button>
						)}
						{user ? (
							<UserButton />
						) : (
							<Button asChild className="font-plex font-medium py-4 px-6">
								<Link href="/sign-in">Login</Link>
							</Button>
						)}
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="p-2 hover:bg-surface-container-high rounded-lg transition-colors"
						>
							{isOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				{isOpen && (
					<div className="md:hidden pb-4 space-y-3">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="block px-4 py-2 font-inter hover:bg-surface-container-high rounded-lg transition-colors"
							>
								{link.label}
							</Link>
						))}
					</div>
				)}
			</div>
		</nav>
	);
}

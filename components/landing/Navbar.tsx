"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	const navLinks = [
		{ href: "/", label: "Home" },
		{ href: "/workspaces", label: "Explore" },
		{ href: "/about", label: "About" },
	];

	return (
		<nav className="sticky top-0 z-50 bg-surface-container border-b border-border-subtle backdrop-blur-md">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo and Links - Left Side */}
					<div className="flex items-center gap-8">
						{/* Logo */}
						<span className="font-jakarta font-bold text-xl text-primary">
							Hena
						</span>

						{/* Desktop Menu - Links */}
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

					{/* Login Button - Right Side */}
					<div className="hidden md:flex items-center gap-4">
						<Button
							asChild
							variant="default"
							className="font-plex font-medium py-4 px-6"
						>
							<Link href="/sign-in">Login</Link>
						</Button>
					</div>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="md:hidden p-2 hover:bg-surface-container-high rounded-lg transition-colors ml-auto"
					>
						{isOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
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
						<Button
							asChild
							variant="default"
							className="w-full font-plex font-medium"
						>
							<Link href="/sign-in">Login</Link>
						</Button>
					</div>
				)}
			</div>
		</nav>
	);
}

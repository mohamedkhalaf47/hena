"use client";

import Link from "next/link";
import { Mail, Phone } from "lucide-react";

export function Footer() {
	return (
		<footer className="bg-surface-container border-t border-outline-variant">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid md:grid-cols-4 gap-8 mb-8">
					{/* Brand */}
					<div>
						<h3 className="font-jakarta font-bold text-lg text-on-surface mb-4">
							Hena
						</h3>
						<p className="text-on-surface-variant text-sm">
							All your workspaces in one place. Discover the perfect space to
							study, work, or meet.
						</p>
					</div>

					{/* Links */}
					<div>
						<h4 className="font-jakarta font-semibold text-on-surface mb-4">
							Product
						</h4>
						<div className="space-y-3 text-sm">
							<Link
								href="/workspaces"
								className="text-on-surface-variant hover:text-primary transition-colors"
							>
								Workspaces
							</Link>
							<Link
								href="/about"
								className="text-on-surface-variant hover:text-primary transition-colors block"
							>
								About
							</Link>
						</div>
					</div>

					{/* Legal */}
					<div>
						<h4 className="font-jakarta font-semibold text-on-surface mb-4">
							Legal
						</h4>
						<div className="space-y-3 text-sm">
							<Link
								href="#"
								className="text-on-surface-variant hover:text-primary transition-colors"
							>
								Privacy
							</Link>
							<Link
								href="#"
								className="text-on-surface-variant hover:text-primary transition-colors block"
							>
								Terms
							</Link>
						</div>
					</div>

					{/* Contact */}
					<div>
						<h4 className="font-jakarta font-semibold text-on-surface mb-4">
							Contact
						</h4>
						<div className="space-y-3 text-sm">
							<a
								href="mailto:mohamedmohamedkhalaf47@gmail.com"
								className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors"
							>
								<Mail size={16} />
								Gmail
							</a>
							<a
								href="tel:+201154448367"
								className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors"
							>
								<Phone size={16} />
								+20 1154 448 367
							</a>
						</div>
					</div>
				</div>

				<div className="border-t border-outline-variant pt-8 text-center text-on-surface-variant text-sm">
					<p>&copy; {new Date().getFullYear()} Hena. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}

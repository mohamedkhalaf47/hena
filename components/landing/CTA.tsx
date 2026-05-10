"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CTA() {
	return (
		<section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
			<div className="bg-primary rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
				{/* Content */}
				<div className="relative z-10 text-center md:text-left flex-1">
					<h3 className="font-jakarta font-bold text-2xl md:text-3xl mb-2 text-white">
						Ready to start?
					</h3>
					<p className="font-inter max-w-md text-white">
						Join thousands of students and professionals in Assiut who use Hena
						every day.
					</p>
				</div>

				{/* Buttons */}
				<div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
					<Button
						asChild
						variant="outline"
						className="border-2 border-on-primary text-primary font-plex font-medium py-8 px-10 hover:scale-105 hover:text-primary"
					>
						<Link href="/partner">Create an Account</Link>
					</Button>
					<Button
						asChild
						variant="outline"
						className="border-2 border-on-primary text-white font-plex font-medium py-8 px-10 bg-transparent"
					>
						<Link href="/partner">Partner with Us</Link>
					</Button>
				</div>

				{/* Decorative Background */}
				<div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
			</div>
		</section>
	);
}

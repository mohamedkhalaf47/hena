import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		<div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
			<p className="text-8xl font-jakarta font-bold text-primary mb-4">404</p>
			<h1 className="text-2xl font-jakarta font-bold text-on-surface mb-2">
				Page not found
			</h1>
			<p className="font-inter text-on-surface-variant mb-8 max-w-sm">
				The page you&apos;re looking for doesn&apos;t exist or has been moved.
			</p>
			<Button asChild className="font-plex font-medium px-8">
				<Link href="/">Back to Home</Link>
			</Button>
		</div>
	);
}

import type { Metadata } from "next";
import {
	Inter,
	Plus_Jakarta_Sans,
	IBM_Plex_Sans,
	Geist,
} from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@/components/analytics";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const jakarta = Plus_Jakarta_Sans({
	subsets: ["latin"],
	variable: "--font-jakarta",
});

const plex = IBM_Plex_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "600"],
	variable: "--font-plex",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://hena-workspaces.vercel.app"),
	title: {
		default: "Hena — Workspaces in Assiut",
		template: "%s | Hena",
	},
	description:
		"Discover and compare the best coworking spaces and study spaces in Assiut, Egypt. Perfect for students, freelancers, and remote workers.",
	keywords: [
		"coworking space Assiut",
		"study space Assiut",
		"workspace Assiut",
		"مساحة عمل أسيوط",
		"freelancer Assiut",
		"hena",
		"هنا",
	],
	openGraph: {
		type: "website",
		locale: "en_US",
		siteName: "Hena",
		title: "Hena — Workspaces in Assiut",
		description:
			"Discover and compare the best coworking spaces in Assiut, Egypt.",
	},
	twitter: {
		card: "summary_large_image",
		title: "Hena — Workspaces in Assiut",
		description:
			"Discover and compare the best coworking spaces in Assiut, Egypt.",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={cn(
				"h-full",
				"antialiased",
				inter.variable,
				jakarta.variable,
				plex.variable,
				"font-sans",
				geist.variable,
			)}
		>
			<ClerkProvider>
				<body className="min-h-full flex flex-col">
					<main>{children}</main>
					<Toaster richColors position="top-right" />
					<Analytics />
					<SpeedInsights />
				</body>
			</ClerkProvider>
		</html>
	);
}

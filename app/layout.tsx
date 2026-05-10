import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, IBM_Plex_Sans, Geist } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
	title: "Hena",
	description: "All Your Workspaces in One Place",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={cn("h-full", "antialiased", inter.variable, jakarta.variable, plex.variable, "font-sans", geist.variable)}
		>
			<ClerkProvider>
				<body className="min-h-full flex flex-col">{children}</body>
			</ClerkProvider>
		</html>
	);
}

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isDashboard = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
	if (isDashboard(req)) {
		const { sessionClaims } = await auth();
		if (sessionClaims?.metadata?.role !== "admin") {
			return Response.redirect(new URL("/", req.url));
		}
	}
});

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
		// Always run for Clerk-specific frontend API routes
		"/__clerk/(.*)",
	],
};

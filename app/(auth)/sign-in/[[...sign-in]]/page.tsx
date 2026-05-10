import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
	return (
		<div className="min-h-screen w-full flex items-center justify-center">
			<SignIn
				appearance={{
					elements: {
						rootBox: "w-full",
						card: "shadow-none border border-[#E2E8F0] rounded-xl p-6 bg-white",
						socialButtonsBlockButton:
							"border border-[#E2E8F0] rounded-lg font-inter text-[#1b1b24] hover:bg-[#f5f2ff] transition-colors",
						socialButtonsBlockButtonText: "font-inter font-medium",
						dividerLine: "bg-[#E2E8F0]",
						dividerText: "font-inter text-[#464555] text-sm",
						formFieldLabel: "font-inter text-sm text-[#1b1b24] font-medium",
						formFieldInput:
							"border border-[#E2E8F0] rounded-lg font-inter text-[#1b1b24] focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent",
						formButtonPrimary:
							"bg-[#3525cd] hover:bg-[#4338CA] font-inter font-medium rounded-lg transition-colors",
						footerActionLink:
							"text-[#3525cd] font-inter font-medium hover:text-[#4338CA]",
						identityPreviewText: "font-inter text-[#1b1b24]",
						identityPreviewEditButton:
							"text-[#3525cd] font-inter hover:text-[#4338CA]",
					},
				}}
			/>
		</div>
	);
}

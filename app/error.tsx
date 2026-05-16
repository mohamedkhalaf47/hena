"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <p className="text-6xl font-jakarta font-bold text-destructive mb-4">!</p>
      <h1 className="text-2xl font-jakarta font-bold text-on-surface mb-2">
        Something went wrong
      </h1>
      <p className="font-inter text-on-surface-variant mb-8 max-w-sm">
        An unexpected error occurred. Please try again.
      </p>
      <Button onClick={reset} className="font-plex font-medium px-8">
        Try Again
      </Button>
    </div>
  );
}
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Admin Dashboard Error]", error);
  }, [error]);

  return (
    <div className="container py-16 flex flex-col items-center justify-center min-h-[50vh] text-center space-y-5">
      <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <div className="space-y-2 max-w-md">
        <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
          Administration Control Error
        </h2>
        <p className="text-sm text-muted-foreground">
          {error.message ||
            "An error occurred while loading administrative privileges."}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Button onClick={() => reset()} variant="default" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Try Again
        </Button>
        <Link href="/">
          <Button variant="outline" className="gap-2">
            <Home className="w-4 h-4" />
            Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

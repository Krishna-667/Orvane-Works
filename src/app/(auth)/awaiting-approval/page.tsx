"use client";

import * as React from "react";
import Link from "next/link";
import { Clock, ShieldCheck, Mail, ArrowLeft, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { signOutAction } from "@/app/actions/auth";
import { SITE_CONFIG } from "@/lib/constants/site";

export default function AwaitingApprovalPage() {
  const [isSigningOut, setIsSigningOut] = React.useState(false);

  async function handleSignOut() {
    setIsSigningOut(true);
    await signOutAction();
    window.location.href = "/login";
  }

  return (
    <div className="container min-h-[85vh] flex items-center justify-center py-12">
      <Card className="w-full max-w-lg shadow-xl border-border text-center">
        <CardHeader className="space-y-3 pb-4">
          <div className="mx-auto w-14 h-14 rounded-full bg-amber-50 dark:bg-amber-950 flex items-center justify-center text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
            <Clock className="w-7 h-7 animate-pulse" />
          </div>
          <Badge variant="warning" className="mx-auto">
            Status: Pending Founder Review
          </Badge>
          <CardTitle className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Application Received
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
            Thank you for applying to join the {SITE_CONFIG.name} freelance studio. Your
            account has been created in least-privilege review mode.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 text-left">
          <div className="rounded-xl border border-border bg-muted/40 p-4 space-y-3">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground block text-sm mb-0.5">
                  Founder Verification
                </span>
                Our student founders review every application to maintain
                rigorous engineering quality and allocate client projects.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground block text-sm mb-0.5">
                  Email Notification
                </span>
                You will automatically receive an email decision as soon as an
                admin approves or updates your request.
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 border-t border-border/60">
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="outline" size="sm" className="w-full gap-2">
              <ArrowLeft className="w-4 h-4" />
              Return to Website
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            disabled={isSigningOut}
            onClick={handleSignOut}
            className="w-full sm:w-auto text-muted-foreground hover:text-foreground gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            {isSigningOut ? "Signing out..." : "Sign Out"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

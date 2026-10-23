"use client";

import * as React from "react";
import { Cpu, Wifi, Radio, Zap, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { joinWaitlistAction } from "@/app/actions/public";

export default function HardwarePage() {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [companyOrProject, setCompanyOrProject] = React.useState("");
  const [interestDetails, setInterestDetails] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await joinWaitlistAction({
        fullName,
        email,
        companyOrProject,
        interestDetails,
      });

      if (!res.success) {
        setErrorMessage(res.error || "Failed to join waitlist.");
        setIsLoading(false);
        return;
      }

      setSuccessMessage(res.message || "You're on the waitlist!");
      setFullName("");
      setEmail("");
      setCompanyOrProject("");
      setInterestDetails("");
      setIsLoading(false);
    } catch {
      setErrorMessage("A network error occurred. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <div className="container py-12 md:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <Badge variant="accent">R&D Studio Initiative</Badge>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Hardware & Connected IoT Engineering
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          From microcontroller firmware and telemetry sensors to custom shop
          automation. Developed by engineering students in Madurai. Client cohort
          intake opening soon.
        </p>
      </div>

      {/* R&D Disciplines */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-vermilion-50 dark:bg-vermilion-950 flex items-center justify-center text-primary mb-3">
              <Cpu className="w-5 h-5" />
            </div>
            <CardTitle className="text-lg">Firmware & Microcontrollers</CardTitle>
          </CardHeader>
          <CardContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Custom embedded C/C++ firmware running on ESP32, STM32, and Raspberry
            Pi hardware tailored for local industrial and retail automation.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-vermilion-50 dark:bg-vermilion-950 flex items-center justify-center text-primary mb-3">
              <Wifi className="w-5 h-5" />
            </div>
            <CardTitle className="text-lg">Cloud Telemetry & Dashboards</CardTitle>
          </CardHeader>
          <CardContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Real-time sensor data streamed securely to web dashboards built on
            Next.js and WebSockets with alert notifications via SMS and WhatsApp.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-vermilion-50 dark:bg-vermilion-950 flex items-center justify-center text-primary mb-3">
              <Radio className="w-5 h-5" />
            </div>
            <CardTitle className="text-lg">Rapid Prototyping</CardTitle>
          </CardHeader>
          <CardContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            From breadboard schematic to custom PCB routing and 3D enclosure
            design for clinical, coaching, and agricultural automation.
          </CardContent>
        </Card>
      </div>

      {/* Waitlist Form Card */}
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg border-border">
          <CardHeader className="text-center">
            <Badge variant="accent" className="mx-auto mb-1">
              Priority Waitlist
            </Badge>
            <CardTitle className="text-2xl font-bold">
              Join the Hardware Cohort
            </CardTitle>
            <CardDescription className="text-xs">
              Be the first to access our hardware intake when client bookings launch.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {successMessage ? (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/60 p-6 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h4 className="font-bold text-emerald-900 dark:text-emerald-200">
                  You are on the Priority Waitlist!
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">
                  {successMessage}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="fullName"
                      className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      Full Name *
                    </label>
                    <Input
                      id="fullName"
                      required
                      placeholder="e.g. Anand Kumar"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="anand@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="companyOrProject"
                    className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    Business / Prototype Name (Optional)
                  </label>
                  <Input
                    id="companyOrProject"
                    placeholder="e.g. Smart Irrigation / Clinic Monitor"
                    value={companyOrProject}
                    onChange={(e) => setCompanyOrProject(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="interestDetails"
                    className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    What kind of hardware or IoT project do you need? *
                  </label>
                  <Textarea
                    id="interestDetails"
                    required
                    rows={4}
                    placeholder="Tell us about the sensors, hardware environment, and problem you are looking to solve."
                    value={interestDetails}
                    onChange={(e) => setInterestDetails(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  size="lg"
                  className="w-full gap-2 font-semibold"
                >
                  {isLoading ? "Submitting..." : "Join Priority Waitlist"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

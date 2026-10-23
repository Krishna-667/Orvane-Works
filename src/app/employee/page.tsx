import Link from "next/link";
import { UserCheck, CheckCircle2, Clock, Upload, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { StatusChip } from "@/components/ui/status-chip";

export default function EmployeeDashboardPage() {
  return (
    <div className="container py-8 space-y-8">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Employee Hub
            </h1>
            <Badge variant="accent">Approved Specialist</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Manage assigned studio projects, upload client deliverables, and edit your public studio profile.
          </p>
        </div>

        <Link href="/employee/profile">
          <Button variant="outline" className="gap-2">
            <UserCheck className="w-4 h-4" />
            Edit Public Profile
          </Button>
        </Link>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-semibold uppercase tracking-wider">
              Assigned Orders
            </CardDescription>
            <CardTitle className="text-3xl font-bold text-foreground">1</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Active in your queue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-semibold uppercase tracking-wider">
              Upcoming Deadlines
            </CardDescription>
            <CardTitle className="text-3xl font-bold text-foreground">1</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Due within 14 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-semibold uppercase tracking-wider">
              Completed Deliverables
            </CardDescription>
            <CardTitle className="text-3xl font-bold text-foreground">0</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Approved by client</p>
          </CardContent>
        </Card>
      </div>

      {/* My Assigned Orders */}
      <div className="space-y-4">
        <h2 className="font-display text-xl font-bold text-foreground">Assigned Projects</h2>

        <Card className="hover:border-primary/40 transition-colors">
          <CardHeader className="pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-muted-foreground">ORV-2026-0001</span>
                <StatusChip status="in_progress" />
              </div>
              <CardTitle className="text-lg">Starter Brand Website [Demo]</CardTitle>
              <CardDescription className="text-xs">
                Client: Meenakshi Sweets • Deadline: Nov 15, 2026
              </CardDescription>
            </div>
            <Link href="/employee/orders/ORV-2026-0001">
              <Button size="sm" className="gap-1.5">
                <Upload className="w-4 h-4" />
                Upload Deliverables
              </Button>
            </Link>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

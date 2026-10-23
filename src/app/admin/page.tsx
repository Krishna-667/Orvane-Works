import Link from "next/link";
import { ShieldCheck, Users, FolderKanban, Inbox, Settings, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <div className="container py-8 space-y-8">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Studio Administration
            </h1>
            <Badge variant="destructive">Founder Admin</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Global management of student approvals, client orders, service catalog, and audit logs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin/employees">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Users className="w-4 h-4" />
              Employee Queue
            </Button>
          </Link>
          <Link href="/admin/orders">
            <Button size="sm" className="gap-1.5">
              <FolderKanban className="w-4 h-4" />
              Manage Orders
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-semibold uppercase tracking-wider">
              Pending Approvals
            </CardDescription>
            <CardTitle className="text-3xl font-bold text-primary">1</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">New applicant waiting in queue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-semibold uppercase tracking-wider">
              Active Orders
            </CardDescription>
            <CardTitle className="text-3xl font-bold text-foreground">1</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Assigned to team specialists</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-semibold uppercase tracking-wider">
              New Enquiries
            </CardDescription>
            <CardTitle className="text-3xl font-bold text-foreground">0</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Contact & waitlist inbox</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-semibold uppercase tracking-wider">
              Active Team
            </CardDescription>
            <CardTitle className="text-3xl font-bold text-foreground">3</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Approved student engineers</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <Users className="w-6 h-6 text-primary mb-2" />
            <CardTitle className="text-lg">Employee Management</CardTitle>
            <CardDescription className="text-xs">
              Review join requests, approve or reject with custom email, suspend, and feature members.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <FolderKanban className="w-6 h-6 text-primary mb-2" />
            <CardTitle className="text-lg">Global Orders</CardTitle>
            <CardDescription className="text-xs">
              Assign creators, adjust quotes, update payment status, and maintain private internal notes.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <Activity className="w-6 h-6 text-primary mb-2" />
            <CardTitle className="text-lg">Audit Log</CardTitle>
            <CardDescription className="text-xs">
              Tamper-evident chronological record of all administrative operations.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

import Link from "next/link";
import { Plus, FolderKanban, Clock, CheckCircle2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { StatusChip } from "@/components/ui/status-chip";

export default function ClientDashboardPage() {
  return (
    <div className="container py-8 space-y-8">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Client Portal
            </h1>
            <Badge variant="secondary">Active</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Track active project briefs, review quotes, and communicate directly with your team.
          </p>
        </div>

        <Link href="/dashboard/orders/new">
          <Button className="gap-2 font-semibold shadow-sm">
            <Plus className="w-4 h-4" />
            New Order Request
          </Button>
        </Link>
      </div>

      {/* Orders Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-semibold uppercase tracking-wider">
              Active Orders
            </CardDescription>
            <CardTitle className="text-3xl font-bold text-foreground">1</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">In progress with student team</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-semibold uppercase tracking-wider">
              Awaiting Quotes
            </CardDescription>
            <CardTitle className="text-3xl font-bold text-foreground">0</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Reviewed within 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-semibold uppercase tracking-wider">
              Completed Projects
            </CardDescription>
            <CardTitle className="text-3xl font-bold text-foreground">0</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">With deliverable files</p>
          </CardContent>
        </Card>
      </div>

      {/* My Orders Section */}
      <div className="space-y-4">
        <h2 className="font-display text-xl font-bold text-foreground">My Orders</h2>

        <Card className="hover:border-primary/40 transition-colors">
          <CardHeader className="pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-muted-foreground">ORV-2026-0001</span>
                <StatusChip status="in_progress" />
              </div>
              <CardTitle className="text-lg">Starter Brand Website [Demo]</CardTitle>
              <CardDescription className="text-xs">
                Web Design & Development • Target Deadline: Nov 15, 2026
              </CardDescription>
            </div>
            <Link href="/dashboard/orders/ORV-2026-0001">
              <Button variant="outline" size="sm">
                View Project Thread
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground border-t border-border/60 pt-3">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary" />
                Quote: ₹24,999 (Accepted)
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-primary" />
                Direct messaging active
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

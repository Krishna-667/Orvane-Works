import Link from "next/link";
import {
  ShieldCheck,
  Users,
  FolderKanban,
  Inbox,
  Clock,
  ArrowRight,
  UserCheck,
  Activity,
  IndianRupee,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { StatusChip } from "@/components/ui/status-chip";
import {
  getEmployeeRequests,
  getAllEmployeesAdmin,
  getAllOrdersAdmin,
  getAdminInbox,
  getAuditLogs,
} from "@/lib/data/admin";
import { formatINR, formatDate } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const [requests, employees, orders, inbox, auditLogs] = await Promise.all([
    getEmployeeRequests(),
    getAllEmployeesAdmin(),
    getAllOrdersAdmin(),
    getAdminInbox(),
    getAuditLogs(),
  ]);

  const pendingRequests = requests.filter((r) => r.status === "pending");
  const unhandledContact = inbox.contactMessages.filter((c) => !c.is_handled);
  const unhandledWaitlist = inbox.waitlistEntries.filter((w) => !w.is_handled);
  const totalEnquiries = unhandledContact.length + unhandledWaitlist.length;

  const totalPipelineINR = orders.reduce((acc, curr) => {
    return acc + (curr.quote_amount_inr || curr.budget_max_inr || 0);
  }, 0);

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

        <div className="flex flex-wrap items-center gap-2">
          <Link href="/admin/employees">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <Users className="w-3.5 h-3.5" />
              Employee Queue ({pendingRequests.length})
            </Button>
          </Link>
          <Link href="/admin/orders">
            <Button size="sm" className="gap-1.5 text-xs bg-primary text-primary-foreground hover:bg-vermilion-700 dark:hover:bg-vermilion-500 font-medium">
              <FolderKanban className="w-3.5 h-3.5" />
              Orders ({orders.length})
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className={pendingRequests.length > 0 ? "border-vermilion/50 bg-vermilion/5" : ""}>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-semibold uppercase tracking-wider">
              Pending Approvals
            </CardDescription>
            <CardTitle className="text-3xl font-bold text-vermilion">
              {pendingRequests.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Applicants waiting in queue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-semibold uppercase tracking-wider">
              Active Orders
            </CardDescription>
            <CardTitle className="text-3xl font-bold text-foreground">
              {orders.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">In engineering &amp; review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-semibold uppercase tracking-wider">
              New Enquiries
            </CardDescription>
            <CardTitle className="text-3xl font-bold text-foreground">
              {totalEnquiries}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {unhandledContact.length} leads • {unhandledWaitlist.length} waitlist
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-semibold uppercase tracking-wider">
              Pipeline Value
            </CardDescription>
            <CardTitle className="text-2xl font-bold text-foreground">
              {formatINR(totalPipelineINR)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Across all client engagements</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Employee Requests Queue */}
      {pendingRequests.length > 0 && (
        <Card className="border-vermilion/40 bg-card">
          <CardHeader className="pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-lg flex items-center gap-2 text-vermilion">
                <AlertCircle className="w-5 h-5" />
                Pending Employee Applications ({pendingRequests.length})
              </CardTitle>
              <CardDescription className="text-xs">
                Students who applied via &ldquo;Join our team&rdquo;. No privileges are granted until founder approval.
              </CardDescription>
            </div>
            <Link href="/admin/employees">
              <Button size="sm" variant="outline" className="gap-1 text-xs">
                Review in Queue
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </CardHeader>

          <CardContent className="space-y-3 pt-1">
            {pendingRequests.slice(0, 3).map((req) => (
              <div
                key={req.id}
                className="p-3.5 rounded-lg border border-border bg-background flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground text-sm">
                      {req.applicant_name}
                    </span>
                    <span className="font-mono text-muted-foreground">
                      {req.applicant_email}
                    </span>
                  </div>
                  <p className="text-muted-foreground line-clamp-1">
                    {req.cover_note}
                  </p>
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {req.skills.slice(0, 4).map((s, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 rounded bg-muted text-[10px] text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <Link href="/admin/employees" className="shrink-0">
                  <Button size="sm" className="h-8 text-xs bg-primary text-primary-foreground hover:bg-vermilion-700 dark:hover:bg-vermilion-500 font-medium">
                    Review Application
                  </Button>
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Recent Orders & Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Orders Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
              <FolderKanban className="w-5 h-5 text-vermilion" />
              Recent Studio Orders
            </h2>
            <Link href="/admin/orders">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                View All Orders
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          <Card className="overflow-hidden border-border">
            <div className="divide-y divide-border">
              {orders.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="p-4 hover:bg-muted/10 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-muted-foreground">
                        {order.order_number}
                      </span>
                      <StatusChip status={order.status} />
                    </div>
                    <Link
                      href={`/admin/orders/${order.order_number}`}
                      className="font-medium text-sm text-foreground hover:text-vermilion block"
                    >
                      {order.title}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      Client: {order.client_name} • Service: {order.service_title}
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0">
                    <span className="font-semibold text-xs text-foreground">
                      {order.quote_amount_inr
                        ? formatINR(order.quote_amount_inr)
                        : formatINR(order.budget_max_inr)}
                    </span>
                    <Link href={`/admin/orders/${order.order_number}`}>
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        Manage
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right 1 Col: Audit Log Stream */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
              <Activity className="w-5 h-5 text-vermilion" />
              Audit Stream
            </h2>
            <Link href="/admin/audit">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                Full Log
              </Button>
            </Link>
          </div>

          <Card className="border-border">
            <CardContent className="p-4 space-y-3.5">
              {auditLogs.slice(0, 6).map((log) => (
                <div
                  key={log.id}
                  className="text-xs space-y-1 pb-3 border-b border-border/60 last:border-0 last:pb-0"
                >
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-[10px] font-mono">
                      {log.action}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground">
                      {formatDate(log.created_at)}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    By <strong className="text-foreground">{log.actor_name || "System"}</strong> on {log.entity_type}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

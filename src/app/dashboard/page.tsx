import Link from "next/link";
import {
  Plus,
  FolderKanban,
  Clock,
  CheckCircle2,
  MessageSquare,
  FileText,
  Calendar,
  AlertCircle,
  ExternalLink,
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
import { getClientOrders } from "@/lib/data/orders";
import { formatINR, formatDate } from "@/lib/utils";

export default async function ClientDashboardPage() {
  const orders = await getClientOrders();

  const activeOrders = orders.filter(
    (o) => o.status !== "delivered" && o.status !== "closed" && o.status !== "cancelled"
  );
  const awaitingQuotes = orders.filter((o) => o.status === "in_review" || o.status === "submitted");
  const completedOrders = orders.filter((o) => o.status === "delivered" || o.status === "closed");

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
            Track active project briefs, review quotes, download deliverables, and communicate directly with your student team.
          </p>
        </div>

        <Link href="/dashboard/orders/new">
          <Button className="gap-2 font-semibold shadow-sm w-full sm:w-auto">
            <Plus className="w-4 h-4" />
            New Order Request
          </Button>
        </Link>
      </div>

      {/* Orders Overview Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-semibold uppercase tracking-wider">
              Active Orders
            </CardDescription>
            <CardTitle className="text-3xl font-bold text-foreground">
              {activeOrders.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">In active engineering &amp; review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-semibold uppercase tracking-wider">
              Awaiting Quotes
            </CardDescription>
            <CardTitle className="text-3xl font-bold text-foreground">
              {awaitingQuotes.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Reviewed within 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-semibold uppercase tracking-wider">
              Delivered / Completed
            </CardDescription>
            <CardTitle className="text-3xl font-bold text-foreground">
              {completedOrders.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">With deliverable files ready</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders List Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-foreground">
            My Orders ({orders.length})
          </h2>
          <span className="text-xs text-muted-foreground">
            Madurai Studio Hub
          </span>
        </div>

        {orders.length === 0 ? (
          <Card className="p-12 text-center space-y-4 border-dashed">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
              <FolderKanban className="w-6 h-6" />
            </div>
            <div className="space-y-1 max-w-sm mx-auto">
              <h3 className="font-display font-semibold text-foreground text-lg">
                No orders placed yet
              </h3>
              <p className="text-xs text-muted-foreground">
                Ready to transform your business? Tell us about your web, video, or content needs.
              </p>
            </div>
            <Link href="/dashboard/orders/new">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Submit Your First Project Request
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {orders.map((order) => (
              <Card
                key={order.id}
                className="hover:border-primary/40 transition-colors shadow-sm overflow-hidden"
              >
                <CardHeader className="pb-3 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-semibold text-muted-foreground">
                        {order.order_number}
                      </span>
                      <StatusChip status={order.status} />
                      <Badge variant="outline" className="text-[10px]">
                        {order.service_title}
                      </Badge>
                    </div>

                    <CardTitle className="text-lg hover:text-vermilion transition-colors">
                      <Link href={`/dashboard/orders/${order.order_number}`}>
                        {order.title}
                      </Link>
                    </CardTitle>

                    <CardDescription className="text-xs line-clamp-2 max-w-2xl">
                      {order.project_brief}
                    </CardDescription>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0">
                    <div className="text-right">
                      <span className="text-[11px] text-muted-foreground block">
                        {order.quote_amount_inr ? "Quote Amount" : "Budget Range"}
                      </span>
                      <span className="font-semibold text-sm text-foreground">
                        {order.quote_amount_inr
                          ? formatINR(order.quote_amount_inr)
                          : `${formatINR(order.budget_min_inr)} - ${formatINR(order.budget_max_inr)}`}
                      </span>
                    </div>

                    <Link href={`/dashboard/orders/${order.order_number}`}>
                      <Button variant="outline" size="sm" className="gap-1.5 text-xs font-medium">
                        Open Project
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 border-t border-border/60 bg-muted/10 py-3">
                  <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                        Target: {formatDate(order.target_deadline)}
                      </span>
                      {order.preferred_employee_name && (
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-vermilion" />
                          Lead: {order.preferred_employee_name}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="capitalize text-[11px] bg-background px-2 py-0.5 rounded border border-border">
                        Payment: {order.payment_status.replace("_", " ")}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        Created {formatDate(order.created_at)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getEmployeeRequests,
  getAllEmployeesAdmin,
} from "@/lib/data/admin";
import { EmployeeManagementClient } from "./employee-management-client";

export const metadata = {
  title: "Employee Management — Orvane Admin",
  description:
    "Review student team applications, approve or reject members, manage public profile publishing.",
};

export default async function AdminEmployeesPage() {
  const [requests, employees] = await Promise.all([
    getEmployeeRequests(),
    getAllEmployeesAdmin(),
  ]);

  return (
    <div className="container py-8 space-y-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between pb-2 border-b border-border/60">
        <Link href="/admin">
          <Button variant="ghost" size="sm" className="gap-2 text-xs">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Admin Overview
          </Button>
        </Link>
        <span className="text-xs font-mono text-muted-foreground">
          Founder Governance / Team
        </span>
      </div>

      <div className="space-y-1">
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Users className="w-7 h-7 text-vermilion" />
          Employee Directory &amp; Application Queue
        </h1>
        <p className="text-sm text-muted-foreground">
          Enforce strict least-privilege standards. Approve verified engineering students, invite team members directly, and control public roster visibility.
        </p>
      </div>

      <EmployeeManagementClient
        initialRequests={requests}
        initialEmployees={employees}
      />
    </div>
  );
}

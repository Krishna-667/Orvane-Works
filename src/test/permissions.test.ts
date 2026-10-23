import { describe, it, expect } from "vitest";
import {
  getPostLoginRedirect,
  canAccessEmployeeArea,
  canAccessAdminArea,
  canEmployeeTransitionOrderStatus,
  type UserRole,
  type UserStatus,
} from "../lib/auth/roles";

describe("Permissions and Role Access Logic", () => {
  it("redirects clients to /dashboard on successful login", () => {
    const redirect = getPostLoginRedirect({ role: "client", status: "active" });
    expect(redirect).toBe("/dashboard");
  });

  it("redirects approved employees to /employee", () => {
    const redirect = getPostLoginRedirect({ role: "employee", status: "active" });
    expect(redirect).toBe("/employee");
  });

  it("redirects administrators to /admin", () => {
    const redirect = getPostLoginRedirect({ role: "admin", status: "active" });
    expect(redirect).toBe("/admin");
  });

  it("redirects pending employee applicants strictly to /awaiting-approval", () => {
    const redirect1 = getPostLoginRedirect({ role: "pending_employee", status: "pending" });
    expect(redirect1).toBe("/awaiting-approval");

    const redirect2 = getPostLoginRedirect({ role: "pending_employee", status: "active" });
    expect(redirect2).toBe("/awaiting-approval");
  });

  it("blocks suspended accounts from entering dashboards", () => {
    const redirect = getPostLoginRedirect({ role: "employee", status: "suspended" });
    expect(redirect).toContain("error=account_suspended");
  });

  it("blocks rejected applicants from entering dashboards", () => {
    const redirect = getPostLoginRedirect({ role: "pending_employee", status: "rejected" });
    expect(redirect).toContain("error=application_rejected");
  });

  it("verifies employee area authorization boundaries", () => {
    // Visitor / Client cannot access employee area
    expect(canAccessEmployeeArea("client", "active")).toBe(false);
    expect(canAccessEmployeeArea("pending_employee", "pending")).toBe(false);

    // Suspended employee cannot access employee area
    expect(canAccessEmployeeArea("employee", "suspended")).toBe(false);

    // Active employee and Admin can access
    expect(canAccessEmployeeArea("employee", "active")).toBe(true);
    expect(canAccessEmployeeArea("admin", "active")).toBe(true);
  });

  it("verifies admin area authorization boundaries", () => {
    expect(canAccessAdminArea("client", "active")).toBe(false);
    expect(canAccessAdminArea("pending_employee", "pending")).toBe(false);
    expect(canAccessAdminArea("employee", "active")).toBe(false);
    expect(canAccessAdminArea("admin", "suspended")).toBe(false);

    // Only active admin can access
    expect(canAccessAdminArea("admin", "active")).toBe(true);
  });

  it("enforces allowed order status progression steps for employees", () => {
    // Employee can move accepted -> in_progress
    expect(canEmployeeTransitionOrderStatus("accepted", "in_progress")).toBe(true);
    // Employee cannot directly move submitted -> in_progress (requires admin review & quote)
    expect(canEmployeeTransitionOrderStatus("submitted", "in_progress")).toBe(false);
    // Employee can move in_progress -> delivered
    expect(canEmployeeTransitionOrderStatus("in_progress", "delivered")).toBe(true);
    // Employee cannot close or cancel order (admin only)
    expect(canEmployeeTransitionOrderStatus("in_progress", "closed")).toBe(false);
    expect(canEmployeeTransitionOrderStatus("in_progress", "cancelled")).toBe(false);
  });
});

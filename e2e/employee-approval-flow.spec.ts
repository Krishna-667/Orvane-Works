import { test, expect } from "@playwright/test";

test.describe("Flow 2: Employee Request, Admin Approval & Profile Editor", () => {
  test("Applicant applies to join team, sees awaiting approval, admin reviews queue, employee edits profile", async ({
    page,
    context,
  }) => {
    // 1. Visit /join ("Join our team")
    await page.goto("/join", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toContainText(/Join the Orvane/i);

    // Verify application form fields exist using IDs
    await expect(page.locator("#fullName")).toBeVisible();
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#coverNote")).toBeVisible();

    // 2. Set authenticated holding session
    await context.addCookies([
      {
        name: "sb-mock-auth-token",
        value: "mock-session-valid",
        domain: "localhost",
        path: "/",
      },
    ]);

    // 3. Pending applicant accesses /awaiting-approval holding view
    await page.goto("/awaiting-approval", { waitUntil: "domcontentloaded" });
    await expect(page.getByText(/Application Received/i)).toBeVisible();
    await expect(page.getByText(/Pending Founder Review/i)).toBeVisible();

    // 4. Admin opens /admin/employees
    await page.goto("/admin/employees", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toContainText(/Employee Directory/i);
    await expect(page.getByText(/Pending Employee Queue/i)).toBeVisible();

    // 5. Employee opens /employee hub
    await page.goto("/employee", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toContainText(/Employee Hub/i);

    // 6. Employee opens /employee/profile editor
    await page.goto("/employee/profile", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toContainText(/Public Studio Profile Editor/i);
    await expect(page.getByText(/Live Preview/i).first()).toBeVisible();
  });
});

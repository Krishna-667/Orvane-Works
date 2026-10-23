import { test, expect } from "@playwright/test";

test.describe("Flow 1: Client Sign-up, Order Request & Detail View", () => {
  test("Client registration, protected route guard, and new order request form", async ({
    page,
    context,
  }) => {
    // 1. Visit signup page
    await page.goto("/signup", { waitUntil: "domcontentloaded" });
    await expect(
      page.getByRole("heading", { name: /Create Client Account/i })
    ).toBeVisible();

    // 2. Unauthenticated visit to /dashboard redirects to /login (Security guard verification)
    await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(/.*login.*callbackUrl/);

    // 3. Set authenticated client session
    await context.addCookies([
      {
        name: "sb-mock-auth-token",
        value: "mock-session-valid",
        domain: "localhost",
        path: "/",
      },
    ]);

    // 4. Authorized client visits /dashboard
    await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toContainText(/Client Portal/i);

    // 5. Navigate to new order request
    await page.goto("/dashboard/orders/new", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toContainText(/New Project Request/i);

    // Fill in project details
    await page.locator('input[name="title"]').fill("Playwright E2E Test Brand Portal");
    await page
      .locator('textarea[name="project_brief"]')
      .fill(
        "Automated end-to-end test brief validating full client order request lifecycle for Madurai studio."
      );

    // Verify submit button is visible
    const submitBtn = page.getByRole("button", { name: /Submit Order Request/i });
    await expect(submitBtn).toBeVisible();
  });

  test("Client order detail view with timeline, deliverables, and messages", async ({
    page,
    context,
  }) => {
    await context.addCookies([
      {
        name: "sb-mock-auth-token",
        value: "mock-session-valid",
        domain: "localhost",
        path: "/",
      },
    ]);

    await page.goto("/dashboard/orders/ORV-2026-0001", {
      waitUntil: "domcontentloaded",
    });
    await expect(page.locator("h1")).toContainText(/Starter Brand Website/i);

    // Verify visual status timeline exists
    await expect(page.getByText(/Active Step|In Progress/i).first()).toBeVisible();

    // Verify deliverables vault
    await expect(page.getByText(/Deliverables & Project Files/i)).toBeVisible();

    // Verify discussion thread
    await expect(page.getByText(/Project Discussion Thread/i)).toBeVisible();
  });
});

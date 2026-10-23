import { test, expect } from "@playwright/test";

test.describe("Flow 3: Contact Form & Studio Inquiries", () => {
  test("Visitor visits contact page, fills inquiry form with Madurai contact coordinates", async ({
    page,
    context,
  }) => {
    // 1. Visit /contact
    await page.goto("/contact", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toContainText(/Let's Build|Something Bold/i);

    // Verify contact coordinates
    await expect(page.getByText(/Madurai, Tamil Nadu/i).first()).toBeVisible();
    await expect(page.getByText(/Direct Communication/i)).toBeVisible();

    // Verify form fields by ID
    await expect(page.locator("#name")).toBeVisible();
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#message")).toBeVisible();

    // 2. Set authenticated session for admin
    await context.addCookies([
      {
        name: "sb-mock-auth-token",
        value: "mock-session-valid",
        domain: "localhost",
        path: "/",
      },
    ]);

    // 3. Admin verifies inquiry arrives in /admin/inbox
    await page.goto("/admin/inbox", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toContainText(/Studio Inbox/i);
    await expect(page.getByText(/Contact Inquiries/i).first()).toBeVisible();
    await expect(page.getByText(/Hardware & IoT Waitlist/i).first()).toBeVisible();
  });
});

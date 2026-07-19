import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("page contains required metadata", async ({ page }) => {
  await expect(page).toHaveTitle(/\S+/);

  await expect(
    page.locator('meta[name="description"]')
  ).toHaveAttribute("content", /\S+/);

  await expect(
    page.locator('meta[name="viewport"]')
  ).toHaveAttribute("content", /width=device-width/);

  await expect(page.locator("html")).toHaveAttribute("lang", /\S+/);
});

test("page contains one primary heading", async ({ page }) => {
  await expect(page.locator("h1")).toHaveCount(1);
});

test("images contain alt attributes", async ({ page }) => {
  const images = page.locator("img");
  const count = await images.count();

  for (let index = 0; index < count; index += 1) {
    await expect(images.nth(index)).toHaveAttribute("alt");
  }
});
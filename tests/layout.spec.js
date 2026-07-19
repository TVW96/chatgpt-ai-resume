import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("page does not overflow horizontally", async ({ page }) => {
  const dimensions = await page.evaluate(() => ({
    viewportWidth: document.documentElement.clientWidth,
    contentWidth: document.documentElement.scrollWidth
  }));

  expect(dimensions.contentWidth).toBeLessThanOrEqual(
    dimensions.viewportWidth
  );
});

test("navigation uses flexbox", async ({ page }) => {
  const navigation = page.locator("nav ul");

  const display = await navigation.evaluate(
    (element) => getComputedStyle(element).display
  );

  expect(display).toBe("flex");
});

test("grid uses CSS Grid", async ({ page }) => {
  const grid = page.locator(".product-grid");

  if (await grid.count()) {
    const display = await grid.evaluate(
      (element) => getComputedStyle(element).display
    );

    expect(display).toBe("grid");
  }
});
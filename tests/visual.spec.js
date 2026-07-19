import { test, expect } from "@playwright/test";

test("homepage matches approved design", async ({ page }) => {
  await page.goto("/");

  await page.evaluate(async () => {
    await document.fonts.ready;
  });

  await expect(page).toHaveScreenshot("homepage.png", {
    fullPage: true,
    animations: "disabled",
    maxDiffPixelRatio: 0.01
  });
});
import { test, expect } from "@playwright/test";

test("can filter by name", async ({ page }) => {
  await page.goto("/tunnellers");

  await page
    .getByRole("button", { name: "Filter names by the letter W" })
    .click();
  await expect(page.getByRole("heading", { level: 2 })).toHaveText("W");

  const tunneller = page.getByRole("link", {
    name: "Sapper Claude Percival Wells",
  });
  await expect(tunneller).toBeVisible();

  const pElements = await page
    .locator("p[class*='RollDetails_surname']")
    .evaluateAll((elements) => {
      return elements.map((element) => element.textContent!.trim());
    });
  expect(pElements.every((text) => text.startsWith("W"))).toBeTruthy();
});

test("can click on a name", async ({ page }) => {
  await page.goto("/tunnellers");

  const tunneller = page.getByRole("link", {
    name: "Sapper Claude Percival Wells",
  });
  await tunneller.hover();
  await tunneller.click();
  page.waitForLoadState("domcontentloaded");

  await expect(page).toHaveURL(/tunnellers\/895/);
});

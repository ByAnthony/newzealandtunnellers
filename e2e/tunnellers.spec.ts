import { test, expect } from "@playwright/test";

test("can filter by name", async ({ page }) => {
  await page.goto("/tunnellers");

  await page
    .getByRole("button", { name: "Filter names by the letter W" })
    .click();
  await expect(page.getByRole("heading", { level: 2 })).toHaveText("W");
  await expect(
    page.getByRole("link", { name: "Claude Percival Wells 1886-" }),
  ).toBeVisible();

  const pElements = await page
    .locator("p[class*='RollDetails_surname']")
    .evaluateAll((elements) => {
      return elements.map((element) => element.textContent!.trim());
    });

  await expect(pElements.every((text) => text.startsWith("W"))).toBeTruthy();
});

import { test, expect } from "@playwright/test";

test("can change page and click on a name", async ({ page }) => {
  await page.goto("/tunnellers");

  await page.getByRole("button", { name: "38" }).click();
  await page.getByRole("button", { name: "37" }).click();
  await page.getByRole("button", { name: "36" }).click();

  const tunneller = page.getByRole("link", {
    name: "Sapper Claude Percival Wells",
  });
  await tunneller.hover();
  await tunneller.click();
  await page.waitForLoadState("domcontentloaded");

  await expect(page).toHaveURL(/tunnellers\/895/);
});

test("can filter and adjust pagination", async ({ page }) => {
  await page.goto("/tunnellers");

  await expect(page.getByText("936 results")).toBeVisible();

  await page.getByRole("button", { name: "38" }).click();

  await expect(page.getByRole("button", { name: "‣" }).first()).toBeVisible();
  await expect(page.getByRole("button", { name: "1" })).toBeVisible();
  await expect(page.getByText("...")).toBeVisible();
  await expect(page.getByRole("button", { name: "38" })).toBeVisible();
  await expect(page.getByRole("button", { name: "‣" }).nth(1)).toBeVisible();
  await expect(page.getByRole("button", { name: "‣" }).nth(1)).toBeDisabled();

  await page.getByLabel("7th Reinforcements").click();
  await expect(page.getByText("31 results")).toBeVisible();

  await expect(page.getByRole("button", { name: "‣" }).first()).toBeVisible();
  await expect(page.getByRole("button", { name: "‣" }).first()).toBeDisabled();
  await expect(page.getByRole("button", { name: "1" })).toBeVisible();
  await expect(page.getByRole("button", { name: "1" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "2" })).toBeVisible();
  await expect(page.getByRole("button", { name: "‣" }).nth(1)).toBeVisible();
});

test("can reset filters and adjust pagination", async ({ page }) => {
  await page.goto("/tunnellers");

  await expect(page.getByText("936 results")).toBeVisible();

  await expect(page.getByRole("button", { name: "‣" }).first()).toBeVisible();
  await expect(page.getByRole("button", { name: "‣" }).first()).toBeDisabled();
  await expect(page.getByRole("button", { name: "1" })).toBeVisible();
  await expect(page.getByText("...")).toBeVisible();
  await expect(page.getByRole("button", { name: "38" })).toBeVisible();
  await expect(page.getByRole("button", { name: "‣" }).nth(1)).toBeVisible();

  await page.getByLabel("1st Reinforcements").click();
  await expect(page.getByText("103 results")).toBeVisible();

  await expect(page.getByRole("button", { name: "‣" }).first()).toBeVisible();
  await expect(page.getByRole("button", { name: "‣" }).first()).toBeDisabled();
  await expect(page.getByRole("button", { name: "1" })).toBeVisible();
  await expect(page.getByRole("button", { name: "1" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "2" })).toBeVisible();
  await expect(page.getByRole("button", { name: "3" })).toBeVisible();
  await expect(page.getByRole("button", { name: "4" })).toBeVisible();
  await expect(page.getByRole("button", { name: "5" })).toBeVisible();
  await expect(page.getByRole("button", { name: "‣" }).nth(1)).toBeVisible();

  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(page.getByText("936 results")).toBeVisible();

  await expect(page.getByRole("button", { name: "‣" }).first()).toBeVisible();
  await expect(page.getByRole("button", { name: "‣" }).first()).toBeDisabled();
  await expect(page.getByRole("button", { name: "1" })).toBeVisible();
  await expect(page.getByText("...")).toBeVisible();
  await expect(page.getByRole("button", { name: "38" })).toBeVisible();
  await expect(page.getByRole("button", { name: "‣" }).nth(1)).toBeVisible();
});

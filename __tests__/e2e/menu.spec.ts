import { test, expect } from "@playwright/test";

test("can click on logo to go to home page", async ({ page }) => {
  await page.goto("/tunnellers");

  const logo = page.getByLabel("Go to the Homepage");
  await logo.click();

  await expect(page).toHaveURL("/");
});

test("can search for a name", async ({ page }) => {
  await page.goto("/tunnellers");

  const search = page.locator("input");
  expect(search).toHaveAttribute("placeholder", "Search for a Tunneller");

  const input = "james williamson";

  expect(search.inputValue()).toBeNull;
  await search.type(input);
  expect(await search.inputValue()).toEqual(input);

  await expect(
    page.locator("a").filter({ hasText: "James Williamson (1877-1956)" }),
  ).toBeVisible();
  await expect(
    page.locator("a").filter({ hasText: "James Williamson (1876-†?)" }),
  ).toBeVisible();
});

test("can search and click on a name", async ({ page }) => {
  await page.goto("/tunnellers");

  await page.locator("input").type("joseph");
  const tunneller = page
    .locator("a")
    .filter({ hasText: "Joseph Kelly (?-1933)" });
  await tunneller.hover();
  await tunneller.click();
  page.waitForLoadState("domcontentloaded");

  await expect(page).toHaveURL("/tunnellers/442");
});

test("can close the dropdown by clicking outside", async ({ page }) => {
  await page.goto("/tunnellers");

  await page.locator("input").type("james");
  await page.mouse.click(1, 1);

  await expect(page.locator("[class*='dropdown']")).not.toBeVisible();
});

test("can reopen the dropdown by clicking the search", async ({ page }) => {
  await page.goto("/tunnellers");

  const search = page.locator("input");
  await search.type("james");
  await page.mouse.click(1, 1);

  await expect(page.locator("[class*='dropdown']")).not.toBeVisible();

  await search.click();
  await expect(page.locator("[class*='dropdown']")).toBeVisible();
});

test("can remove a name", async ({ page }) => {
  await page.goto("/tunnellers");

  const search = page.locator("input");
  await search.type("david");
  await expect(page.locator("[class*='dropdown']")).toBeVisible();

  await search.fill("");
  await expect(page.locator("[class*='dropdown']")).not.toBeVisible();
  await expect(search).toHaveAttribute("placeholder", "Search for a Tunneller");
});

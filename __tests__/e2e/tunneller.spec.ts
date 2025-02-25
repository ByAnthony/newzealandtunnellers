import { test, expect } from "@playwright/test";

test("can click on Tunnellers to go to Tunnellers list", async ({ page }) => {
  await page.goto("/tunnellers/274");

  await page.getByRole("link", { name: "Tunnellers" }).first().click();
  await page.waitForLoadState("domcontentloaded");

  await expect(page).toHaveURL(/tunnellers/);
});

test("can click on timeline button", async ({ page }) => {
  await page.goto("/tunnellers/274");

  page.getByLabel(/Open the World War I timeline/).click();
  await expect(page).toHaveURL(/tunnellers\/274\/wwi-timeline/);
});

test("can click on awmm link", async ({ page }) => {
  await page.goto("/tunnellers/274");

  page.getByRole("link", { name: "Online Cenotaph He Toa" }).click();
  const uri =
    "https://www.aucklandmuseum.com/war-memorial/online-cenotaph/record/C43340";
  await expect(page).toHaveURL(uri);
});

test("can click on the tunnellers link", async ({ page }) => {
  await page.goto("/tunnellers/274");

  page.getByRole("link", { name: "Military Personnel File" }).click();
  const uri =
    "https://collections.archives.govt.nz/web/arena/search#/entity/aims-archive/R21003568";
  await expect(page).toHaveURL(uri);
});

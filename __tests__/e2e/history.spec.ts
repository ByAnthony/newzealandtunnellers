import { test, expect } from "@playwright/test";

test("can navigate to next chapters", async ({ page }) => {
  await page.goto("/");

  const heading = await page.getByRole("heading", { name: "Chapter" });

  const chapter1 = await page.getByLabel("Go to Chapter 1: Call To Pick");
  await chapter1.click();

  await page.waitForURL("/history/call-to-pick-and-shovel/", {
    waitUntil: "load",
  });
  await expect(page).toHaveURL("/history/call-to-pick-and-shovel/");
  const chapter1Title = page
    .getByText("Call To Pick & Shovel", { exact: true })
    .filter({ hasNot: page.locator("#__next-route-announcer__") });
  await expect(chapter1Title).toBeVisible();
  await expect(heading).toBeVisible();

  const chapter2Link = await page.getByLabel("Go to Chapter 2: Journey To");
  await chapter2Link.hover();
  await chapter2Link.click();

  await page.waitForURL("/history/journey-to-war/", { waitUntil: "load" });
  await expect(page).toHaveURL("/history/journey-to-war/");
  const chapter2Title = page
    .getByText("Journey To War", { exact: true })
    .filter({ hasNot: page.locator("#__next-route-announcer__") });
  await expect(chapter2Title).toBeVisible();
  await expect(heading).toBeVisible();

  const chapter3Link = await page.getByLabel("Go to Chapter 3: Beneath");
  await chapter3Link.hover();
  await chapter3Link.click();

  await page.waitForURL("/history/beneath-artois-fields/", {
    waitUntil: "load",
  });
  await expect(page).toHaveURL("/history/beneath-artois-fields/");
  const chapter3Title = page
    .getByText("Beneath Artois Fields", { exact: true })
    .filter({ hasNot: page.locator("#__next-route-announcer__") });
  await expect(chapter3Title).toBeVisible();
  await expect(heading).toBeVisible();

  const chapter4Link = await page.getByLabel("Go to Chapter 4: Tunnelling");
  await chapter4Link.hover();
  await chapter4Link.click();

  await page.waitForURL("/history/tunnelling-under-arras/", {
    waitUntil: "load",
  });
  await expect(page).toHaveURL("/history/tunnelling-under-arras/");
  const chapter4Title = page
    .getByText("Tunnelling Under Arras", { exact: true })
    .filter({ hasNot: page.locator("#__next-route-announcer__") });
  await expect(chapter4Title).toBeVisible();
  await expect(heading).toBeVisible();

  const chapter5Link = await page.getByLabel("Go to Chapter 5: Always");
  await chapter5Link.hover();
  await chapter5Link.click();

  await page.waitForURL("/history/always-digging/", {
    waitUntil: "load",
  });
  await expect(page).toHaveURL("/history/always-digging/");
  const chapter5Title = page
    .getByText("Always Digging", { exact: true })
    .filter({ hasNot: page.locator("#__next-route-announcer__") });
  await expect(chapter5Title).toBeVisible();
  await expect(heading).toBeVisible();

  const chapter6Link = await page.getByLabel("Go to Chapter 6: Bridging");
  await chapter6Link.hover();
  await chapter6Link.click();

  await page.waitForURL("/history/bridging-at-the-end/", {
    waitUntil: "load",
  });
  await expect(page).toHaveURL("/history/bridging-at-the-end/");
  const chapter6Title = page
    .getByText("Bridging At The End", { exact: true })
    .filter({ hasNot: page.locator("#__next-route-announcer__") });
  await expect(chapter6Title).toBeVisible();
  await expect(heading).toBeVisible();

  const chapter7Link = await page.getByLabel("Go to Chapter 7: After The");
  await chapter7Link.hover();
  await chapter7Link.click();

  await page.waitForURL("/history/after-the-armistice/", {
    waitUntil: "load",
  });
  await expect(page).toHaveURL("/history/after-the-armistice/");
  const chapter7Title = page
    .getByText("After The Armistice", { exact: true })
    .filter({ hasNot: page.locator("#__next-route-announcer__") });
  await expect(chapter7Title).toBeVisible();
  await expect(heading).toBeVisible();
});

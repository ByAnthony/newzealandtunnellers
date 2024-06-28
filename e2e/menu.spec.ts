import { test, expect } from "@playwright/test";

test("can search for a tunneller", async ({ page }) => {
  await page.goto("/tunnellers");

  const search = await page.locator("input");
  expect(search).toHaveAttribute("placeholder", "Search for a Tunneller");

  const input = "james williamson";

  expect(search.inputValue()).toBeNull;
  await search.type(input);
  expect(await search.inputValue()).toEqual(input);

  const names = await page
    .getByRole("link", { name: "See James Williamson profile" })
    .evaluateAll((elements) => {
      return elements.map((element) => element.textContent!);
    });

  console.log(names);
  expect(names).toHaveLength(2);
});

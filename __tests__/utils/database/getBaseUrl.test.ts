import { getBaseUrl } from "@/utils/database/getBaseUrl";

describe("getBaseUrl function", () => {
  test.each([
    ["production", "https://www.nztunnellers.com"],
    ["development", "http://localhost:3000"],
    [undefined, "http://localhost:3000"],
  ])(
    'returns the localhost URL when VERCEL_ENV is "%s"',
    (vercelEnv, expectedUrl) => {
      process.env.VERCEL_ENV = vercelEnv;
      const result = getBaseUrl();
      expect(result).toBe(expectedUrl);
    },
  );
});

export function getBaseUrl() {
    return process.env.VERCEL_ENV === "production"
      ? `https://www.nztunnellers.com`
      : `http://localhost:3000`;
  }
  
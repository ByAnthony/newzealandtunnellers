/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  // Temporary for prod testing
  basePath: "/staging",
  assetPrefix: "/staging",
  experimental: {
    // This is experimental but can
    // be enabled to allow parallel threads
    // with nextjs automatic static generation
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;

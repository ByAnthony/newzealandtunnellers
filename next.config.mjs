/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  // Temporary for prod testing
  basePath: "/staging",
  assetPrefix: "/staging",
  images: {
    loader: "custom",
    loaderFile: "./utils/imageLoader.ts",
  },
  experimental: {
    // This is experimental but can
    // be enabled to allow parallel threads
    // with nextjs automatic static generation
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;

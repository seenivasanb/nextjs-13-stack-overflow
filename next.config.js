/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    mdxRs: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    remotePatterns: [
      { hostname: "*", protocol: "https" },
      { hostname: "img.clerk.com", protocol: "http" },
    ],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */

// const withPWA = require("@ducanh2912/next-pwa").default({
//   dest: "public",
//   cacheOnFrontEndNav: true,
//   aggressiveFrontEndNavCaching: true,
//   reloadOnOnline: true,
//   swcMinify: true,
//   disable: false,
//   workboxOptions: {
//     disableDevLogs: true,
//   },
// });

const nextConfig = {
  // experimental: {
  //   scrollRestoration: true,
  // },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },

  distDir: "build",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tailwindui.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "testing.majjakodeals.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.eatthis.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "duyt4h9nfnj50.cloudfront.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "th.bing.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "opencart4.magentech.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dev.chowchowexpress.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "developer.mydvls.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "developer.mydvls.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dev.majjakodeals.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "dev.majjakodeals.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.rareblocks.xyz",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "developer.mydvls.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });
// module.exports = withBundleAnalyzer({});

// const {
//   PHASE_DEVELOPMENT_SERVER,
//   PHASE_PRODUCTION_BUILD,
// } = require("next/constants");

// /** @type {import("next").NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// module.exports = (phase) => {
//   if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
//     const withPWA = require("@ducanh2912/next-pwa").default({
//       dest: "public",
//     });
//     return withPWA(nextConfig);
//   }
//   return nextConfig;
// };

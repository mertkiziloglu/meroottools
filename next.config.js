const { withSentryConfig } = require("@sentry/nextjs");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/**
 * @type {import('next').NextConfig}
 */
const config = {
  // Remove output: "export" for Heroku
  reactStrictMode: false,
  productionBrowserSourceMaps: true,
  eslint: {
    // Disable ESLint during build for Heroku
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript errors during build for Heroku
    ignoreBuildErrors: true,
  },
  compiler: {
    styledComponents: true,
  },
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false };
    config.output.webassemblyModuleFilename = "static/wasm/[modulehash].wasm";
    config.experiments = { asyncWebAssembly: true, layers: true };

    if (!isServer) {
      config.output.environment = { ...config.output.environment, asyncFunction: true };
    }

    return config;
  },
};

const configExport = () => {
  if (process.env.ANALYZE === "true") return withBundleAnalyzer(config);

  return config;
};

module.exports = configExport();

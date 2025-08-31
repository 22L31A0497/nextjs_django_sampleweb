/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { appDir: true, serverComponentsExternalPackages: ["mongoose"] , typedRoutes: true},
  webpack(config) {
      config.experiments = { ...config.experiments, topLevelAwait: true };
      return config;
  },
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'encrypted-tbn0.gstatic.com'
    ],
  },
}

module.exports = nextConfig

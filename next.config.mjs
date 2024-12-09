/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    serverRuntimeConfig: {
      port: process.env.NEXT_PUBLIC_FRONTEND_PORT || 3000, // Default to 3000 if no PORT variable is set
    },
    experimental: {
        forceSwcTransforms: true,
      },
    images: {
        unoptimized: true,
    },
    sassOptions: {
        includePaths: ['./styling'],
    },
    webpack(config, { isServer }) {
        // Conditionally disable Babel for production build
        if (!isServer) {
          config.resolve.extensions.push('.ts', '.tsx');
        }
        return config;
      },
};

export default nextConfig;

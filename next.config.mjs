/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    reactStrictMode: true,
    swcMinify: true,
    serverRuntimeConfig: {
      NEXT_PUBLIC_FRONTEND_PORT: process.env.NEXT_PUBLIC_FRONTEND_PORT || 3000, // Default to 3000 if no PORT variable is set
      NEXT_PUBLIC_BACKEND_PORT: process.env.NEXT_PUBLIC_BACKEND_PORT,
      NEXT_PUBLIC_APP: process.env.NEXT_PUBLIC_APP,
      SQLLite_DB_PATH: process.env.SQLLite_DB_PATH,
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
    env: {
      NEXT_PUBLIC_FRONTEND_PORT: process.env.NEXT_PUBLIC_FRONTEND_PORT,
      NEXT_PUBLIC_BACKEND_PORT: process.env.NEXT_PUBLIC_BACKEND_PORT,
      NEXT_PUBLIC_APP: process.env.NEXT_PUBLIC_APP,
      SQLLite_DB_PATH: process.env.SQLLite_DB_PATH,
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

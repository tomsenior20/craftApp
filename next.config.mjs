/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
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

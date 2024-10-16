/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        unoptimized: true,
    },
    sassOptions: {
        includePaths: ['./styling'],
    },
    experimental: {
        appDir: true,
    },
};

export default nextConfig;

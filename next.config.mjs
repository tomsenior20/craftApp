/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',  // Enables static export
    reactStrictMode: true,
    images: {
        unoptimized: true,  // Useful for handling static exports with images
    },
    sassOptions: {
        // Optionally add custom paths for SCSS
        includePaths: ['./styling'],
    },
};

export default nextConfig;

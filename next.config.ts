import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            // Google Drive
            {
                protocol: 'https',
                hostname: 'drive.google.com',
            },
            // Googleusercontent
            {
                protocol: 'https',
                hostname: '**.googleusercontent.com',
            },
            // Github
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
            // DiceBear
            {
                protocol: 'https',
                hostname: 'api.dicebear.com',
            },
            // Unsplash
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            // Blogger
            {
                protocol: 'https',
                hostname: '**.blogspot.com',
            },
            {
                protocol: 'https',
                hostname: '**.blogger.com',
            }
        ],
        dangerouslyAllowSVG: true,
    },

    async rewrites() {
        return [
            {
                source: "/blog/:slug.html",
                destination: "/blog/:slug",
            },
        ];
    },
};

export default nextConfig;
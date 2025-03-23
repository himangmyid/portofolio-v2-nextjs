import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        domains: ["avatars.githubusercontent.com", "api.dicebear.com",
        ],
        dangerouslyAllowSVG: true,
    },
};

export default nextConfig;

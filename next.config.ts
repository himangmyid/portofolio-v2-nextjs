import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        domains: ["api.dicebear.com"
        ],
        dangerouslyAllowSVG: true,
    },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Permite nombres de archivo con caracteres especiales (acentos, etc.)
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  output: undefined,
};

export default nextConfig;

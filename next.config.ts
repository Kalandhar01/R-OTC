import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: ["10.54.155.196", "10.185.136.238", "10.169.138.244", "10.48.213.238"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dgqbgdk73/**"
      }
    ]
  }
};

export default nextConfig;

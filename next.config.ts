import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tắt strict mode để tránh double render trong môi trường development
  // Lưu ý: Nên bật lại khi debug các vấn đề về side effects
  reactStrictMode: false,

  images: {
    // Cho phép hiển thị ảnh từ Cloudinary
    domains: ["res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },

  // Bỏ qua lỗi ESLint khi build
  // TODO: Xử lý các lỗi ESLint và bật lại check
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Bỏ qua lỗi TypeScript khi build
  // TODO: Xử lý các lỗi TypeScript và bật lại check
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

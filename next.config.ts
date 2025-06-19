import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 禁用开发模式指示器
  devIndicators: {
    appIsrStatus: false,
  },
  
  // Vercel部署无需静态导出
  // output: 'export', // 注释掉，Vercel支持SSR
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
    // Vercel支持图片优化
    unoptimized: false,
  },
};

export default nextConfig;

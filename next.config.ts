import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // Image optimization
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  
  // Experimental features
  experimental: {
    optimizeCss: true,
  },
  
  // Caching
  generateEtags: true,
  
  // Turbopack config
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
          formats: ['image/avif', 'image/webp'],
          remotePatterns: [{ protocol: 'https', hostname: '**' }],
    },
    experimental: {
          optimizePackageImports: ['lucide-react', 'framer-motion'],
    },
    eslint: { ignoreDuringBuilds: true },
    typescript: { ignoreBuildErrors: true },
};

export default nextConfig;

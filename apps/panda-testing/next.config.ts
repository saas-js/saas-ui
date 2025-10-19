import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    externalDir: true,
  },
  transpilePackages: ['@saas-ui/panda-preset', '@saas-ui/react-panda'],
}

export default nextConfig

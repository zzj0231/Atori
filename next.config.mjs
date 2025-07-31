/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'skyjj.oss-cn-shenzhen.aliyuncs.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // 忽略 @typescript/vfs 的动态依赖警告
    config.ignoreWarnings = [
      {
        module: /node_modules\/@typescript\/vfs/,
      },
    ]
    return config
  },
}

export default nextConfig

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
}

export default nextConfig

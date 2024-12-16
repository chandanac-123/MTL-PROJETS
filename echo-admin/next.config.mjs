/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  images: {
    domains: ['tmp-dev-media.s3.ap-south-1.amazonaws.com'], // Add your external domain here
  },
};

export default nextConfig;

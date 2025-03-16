/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "ca-central-1.graphassets.com",
      "lh3.googleusercontent.com",
      "images.pexels.com",
    ],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // For docker container
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
        pathname: "/**/*",
      },
    ],
  },
};

export default nextConfig;

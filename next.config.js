/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["sallysbakingaddiction.com", "127.0.0.1"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "sallysbakingaddiction.com",
        port: "",
        pathname: "/wp-content/uploads/*",
      },
    ],
  },
};

module.exports = nextConfig;

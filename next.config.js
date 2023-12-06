/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["sallysbakingaddiction.com"],

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

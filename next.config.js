/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "127.0.0.1",
      "ec2-18-118-138-187.us-east-2.compute.amazonaws.com",
    ],

    remotePatterns: [
      {
        protocol: "http",
        hostname: "ec2-18-118-138-187.us-east-2.compute.amazonaws.com",
        port: "",
        pathname: "/static/media/uploads/*",
      },
    ],
  },
};

module.exports = nextConfig;

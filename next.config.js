/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/grimdoku",
        destination: "https://www.amazon.com/s?k=Grimdoku+Chris+Ashby",
        permanent: false,
      },
    ];
  },
};
module.exports = nextConfig;

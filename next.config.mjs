/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    serverComponentsExternalPackages: ["bcrypt", "bcryptjs"],
  },
};

export default nextConfig;

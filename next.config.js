/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export for AWS Amplify Hosting.
  output: 'export',
  // Emit /signin/index.html instead of /signin.html so static hosting resolves it.
  trailingSlash: true,
};

module.exports = nextConfig;

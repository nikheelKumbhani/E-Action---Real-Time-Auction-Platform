/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'cdn-icons-png.flaticon.com'], // Add Cloudinary and Flaticon domains
  },

  // Fix 404 on refresh - redirect all routes to index for client-side routing
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/',
      },
    ]
  },
}

module.exports = nextConfig 
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // configuring redirects when needed, to change when a route needs to be redirected
  redirects: async () => {
    return [
      {
        // source: "/preview-news",
        source: "/preview-news2",
        destination: "/",
        // permanent: true // sends a 308 response, resulting in permanent redirect
        permanent: false // sends a 307 response, resulting in temporary redirect
      },
      // we could also do something like this for dynamic routes matching,there are many others ways to do redirects, nextjs docs has them all explained
      {
        source: "/old-blog/:id",
        destination: "/new-blog/:id",
        permanent: true
      },
    ]
  },
  // configuring remote image pathname
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/original',
      },
    ],
  },
  // images: {
  //   loader: "default",
  //   minimumCacheTTL: 60,
  //   domains: ["image.tmdb.org"],
  // },
}

module.exports = nextConfig

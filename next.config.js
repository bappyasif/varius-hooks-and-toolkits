/** @type {import('next').NextConfig} */
const nextConfig = {
  // development mode only feature to highlight any protential problem in app
  // such as unstable lifecycle, legacy api usage and others featuresd o keep app free from problems
  reactStrictMode: true,

  // we can setup any redirect path that we mihgt need from here, either permanently or temporarily
  redirects: async () => {
    return [
      {
        source: "/test",
        destination: "/",
        permanent: true
      },
      {
        source: "/old-blog/:id",
        destination: "/new-blog/:id",
        permanent: false
      }
    ]
  }
}

module.exports = nextConfig

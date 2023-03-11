/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // remotePatterns: [
  //   // { hostname: "media.rawg.io" },
  //   // { hostname: "miro.medium.com" },
  //   // {
  //   //   protocol: "https",
  //   //   hostname: "media.rawg.io",
  //   //   pathname: "/**",
  //   // },
  //   // domains: 
  // ],
  images: {
    domains: ['media.rawg.io', "is4-ssl.mzstatic.com"],
  }
}

module.exports = nextConfig

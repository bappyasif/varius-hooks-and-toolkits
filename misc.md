# build, start, and export
## build
builds application for production in .next folder
## start
starts a nodejs server that supports hybrid pages, serving both statically generated and server-side rendered pages
## export
exports all pages to static html files that you can serve without need of a nodejs server
* we can host our app on any static hosting services or a CDN without having to maintain a server
* but limitiations includes no features such as ISR (incremental static regenertions) or SSR (static site regenerations), also no Image optimization is available in nextjs export mode
* client side data fetching feature still remain intact in static html pages, which gives dynamic data fetching capabilities
* probable candidates for nextjs export would be, Landing Pages, blogs, and any app where contents are generated during build time
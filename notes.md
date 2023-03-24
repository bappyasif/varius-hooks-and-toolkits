# NextJS build, start, and export
## build
build app fpr production in .next folder
## start
starts a node server that supports hybrid pages serving both staticallly generated and server side rendered pages
## export
exports all our pages to static HTML files that we can serve without any need of a nodes.js server
tidbits:
* host app on any static hosting service or a CDN without having to maintain a server
* can not use ISR or SSR
* client side data fetching for dynamic content
* landing pages, blogs, and any app where content is generated at build time

# when to use preview mode
in pre-rendering section, we understood about static generation where pages are pre-rendered at build time. its pretty useful when our app fetches data from a cms

however its not suitable when we're creating a draft in our cms and want to preview draft changes immediately on our page

we would want nextjs to bypass static generation for this scenario

we would deploy our app and then when making changes in opur CMS those chnages wont be reflected as pages, rather those pages are just generated for "view" purpose, untill they are part of "build" process

# authentication in nextjs
User
identity and access
identity verifies who a user is
access verifies what permission a user has
identity - authentication
access - authorization

## authentication needs to be considered in these contexts
client side authentication
server side authentication
api routes authentication

once authenticated we might need to answer whether we need user data or not
* no need to persists: for authentication we can use github, facebook and etc
* when need to persist: then we need to make use of Database


import Link from 'next/link'
import React from 'react'

/**
 * 
 * 
 * Static Generation
 * a method of pre-rendering where html pages are generated at build time
 * html with all data that makes up content of web page are generated in advance at build time
 * recommended method to pre-render pages whenever possible
 * page can be built once and cached by cdn and served to client almost instantly and indexed by a search engine for SEO purposes
 * examples: blog pages, e-commerce product pages, documentation and marketing pages
 * 
 * How?
 * nextjs by default pre-renders every page on our app
 * html for every page will automatically be statically generated when we build our app
 * prd server: an optimized build is created and no other changes are made on de go, "a page will be pre-render once at build time"
 * dev server: we are able to make any changes and see it on browser almost immediately  "a page will be pre rendered for every requests"
 * 
 * SSG with and without DATA
 * without Data: for pages that can be generated without any external data fetching at build time (for example markleting pages and as such)
 * with data: for pages that requires us to fetch external data from api or db at build time (for example ecommerce details page and as such)
 * 
 * some details
 * static generation is a method of pre rendering where html pages are generated at build time, with or without data
 * export getStaticProps function for external data
 * html, js and json file are generated
 * when navigated directly at that Static Generated page, then html file will be served
 * but when navaigated to that route from another route then Page is created on Client Side using JavaScript and JSON prefetched from server at build time 
 * 
 * some issues
 * build time is proportional to number of pages in application
 * a page, once generated, can contain stale data till next app build process
 */

const StaticSiteGenerationDemo = () => {
  return (
    <>
    <div>StaticSiteGenerationDemo</div>
    {/* any Link component in viewport (initially or through scroll) will be prefetched by default (inclusing all corresponding data) for pages using Static Generation */}
    {/* when a page with getStaticProps is pre-rendered at build time, in addition to page HTML file, also generates json file holding results of running getStaticProps */}
    {/* json file will be used in client side routing through next/link or next/router */}
    {/* when navigating to a page thats pre-rendered using getStaticProps, fetches json file (pre-computed at buidl time) and uses it as props to create page component on client side */}
    {/* client side page transitions will not call getStaticProps as only exported JSON is used */}
    <Link href={"/ssg/users"}>Users</Link>
    <Link href={"/ssg/posts"}>Posts</Link>
    </>
  )
}

export default StaticSiteGenerationDemo
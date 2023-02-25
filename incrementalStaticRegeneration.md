to update only those pages which value has been changed in datatset in server without have to rebuild entire application to reflect current changes that they have on their data, thus removing problem of "stale" data on already rendered page

this problem is solved by using ISR, Incremenetal Static Regenration

with ISR nextJS allows us to update static pages after we've built our application

we can statically generate individual pages without needing to rebuild entire site, thus solving this problem of stale data is being shown on rendered page

how we do that?
* in getStaticProps we add a "revalidate" key along with "props" key
* "revalidate" key will have numerical number (seconds) as its value
* "revalidate" will re fetch data after that "defined" time

be aware of this
* when "revalidate" kicks in after that given seconds, it will keep showing "cached" page
* while serving cahed page, nextjs will fetch and regenerate page
* once regenerate is done any subsequent reuest will be served with "regenarated" page


something about Re-Generation
* a regeneration is initiated only if a user makes a reuest after revalidate time
* if a user visits our detail page and no other user is requesting that same page then regenration wont take place
* revalidate does not mean it re-genertes after every given seconds
* it simply denotes, after that given time when a reuest is made to that page, a re generation process is initiated
* re-generations can also fail and previously generated page will be served till subsequent regeneration succeeds


# two forms of pre-rendering
* Static Generation
* Server-side Rendering

## Static Generation
* html is statically generated at build time, cached and reused at each request
* for dynamic page with getStaicPaths and fallback set to true page is not generated at build time but rather on initial request
* with incremental static regeneration, a page can be regenerated for a requested page after revalidate time has elapsed
* for most part though, pages generated using getStaticProps during build time

### problems with static generation
* we can not fetch data at request, thus surface problem of stale data
  * getStaticProps will fetch during build time which might not be suitable at all
  * getStaticPaths will help fetch data on initial request but it is then cached and served for any subsequents requests, leaving problem of stale data
  * ISR can help but but if "revalidate" is 1 second we still might not see updated data as it might be re genearting page in background, leaving potential of seeing stale data
  * if we choose not to use ISR and fetch dat on client side components then there wil be no stale data but that take SEO option out from equation which can be very problematic and at times not an option altogether
* we dont get access to incoming request, and pre-render a page specific to user
  * problem when data that needs to be user specific 
  * we could use useEffect at client side components but then again it will take SEO benefits out off of it

# Server-side rendering
* nextJS allows us to pre-render a page not at build time but at request time
* html is then generated for every incoming requests
* thus solving problem of stale data when using Static Generation
* SSR is required when we need to fetch personlaised data keeping SEO benefits intact and available

## getServerSideProps
* runs only in server side
  * code within getServerSideProps wont be included into JS bundle that sent to browser
* we can write server side code directly into getServerSideProps
  * accessing modules such as fs, database and as such can be done in it
* getSerevrSideProps is only available in a Page and not from any regular components file
  * it is used only for pre-rendering and not client side data fetching
* getServerSideProps should return an object with an object inside of it that contains props as a key and which is a an object it self
* getServerSideProps will run at request time

# pre-rendering and data fetching summary
* pre-rendering refers to process of generating html in advance which results in better performance and seo nextjs supports two forms of pre-rendering 
  * static generations
  * server side rendering

## static generations
* a method of pre-rendering where HTML pages are generated at build time
* pages can be built once and cached by a CDN and served to clients almost instantly, for example marketing or blog site
* for a normal page use getStaticProps function to fetch data  ahead of time
* for dynamic page we can use getyStaticPaths function
* fallback value could be either "false", "true" or "blocking"
* pages can not be updated without a full re-build
* to mitigate that in a way,m we can use Incremental Static Generation aka ISG with "revalidate" key for data fetching after that "time frame -- in seconds"

## server-side rendering
* fetch data at request time
* personalize data based on user information in incoming request, for example "a news listings site"
* we use then getServerSideProps function for data fetching
* combining pre-rendering with client side data fetching 
* shallow routing - routing without calling getStaticProps or getServerSideProps
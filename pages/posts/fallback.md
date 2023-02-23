when fallback is set to true these following things happens
* paths returned from getStaticPaths will be rendered to HTML at build time using getStaticProps
* paths that have not been generated at build time will not result in 404 page instead nextJs will serve a "fallback" version of this page on first request to such a path
* while doping so, in background nextJs will statically generate requested path HTML and JSON, which includes running getStaticProps
* when thats done browser recieves JSON for genertated path, this then will be used to render requested page with required props, from user perspective fallback page will be swapped with rendered page after SSG
* at same time nextJS keeps track of new list of pre-rendered pages, any subsequent requests to this same path will serve generated page, just like other pages that were pre-rendered during build time


When to set getStaticPaths "fallback" value to true?
* most suitable when app has a very large number of static pages that depend on data, for example a large ecommerce site
* when you might want to pre-rendered all the product pages but you have a numerous numbers of products, build can take a really long time
* we can statically generate only a small subset of those products (i,e, popular, deals, etc) and use fallback set to true for rest
* when somebody requests a page that is not generated yet, user will set the page with a loading indicator
* soon after that getStaticProps finishes fetching related data and rendered with requested data, form then onwards everyone who requests this same page will get statically generated pre-rendered page
* this ensures that users always have a fast experience while preserving fast builds and benefits of static site generation


when we set getStaticPaths "fallback" value to "blocking" these below mention things will happen
* paths returned from getStaticPaths will be rendered to HTML page for rendering at build time by getStaticProps
* paths that have not been generated during build time will not result in a 404 page instead on first request nextJS will render page on server and return generated HTML page
* when thats done browser recieves HTML for generated path, from user's perspective it will transition from "browser is requesting page" to "full page is loaded", there will be no "falsh" of loading fallback state
* meanwhile, nextjs keeps tracks of already pre-rendered pages, and on any subsequent requests to same path will serve already generated page, just it would have for any other pre-rendered page during build time

when to use getStaticPaths "fallback" value to "blocking"?
* on UX level, sometimes, users prefer the page to be loaded without a loading indicator, when load time is in considerable millis, this helps avoid layout shift
* some crawlers did not support javascript, loading page would be rendered and then full page would be loaded which was causing a problem
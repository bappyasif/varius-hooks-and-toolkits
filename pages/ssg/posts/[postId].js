import { PostDetails } from '@/components/post'
import { useRouter } from 'next/router'
import React from 'react'

const PostDetailPage = ({ post }) => {
    // when fallback set true
    // this is required when "true" because data is fetching in background so menawhile this "fallback" ui gets to rendered until new data is fetched and ready for rendering from that json data
    // const router = useRouter();
    // if (router.isFallback) {
    //     return <h1>Loading....</h1>
    // }


    return (
        <>
            <div>PostDetailPage</div>
            <PostDetails post={post} />
        </>
    )
}

/**
 * 
 * this is to inform nextjs what dynamic values of postId should it needs to be "pre-rendered" at build time before hand
 * 
 * when "fallback" is "false"
 * paths returned from getStaticPaths will be rendered to html at build time by getStaticProps
 * any paths not returned from getStaticPaths will result in a "404" page
 * its most suitable when an app is with a small number of paths to pre-render
 * also preferred when pages are not added too often
 * a blog site with a few articles in it is a good example of such usecase of "fallback" with value as "false"
 * 
 * 
 * when "fallback" is true
 * paths returned from getStaticPaths will be rendered to HTML at build time by getStaticProps
 * paths taht have not been generated at build time will not result in a 404 page rather nextjs will serve a fallback version of that page on first request to such a path
 * in background nextjs will staticlally generate requested path html and json, this includes running getStaticProps
 * when thats done browser recieves json for generated path. this will be used to automatically render page with required props. from user's perspective fallback page is swapped with full page
 * once rendered nexts keeps track of new list of pre-rendered pages, so that on any subsequent requests for those paths already generated page will be instead as if they were pre-rendered at build time
 * its most suitable when app has a large number of static pages that depend on data, a large ecommerce site
 * you would ideally want all product pages to render at build time but if you have thousands of products build time can take quite a while
 * we could statically generate a small portions of products that are popular and use fallback "true" for rest
 * when any user request a page that is not generated yetr then "fallback view" is shown which has a loading indicator
 * soon after when data is ready through getStaticProps page will be rendered with requested data, and then onwards for any subsequent requests same page will be served as if they were pre-rendered at build time
 * this ensures users a fast experience while preserving fast builds and benefits of static generations
 * 
 * 
 * when "fallback" is "blocking"
 * paths returned from getStaticPaths will be rendered aty build time by getStaticProps
 * paths that have not been generated at build time will not result in 404 page instead on firswt request nextjs will render page oin server and return generated HTML
 * when thats done browser recieves html for generated path, from user's perspective it will transition from "browser is requesting page" to "fully rendered page", without any falsh of "loading or any such" transitions
 * once data is rendered will be served at for any subsequest request for that page, as if they were pre-rendered at build time
 * its most suitable to avvoid "layout shifting" and "loading flashes" for a more "quaint" ux, when "wait time is very little"
 */
export const getStaticPaths = async () => {
    // const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    // const data = await response.json();
    // const paths = data.map(post => {
    //     return {
    //         params: {
    //             postId: `${post.id}`
    //         }
    //     }
    // })
    return {
        // as hard coded is not always an option we need to rather do this programatically
        paths: [
            {
                params: { postId: `1` }
            },
            {
                params: { postId: `2` }
            }
        ],
        fallback: "blocking"
        // fallback: true

        // paths: paths,
        // fallback: false
    }
}

export const getStaticProps = async context => {
    const { params } = context
    const { postId } = params
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    const data = await response.json();

    // whe "fallback" is set to true and fetched data is not found, we can simply return a "object not found" response so that a 4040 page can be served when that happens
    if(!data.id) {
        return {
            notFound: true
        }
    }

    return {
        props: { post: data }
    }
}

export default PostDetailPage
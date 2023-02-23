import Post from '@/components/post';
import { useRouter } from 'next/router';
import React from 'react'

function PostDetail({ post }) {
    // when fallback is set to true we need to have a check before rendering SSG otherwise nextJS will throw an error
    const router = useRouter();
    const isFallback = router.isFallback;
    if(isFallback) {
        // best suited in build and production mode
        // this will be visible for only first request until its (unaccounted SSG) data is pre-rendered
        // this will be executed for on first request when getStatisPaths didnt find this path specified in its paths and nextJS in background fetches this path data before it can swapped this "fallback" view with its actua content
        // after its first request when SSG is pre-rendered it will behave as those which were already pre-rendered at build time and can be found in build folder along with other SSG pages
        return (
            <h1>Loading....</h1>
        )
    }
    return (
        <div>
            <h1>PostDetail</h1>
            <Post item={post} />
        </div>
    )
}

// we need to define getStaticPath for rendering dynamic SSG pages otherwise nextJS will throw error
// we need this cause nextJS wants to know that dynamic SSG can be for many-a-pages and it needs to know up front for which of those vlaues it should be pre-fetched and pre-rendering
export async function getStaticPaths() {
    // we need to know dynamically how many posts needs to be DYnamically Generated, we need to create an array of object with same {params: {postId: [postId]}}
    // as this api does not provide how many items are provided in response, we will have to re fetch /posts endpoint and map through it to create that formated "params" object for dynamic SSG rendering and pre-fetching
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    // by default 10 posts will be fetched at one time during build time even  though we have here mentioned to pre-rendered for 6 items
    const paths = data?.slice(0,6).map(post => {
        return {
            params: {postId: `${post.id}`}
        }
    });
    // const paths = data?.map(post => {
    //     return {
    //         params: {postId: `${post.id}`}
    //     }
    // });

    // when fallback is set to false these things happens
        // paths returned from getStaticPaths will be rendered to HTML at build time by getStaticProps
        // when paths not returned by getStaticPaths wil result in a 404 page

    // when fallback should be set to false?
        // its most suitable for an app with small number of paths to pre-render dynamically
        // when new pages are not often added
        // a blog site with a few articles could be good example for fallback to set to false

    return {
        paths: paths,
        fallback: "blocking"
        // fallback: true
        // fallback: false
    }

    // as hard coding is not an feasible way of handling this, we will need to do this rather dynamically as shown above
    // return {
    //     paths: [
    //         {
    //             params: { postId: "1"}
    //         },
    //         {
    //             params: { postId: "2"}
    //         },
    //         {
    //             params: { postId: "3"}
    //         },
    //         {
    //             params: { postId: "4"}
    //         },
    //         {
    //             params: { postId: "5"}
    //         },
    //         {
    //             params: { postId: "6"}
    //         },
    //     ],
    //     fallback: false
    // }
}

export async function getStaticProps(context) {
    const { params } = context;

    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`)

    const data = await response.json();

    // when fallback is set to true and requested path data is not found from fetch request, we can throw an error page by sending back an object containing "notFound" to true
    if(!data.id) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            post: data
        }
    }
}

export default PostDetail
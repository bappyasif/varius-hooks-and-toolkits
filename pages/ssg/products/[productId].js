import { useRouter } from 'next/router';
import React from 'react'

/**
 * 
 * another example of showing "stale" data issue with Satic Generation
 * 
 * precursor to Incremental Static Generation (ISR)
 * there was a need to update only those pages wherre a change was needed without hav to re-build entire application
 * with ISR nextJs allows us to update static pages after we've built our application
 * we can statically generate individual pages without needing to rebuild entire app, effectiovely solving issue of of dealing with stale data
 * 
 * how do we solve this using ISR
 * in getStaticProps apart from props key, we can also specify a "revalidate" key
 * "revalidate" key holds a "numerical value" representing number of seconds after which a "page re-generations" occur
 * 
 * precautionary detail
 * when "stale" re-generation happens upon "acessing previously pre-rendered page" is served, while in background "new page" is rendered and gets served on "any subsequent" requests
 * which means on "first request" after "revalidate" time, "old page with potential stale data" will be rendered but after that "when re-generation is completed" any subsequent requests will get "newly re-generated" page
 * 
 * ISR re-genration in nutshell
 * a re-generation is initiated only if a user makes a request after revalidate time has elapsed
 * revalidate does not mean page automatically re-genrates in every "revalidate" time period, it simply denotes upon a request after "re-validate time window", a re-generation has to be initiated
 * re-generation can also fail and previously cached html could be served till subsequent re-genrations succeeds
 */

const ProductDetailPage = ({ prod }) => {
    console.log(`re generating product detail for product - ${prod?.id}`)
    // when fallback set true
    // this is required when "true" because data is fetching in background so menawhile this "fallback" ui gets to rendered until new data is fetched and ready for rendering from that json data
    const router = useRouter();
    if (router.isFallback) {
        return <h1>Loading....</h1>
    }


    return (
        <>
            <div>PostDetailPage</div>
            <p>{prod.id} -- {prod.title} -- {prod.price}</p>
            <p>{prod.description}</p>
        </>
    )
}

export const getStaticPaths = async () => {
    return {
        paths: [
            {
                params: { productId: `1` }
            },
            // {
            //     params: { productId: `2` }
            // }
        ],
        fallback: true
    }
}

export const getStaticProps = async context => {
    const { params } = context
    const { productId } = params
    const response = await fetch(`http://localhost:4000/products/${productId}`)
    const data = await response.json();

    // whe "fallback" is set to true and fetched data is not found, we can simply return a "object not found" response so that a 4040 page can be served when that happens
    if(!data.id) {
        return {
            notFound: true
        }
    }

    return {
        props: { prod: data },
        revalidate: 9
    }
}

export default ProductDetailPage
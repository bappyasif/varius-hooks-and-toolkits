import React from 'react'

const NewsPage = ({ data }) => {
    return (
        <>
            <div>NewsPage</div>
            <h1>{data}</h1>
        </>
    )
}

export const getStaticProps = async (context) => {
    // after our deployment, even on each request this gets to run and not just at build time
    // thus allwoing us to make changes and see it changes on page without have to re-build entire app to do so
    // we can set previewDAta from designated "preview" api route
    // this contextData would ususally have session related data so taht we can do necessary things with it
    console.log("running getStaticProps for Preview", context.previewData)
    return {
        props: {
            data: context.preview ? "list of draft articles" : "list of published articles"
        }
    }
}

export default NewsPage
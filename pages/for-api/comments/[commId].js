import { comments } from '@/data-demo/comments'
import React from 'react'

const CommentDetail = ({ item }) => {
    return (
        <>
            <div>CommentDetail</div>
            <h1>{item.id} - {item.text}</h1>
        </>
    )
}

export const getStaticPaths = async () => {
    const paths = comments.map(comment => ({ params: { commId: `${comment.id}` } }))
    return {
        paths: paths,
        fallback: false
    }
}

/**
 * 
 * it's recommended not to call our own api from getStaticProps or getServerSideProps
 * calling an external api is all good though
 * reasoning behind this, we already have data available in our reach without have to make any unnecessary api call roundtrips, rather we can simply access our directly by importing it
 */
export const getStaticProps = async context => {
    const {params} = context
    const {commId} = params;

    const foundComment = comments.find(comment => comment.id === parseInt(commId))

    return {
        props: {item: foundComment}
    }
}

export default CommentDetail
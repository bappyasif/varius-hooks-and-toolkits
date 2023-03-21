import React from 'react'

export const PostDetails = ({ post }) => {
    return (
        <>
            <h2>{post.id} -- {post.title}</h2>
            <p>{post.body}</p>
            <hr />
        </>
    )
}

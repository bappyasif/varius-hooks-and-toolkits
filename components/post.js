import React from 'react'

function Post({ item }) {
    return (
        <>
            <h2>{item.title}</h2>
            <h4>{item.body}</h4>
        </>
    )
}

export default Post
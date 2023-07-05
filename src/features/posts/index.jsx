import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllPosts } from './postSlice'
import PostAuthor from './PostAuthor'

export const PostsList = () => {
    // const posts = useSelector(state => state.posts);
    const posts = useSelector(selectAllPosts)

    console.log(posts, "posts!!")

    const renderPosts = posts.map(post => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 99)}</p>
            <p className="postCredit">
                <PostAuthor userId={post.userId} />
            </p>
        </article>
    ))
    
    return (
        <div>
            <h2>PostsList</h2>
            {renderPosts}
        </div>
    )
}

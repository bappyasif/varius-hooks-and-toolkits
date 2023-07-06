import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllPosts } from './postSlice'
import PostAuthor from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'

export const PostsList = () => {
    // const posts = useSelector(state => state.posts);
    const posts = useSelector(selectAllPosts)

    // const orderedPosts = posts.slice().sort((a,b) => a.date > b.date)
    const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date))

    console.log(posts, "posts!!", [{id:"1"}, {id:"2"}].reverse(), orderedPosts)

    const renderPosts = orderedPosts.map(post => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 99)}</p>
            <p className="postCredit">
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </article>
    ))
    
    return (
        <div>
            <h2>PostsList</h2>
            {renderPosts}
        </div>
    )
}

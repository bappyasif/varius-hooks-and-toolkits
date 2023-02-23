import Post from '@/components/post';
import React from 'react'

function Posts({posts}) {
  return (
    <div>
        <h1>All Posts</h1>
        {
            posts?.map(post => <Post key={post.id} item={post} />)
        }
    </div>
  )
}

export async function getStaticProps () {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return (
        {
            props: {
                posts: data
            }
        }
    )
}

export default Posts
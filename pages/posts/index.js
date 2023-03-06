// import Post from '@/components/post';
import Link from 'next/link';
import React from 'react'

function Posts({posts}) {
  return (
    <div>
        <h1>All Posts</h1>
        {
            posts?.map(post => {
                return (
                    <Link key={post.id} href={`/posts/${post.id}`} passHref>
                        <h2>{post.id} -- {post.title}</h2>
                    </Link>
                )
            })
        }
        {/* {
            posts?.map(post => <Post key={post.id} item={post} />)
        } */}
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
                // posts: data.slice(0,6)
            }
        }
    )
}

export default Posts
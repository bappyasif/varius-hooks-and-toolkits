import { PostDetails } from '@/components/post';
import Link from 'next/link';
import React from 'react'

const PostsList = ({ posts }) => {
    return (
        <>
            <div>PostsList</div>
            {posts?.map(post => {
                return (
                    <div key={post.id}>
                        <Link href={`/ssg/posts/${post.id}`}>
                            <p>{post.id} -- {post.title}</p>
                        </Link>
                        <hr />
                    </div>
                )
            })}
        </>
    )
}

export const getStaticProps = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();

    return {
        // props: { posts: data.slice(0,2) }
        props: { posts: data }
    }
}

export default PostsList
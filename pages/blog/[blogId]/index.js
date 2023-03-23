import Head from 'next/head';
import { useRouter } from 'next/router'
import React from 'react'

const BlogDetails = () => {
  const router = useRouter();
  const blogId = router.query.blogId
  // making use of head elements are really handy as they are very useful for SEO
  return (
    <>
      <Head>
        <title>Blog -- {blogId}</title>
        <meta name='description' content={`Details about blog -- ${blogId}`} />
      </Head>
      <div>BlogDetails -- {blogId}</div>
    </>
  )
}

export default BlogDetails
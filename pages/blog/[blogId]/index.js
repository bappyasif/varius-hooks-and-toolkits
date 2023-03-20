import { useRouter } from 'next/router'
import React from 'react'

const BlogDetails = () => {
    const router = useRouter();
    const blogId = router.query.blogId
  return (
    <div>BlogDetails -- {blogId}</div>
  )
}

export default BlogDetails
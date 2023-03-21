import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const BlogPage = ({pId = 200}) => {
  const router = useRouter();
  return (
    <div>
      <Link href={"/"}>Home Page</Link>
      <br />
      <h2>
        {/* replace attribute removes routes history and takes back to home route */}
        <Link href={"/blog/een"} replace>First Blog</Link>
      </h2>
      <h2>
        <Link href={"/blog/2"}>Two Blog</Link>
      </h2>
      <h2>
        <Link href={`/blog/${pId}`}>{pId} Blog</Link>
      </h2>
      <button onClick={() => router.push("/docs")}>Place Order!!</button>
      <br />
      <button onClick={() => router.replace("/docs")}>Place Order - 2!!</button>
    </div>
  )
}

export default BlogPage
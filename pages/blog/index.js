import Link from 'next/link'
import React from 'react'

// as index.js always maps to root doimain, so will it do for nested routes folder as well
// doing so we dont have to keep nested routes base domain outside of this nested folder
// by renaming this as index.js will map to this Blog folder main route
function Blog() {
  return (
    <>
      <Link href={"/"}>Home</Link>
      <div>Blog page</div>
    </>
  )
}

export default Blog
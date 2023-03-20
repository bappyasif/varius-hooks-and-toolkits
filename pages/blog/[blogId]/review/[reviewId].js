import { useRouter } from 'next/router'
import React from 'react'

const ReviewDetails = () => {
    const router = useRouter();
    const {blogId, reviewId} = router.query
  return (
    <div>BlogDetails -- {blogId} <br /> ReviewDetails -- {reviewId}</div>
  )
}

export default ReviewDetails
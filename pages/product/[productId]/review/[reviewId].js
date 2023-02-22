import { useRouter } from 'next/router'
import React from 'react'

// usecase nested dynamic routes
// we can use dynamic folder under which we can have our nested folder and in that we can have our dynamic file for rendering
function ReviewDetail() {
    const router = useRouter();
    const {productId, reviewId} = router.query
  return (
    <div>
        <h1>ReviewDetail</h1>
        <h2>Review {reviewId} For Product {productId} </h2>
    </div>
  )
}

export default ReviewDetail
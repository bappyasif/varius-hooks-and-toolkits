import { useRouter } from 'next/router'
import React from 'react'

function ProductDeatil() {
    const router = useRouter();
    const dynamicId = router.query.productId
    // console.log(router, dynamicId)
  return (
    <div>Product Deatil Page {dynamicId}</div>
  )
}

export default ProductDeatil
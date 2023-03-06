import Link from 'next/link'
import React from 'react'

function ProductList({ prodId = 100 }) {
    return (
        <>
            {/* Link is used only for routing within App and not for any external links */}
            {/* for any external lnks use anchor tag instead */}
            {/* but when anchor tag is used and clicked to vist that site current app routing history will be removed */}
            {/* dont use anchor tag for client side routing or App routing cause this will result in removing existing routing history or states of app */}
            <Link href={"/"}>Home</Link>
            <div>ProductList</div>
            <Link href={"/product/1"}><h2>Product Een</h2></Link>
            {/* using replace will remove current browsing stack and when clicked back button it will take back to route page instead of products list page */}
            <Link href={"/product/2"} replace><h2>Product Twee</h2></Link>
            <Link href={"/product/3"}><h2>Product Drie</h2></Link>
            <Link href={"/product/4"}><h2>Product Vier</h2></Link>
            {/* usecase for dynamic routes */}
            <Link href={`/product/${prodId}`}><h2>Product {prodId}</h2></Link>
        </>
    )
}

export default ProductList
import Product from '@/components/prod'
import { useRouter } from 'next/router'
import React from 'react'

function ProductDetail({ prodItem }) {
    const router = useRouter();
    const isFallback = router.isFallback;
    
    if (isFallback) {
        return <h1>Loading....</h1>
    }

    return (
        <div>
            <h2>ProductDetail</h2>
            <Product item={prodItem} />
        </div>
    )
}

export async function getStaticPaths() {
    // const response = await fetch("http://localhost:4000/products/");
    // const data = await response.json();
    return {
        paths: [
            {
                params: { prodId: "1" }
            }
        ],
        fallback: true
    }
}

export async function getStaticProps(context) {
    const { params } = context;
    const response = await fetch(`http://localhost:4000/products/${params.prodId}`);
    const data = await response.json();
    return {
        props: { prodItem: data },
        revalidate: 11
    }
}

export default ProductDetail
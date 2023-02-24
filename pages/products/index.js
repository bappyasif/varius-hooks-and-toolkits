import React from 'react'

function ProductsList({ products }) {
    return (
        <div>
            <h2>ProductsList</h2>
            {
                products?.map(prod => {
                    return (
                        <>
                            <h3>{prod.id} -- {prod.title}</h3>
                            <h2>{prod.price}</h2>
                        </>
                    )
                })
            }
        </div>
    )
}

export async function getStaticProps() {
    const response = await fetch("http://localhost:4000/products");
    const data = await response.json();
    return {
        props: { products: data }
    }
}

export default ProductsList
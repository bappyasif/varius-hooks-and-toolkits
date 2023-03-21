import React from 'react'

const ProductsList = ({ prods }) => {
    return (
        <>
            <div>ProductsList</div>
            {prods?.map(prod => {
                return (
                    <div key={prod.id}>
                        <p>{prod.id} -- {prod.title} -- {prod.price}</p>
                        {/* <Link href={`/ssg/posts/${post.id}`}>
                            <p>{post.id} -- {post.title}</p>
                        </Link> */}
                        <hr />
                    </div>
                )
            })}
        </>
    )
}

export const getStaticProps = async () => {
    console.log("generating or regenrating products")
    const response = await fetch("http://localhost:4000/products");
    const data = await response.json();

    return {
        props: { prods: data },
        revalidate: 9
    }
}

export default ProductsList
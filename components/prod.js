import React from 'react'

function Product({item}) {
    return (
        <>
            <h2>{item.id} -- {item.title}</h2>
            <h4>{item.description}</h4>
            <h4>{item.price}</h4>
        </>
    )
}

export default Product
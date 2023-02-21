import React from 'react'
import styled from "styled-components";
import ProductCard from './ProductCard';
import { useShop } from './ShopContext';
import { useShopRedone } from './ShopContextRedone';

const Cart = () => {
    // const { products, total } = useShop();
    const { products, total } = useShopRedone();

    return (
        <>
            <Title>Your cart total is {total}$</Title>
            {
                products.map((prod, idx) => <ProductCard {...prod} key={idx} />)
            }
        </>
    )
};

export default Cart;

const Title = styled.p`
  font-weight: bold;
  font-size: 20px;
  margin-top: 20px;
`;
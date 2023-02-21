import React from 'react'
import styled from "styled-components";
import { Router, Link } from "@reach/router";

import Products from "./Products";
import Cart from "./Cart";
import { ShopProvider } from './ShopContext';
import { ShopProviderRedone } from './ShopContextRedone';

// Create a Title component that'll render an <h1> tag with some styles
const TitleWrapper = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const LinksWrapper = styled.h4`
font-size: 1.5em;
text-align: center;
color: palevioletred;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

function ContainerTwo() {
    return (
        // <ShopProvider>
        <ShopProviderRedone>
            <Wrapper>
                <TitleWrapper>
                    <h1>useReducer Hook Starter Project</h1>
                    {/* <p>
                        A <a href="designcode.io">Design+Code</a> tutorial
                    </p> */}
                </TitleWrapper>
                <LinksWrapper>
                    <Link to="/">Home</Link>
                    <Link to="/cart">Cart</Link>
                </LinksWrapper>
                <Router>
                    <Products path="/" />
                    <Cart path="/cart" />
                </Router>
            </Wrapper>
            {/* </ShopProvider> */}
        </ShopProviderRedone>
    )
}

export default ContainerTwo
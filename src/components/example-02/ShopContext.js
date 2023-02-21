import React, { createContext, useContext, useReducer } from "react";
import { ACTIONS, InitialState, shopReducer } from "./shopReducer";

export const ShopContext = createContext(InitialState)

// creating a ShopContext Provider for components to use
export const ShopProvider = ({children}) => {
    let [state, dispatch] = useReducer(shopReducer, InitialState)

    // corresponding reducer usecase types
    const addToCart = (product) => {
        const updatedProducts = state.products.concat(product);
        
        // as we want to update total price when this happens
        updatePrice(updatedProducts)

        dispatch({
            type: ACTIONS.ADD_TO_CART,
            payload: {
                products: updatedProducts
            }
        })
    }

    const removeFromCart = (product) => {
        const updatedProducts = state.products.filter(currProd => currProd.name !== product.name);

        // as we want to update total price when this happens
        updatePrice(updatedProducts)

        dispatch({
            type: ACTIONS.REMOVE_FROM_CART,
            payload: {
                products: updatedProducts
            }
        })
    }

    const updatePrice = (products) => {
        let total = 0;
        console.log(products, "products")
        products.forEach(prod => total += prod.price)

        dispatch({
            type: ACTIONS.UPDATE_PRICE,
            payload: {
                total: total
            }
        })
    }

    const value = {
        total: state.total,
        products: state.products,
        addToCart: addToCart,
        removeFromCart: removeFromCart
    }

    // now its time for our context provider to return a value prop by as a provider for its children components to use
    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

// now we will use a custom hook to wrap all this into it so that our app component can now use it
export const useShop = () => {
    const ctx = useContext(ShopContext);

    if(ctx === undefined) {
        throw new Error("useShop must be used in ShopContext")
    }

    return ctx;
}
import React, { useContext, useReducer } from "react";
import { ACTION, shopReducerRedone } from "./shopReducerRedone";
import { InitialState } from "./shopReducerRedone";

const ShopContextNew = React.createContext();

export const ShopProviderRedone = ({children}) => {
    let [state, dispatch] = useReducer(shopReducerRedone, InitialState);

    const addToCart = (product) => {
        const updatedProds = [...state.products, product]
        // const updatedProds = state.products.concat(product)

        updatePrice(updatedProds)

        dispatch({
            type: ACTION.ADD_TO_CART,
            payload: {
                products: updatedProds
            }
        })
    }

    const removeFromCart = product => {
        const updatedProds = state.products.filter(prod => prod.name !== product.name)
        
        updatePrice(updatedProds)

        dispatch({
            type: ACTION.REMOVE_FROM_CART,
            payload: {
                products: updatedProds
            }
        })
    }

    const updatePrice = products => {
        let total = 0;

        products.forEach(prod => total += prod.price);

        dispatch({
            type: ACTION.UPDATE_PRICE,
            payload: {
                total: total
            }
        })
    }

    const value = {
        addToCart,
        removeFromCart,
        total: state.total,
        products: state.products
    }

    return <ShopContextNew.Provider value={value}>{children}</ShopContextNew.Provider>
}

export const useShopRedone = () => {
    const ctx = useContext(ShopContextNew)

    if(ctx === undefined) {
        throw new Error("context is not found!!")
    }

    return ctx
}
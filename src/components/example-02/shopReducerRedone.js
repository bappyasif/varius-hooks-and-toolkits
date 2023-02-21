export const InitialState = {
    total: 0,
    products: []
};

export const ACTION = {
    ADD_TO_CART: "ADD_TO_CART",
    REMOVE_FROM_CART: "REMOVE_FROM_CART",
    UPDATE_PRICE: "UPDATE_PRICE"
}

export const shopReducerRedone = (state, action) => {
    const {type, payload} = action

    switch (type) {
        case ACTION.ADD_TO_CART:
            console.log(ACTION.ADD_TO_CART, payload)
            return {
                ...state, 
                products: payload.products
            }
        case ACTION.REMOVE_FROM_CART:
            console.log(ACTION.REMOVE_FROM_CART, payload)
            return {
                ...state, 
                products: payload.products
            }
        case ACTION.UPDATE_PRICE:
            console.log(ACTION.UPDATE_PRICE, payload)
            return {
                ...state, 
                total: payload.total
            }
        default:
            throw new Error(`corresponding reducer type ${type} is not found`)
    }
}
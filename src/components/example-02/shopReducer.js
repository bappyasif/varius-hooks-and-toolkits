export const InitialState = {
    total: 0,
    products: []
}

export const ACTIONS = {
    ADD_TO_CART: "add_to_cart",
    REMOVE_FROM_CART: "remove_from_cart",
    UPDATE_PRICE: "update_price"
}

export const shopReducer = (state, action) => {
    const {type, payload} = action;

    switch(type) {
        case ACTIONS.ADD_TO_CART:
            console.log(ACTIONS.ADD_TO_CART, payload)
            return {
                ...state,
                products: payload.products
            }
        case ACTIONS.REMOVE_FROM_CART:
            console.log(ACTIONS.REMOVE_FROM_CART, payload)
            return {
                ...state,
                products: payload.products
            }
        case ACTIONS.UPDATE_PRICE:
            console.log(ACTIONS.UPDATE_PRICE, payload)
            return {
                ...state,
                total: payload.total
            }
        default:
            throw new Error(`No case for ${type} found in reducer`)
    }
}
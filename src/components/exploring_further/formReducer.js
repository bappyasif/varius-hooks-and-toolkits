export const INITIAL_STATE = {
    title: "",
    desc: "",
    price: 0,
    category: "",
    tags: [],
    images: {
        sm: "",
        md: "",
        lg: "",
    },
    quantity: 0,
}

export const ACTIONS = {
    CHANGE_INPUT: "change input",
    ADD_TAG: "add tag",
    REMOVE_TAG: "remove tag",
    INCREASE_QTY: "increase quantity",
    DECREASE_QTY: "decrease quantity"
}

export const formReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.CHANGE_INPUT:
            console.log(action.payload.name, action.payload.value)
            return { ...state, [action.payload.name]: action.payload.value }
        case ACTIONS.ADD_TAG:
            return { ...state, tags: [...state.tags, action.payload.tag] }
        case ACTIONS.REMOVE_TAG:
            return { ...state, tags: state.tags.filter(tag => tag !== action.payload.tagName) }
        case ACTIONS.INCREASE_QTY:
            return { ...state, quantity: state.quantity + 1 }
        case ACTIONS.DECREASE_QTY:
            return { ...state, quantity: state.quantity - 1 }
        default:
            return state
    }
}
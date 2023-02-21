export const INITIAL_STATE = {
    loading: false,
    post: {},
    error: false
}

export const ACTION = {
    FETCH_START: "fetch_start",
    FETCH_SUCCESS: "fetch_success",
    FETCH_ERROR: "fetch_error"
}

export const postReducer = (state, action) => {
    switch (action.type) {
        case ACTION.FETCH_START:
            console.log("running start")
            return {
                loading: false,
                error: false,
                post: {}
            };
        case ACTION.FETCH_SUCCESS:
            console.log("running success")
            return {
                ...state,
                loading: false,
                // error: false, // inherited from earlier state with state spread operator
                post: action.payload.text
            }
        case ACTION.FETCH_ERROR:
            console.log("running error")
            return {
                loading: false,
                error: true,
                post: {}
            }
        default:
            state
    }
}
import {legacy_createStore} from "redux"

const initialCount = {
    count: 0
}

const reducerFn = (state=initialCount, action) => {
    // two limitations
    // only synchronous code allowed
    // should never mutate app original state
    if(action.type === "incr") {
        // return {...state, count: state.count + 1}
        return {count: state.count + 1} // as here is just one variable, so dont need to make sure that other state variables are copied or not
    }

    if(action.type === "decr") {
        // return {...state, count: state.count - 1}
        return {count: state.count - 1} // as here is just one variable, so dont need to make sure that other state variables are copied or not
    }

    if(action.type === "add") {
        return {count: state.count + action.payload}
    }

    if(action.type === "sub") {
        return {count: state.count - action.payload}
    }

    return state
}

const store = legacy_createStore(reducerFn)

export default store
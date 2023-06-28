import {legacy_createStore} from "redux"

const initialState = {
    enroll: false,
    ready: false,
    name: "",
    num: 1
}

const reducerFn = (state = initialState, action) => {
    if(action.type  === "enroll") {
        return {...state, enroll: !state.enroll}
    }
    if(action.type  === "ready") {
        return {...state, ready: !state.ready}
    }
    if(action.type === "name") {
        return {...state, name: action.payload}
    }
    if(action.type === "num") {
        return {...state, num: action.payload}
    }

    return state
}

const store = legacy_createStore(reducerFn)
export default store
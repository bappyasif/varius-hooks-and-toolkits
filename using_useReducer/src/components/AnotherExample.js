import React, { useReducer } from 'react'

const ACTIONS = {
    INCR: "increment",
    DECR: "decrement",
    USER_INPUT: "newUserInput",
    TOGGLE: "toggleColor"
}

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.INCR:
            return { ...state, count: state.count + 1 }
        case ACTIONS.DECR:
            return { ...state, count: state.count - 1 }
        case ACTIONS.USER_INPUT: 
            return {...state, userInput: action.payload.text}
        case ACTIONS.TOGGLE:
            return {...state, colorToggle: !state.colorToggle}
        default:
            throw new Error("somethign is wrong")
    }
}

function AnotherExample() {
    let [state, dispatch] = useReducer(reducer, { count: 0, userInput: "", colorToggle: false })
    return (
        <div style={{color: state.colorToggle ? "blue" : "red"}}>
            <input 
                type={"text"}
                value={state.userInput}
                onChange={(e) => dispatch({type: ACTIONS.USER_INPUT, payload: {text: e.target.value}})}
            />
            {state.count}
            <br />
            <button onClick={() => dispatch({type: ACTIONS.INCR})}>+</button>
            <button onClick={() => dispatch({type: ACTIONS.DECR})}>-</button>
            <button onClick={() => dispatch({type: ACTIONS.TOGGLE})}>Toggle Color</button>
            {state.userInput}
        </div>
    )
}

export default AnotherExample
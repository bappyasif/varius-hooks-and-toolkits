import React, { useReducer } from 'react'

// this way of defining actions beforehand makes dispatch and reducfer function to carefully perform its operations without have to worrying about any typo kind of mistakes or any future lingo changes may rquired then it can be done easily in just one place instead of in reducer and dispatch calls
const ACTIONS = {
    INCREMENT: "Increment",
    DECREMENT: "Decrement"
}

// this way of updating state is very reliable as this is only place where state is changed and not from any place else, thus makinhg state changes very centralised and informed
const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.INCREMENT:
            return { count: state.count + 1 }
        case ACTIONS.DECREMENT:
            return { count: state.count - 1 }
        default:
            state
    }
}

function Counter() {
    let [state, dispatch] = useReducer(reducer, { count: 0 })

    const increaseCount = () => dispatch({type: ACTIONS.INCREMENT})

    const decreaseCount = () => dispatch({type: ACTIONS.DECREMENT})

    return (
        <div>
            <h2>Counter</h2>
            <section style={{ display: "flex" }}>
                <button style={{ padding: "11px", fontSize: "x-large" }} onClick={decreaseCount}>-</button>
                <h3>{state.count}</h3>
                <button style={{ padding: "11px", fontSize: "x-large" }} onClick={increaseCount}>+</button>
            </section>
        </div>
    )
}

export default Counter
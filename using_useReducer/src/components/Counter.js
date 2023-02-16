import React, { useReducer } from 'react'

// this way of updating state is very reliable as this is only place where state is changed and not from any place else, thus makinhg state changes very centralised and informed
const reducer = (state, action) => {
    switch (action.type) {
        case "increment":
            return { count: state.count + 1 }
        case "decrement":
            return { count: state.count - 1 }
        default:
            state
    }
}

function Counter() {
    let [state, dispatch] = useReducer(reducer, { count: 0 })

    const increaseCount = () => dispatch({type: "increment"})

    const decreaseCount = () => dispatch({type: "decrement"})

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
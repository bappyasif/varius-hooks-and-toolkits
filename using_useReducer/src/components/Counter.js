import React, { useReducer } from 'react'

const reducer = (state, action) => {
    return (
        {
            count: state.count + 1
        }
    )
}

function Counter() {
    let [state, dispatch] = useReducer(reducer, { count: 0 })

    const increaseCount = () => dispatch()

    return (
        <div>
            <h2>Counter</h2>
            <section style={{display: "flex"}}>
                <button style={{padding: "11px", fontSize: "x-large"}}>-</button>
                <h3>{state.count}</h3>
                <button style={{padding: "11px", fontSize: "x-large"}} onClick={increaseCount}>+</button>
            </section>
        </div>
    )
}

export default Counter
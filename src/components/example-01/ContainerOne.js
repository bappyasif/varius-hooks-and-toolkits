import React, { useReducer } from 'react'
import CompA from './comps/CompA'
import CompB from './comps/CompB'
import CompC from './comps/CompC'

const initialState = 0;

export const ACTIONS = {
    INCREMENT: "increment",
    DECREMENT: "decrement",
    RESET: "reset"
}

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.INCREMENT:
            return state + 1
        case ACTIONS.DECREMENT:
            return state - 1
        case ACTIONS.RESET:
            return initialState
        default:
            return state
    }
}

export const CountContext = React.createContext()

function ContainerOne() {
    let [count, dispatch] = useReducer(reducer, initialState);
    return (
        <CountContext.Provider value={{count: count, countDispatch: dispatch}}>
            <div className='container'>
                <h1>ContainerOne -- {count}</h1>
                <CompA />
                <CompB />
                <CompC />
            </div>
        </CountContext.Provider>
    )
}

export default ContainerOne
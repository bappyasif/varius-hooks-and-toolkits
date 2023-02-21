import React, { useContext } from 'react'
import { ACTIONS, CountContext } from '../ContainerOne'

function CompA() {
    const CountCtx = useContext(CountContext);

  return (
    <div>
        <h2>CompA -- {CountCtx.count}</h2>
        <button onClick={() => CountCtx.countDispatch({type: ACTIONS.INCREMENT})}>+</button>
        <button onClick={() => CountCtx.countDispatch({type: ACTIONS.DECREMENT})}>-</button>
        <button onClick={() => CountCtx.countDispatch({type: ACTIONS.RESET})}>C</button>
    </div>
  )
}

export default CompA
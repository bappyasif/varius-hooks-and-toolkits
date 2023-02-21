import React, { useContext } from 'react'
import { ACTIONS, CountContext } from '../ContainerOne'

function CompD() {
    const CountCtx = useContext(CountContext);

  return (
    <div>
        <h3>CompD -- {CountCtx.count}</h3>
        <button onClick={() => CountCtx.countDispatch({type: ACTIONS.INCREMENT})}>+</button>
        <button onClick={() => CountCtx.countDispatch({type: ACTIONS.DECREMENT})}>-</button>
        <button onClick={() => CountCtx.countDispatch({type: ACTIONS.RESET})}>C</button>
    </div>
  )
}

export default CompD
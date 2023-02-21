import React, { useContext } from 'react'
import { ACTIONS, CountContext } from '../ContainerOne'

function CompF() {
    const CountCtx = useContext(CountContext);

  return (
    <div>
        <h4>CompF -- {CountCtx.count}</h4>
        <button onClick={() => CountCtx.countDispatch({type: ACTIONS.INCREMENT})}>+</button>
        <button onClick={() => CountCtx.countDispatch({type: ACTIONS.DECREMENT})}>-</button>
        <button onClick={() => CountCtx.countDispatch({type: ACTIONS.RESET})}>C</button>
    </div>
  )
}

export default CompF
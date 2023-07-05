import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrementCount, decrementCountByAmount, incrementCount, incrementCountByAmount, resetCounter } from './counterSlice';

export const Counter = () => {
    const [amount, setAmount] = useState(0);
    const resetAmount = () => setAmount(0);
    const handleAmount = e => setAmount(e.target.value);

    const count = useSelector(state => state.counter.count)
    const  dispatch = useDispatch();

    const amountVal = Number(amount) || 0;

    const handleIncrement = () => dispatch(incrementCount())
    const handleDecrement = () => dispatch(decrementCount())

    const handleIncrementByAmount = () => dispatch(incrementCountByAmount(amountVal))
    const handleDecrementByAmount = () => dispatch(decrementCountByAmount(amountVal))
    const handleReset = () => {
        dispatch(resetCounter())
        resetAmount()
    }

  return (
    <section>
        <p>{count}</p>
        <div>
            <button onClick={handleIncrement}>+</button>
            <button onClick={handleDecrement}>-</button>
        </div>
        <div>
            <button onClick={handleIncrementByAmount}>By {amount}</button>
            <button onClick={handleDecrementByAmount}>By {amount}</button>
            <button onClick={handleReset}>Reset</button>
        </div>
        <input type="text" placeholder='add amount' onChange={handleAmount} value={amount} />
    </section>
  )
}

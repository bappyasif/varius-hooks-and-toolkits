import { useSelector, useDispatch } from "react-redux"
import { addBy, decrement, increment, reset, subBy } from "./slice";
import { useState } from "react";

const Counter = () => {
    const count = useSelector(state => state.counter.count);
    const dispatch = useDispatch()

    const [amount, setAmount] = useState(0);
    const addedValue = Number(amount) || 0; // so that it always gets a number value and notANumber error

    const resetAll = () => {
        setAmount(0);
        dispatch(reset())
    }

    return (
        <section>
            <p>count: {count}</p>
            <div>
                <button onClick={() => dispatch(increment())}>+</button>
                <button onClick={() => dispatch(decrement())}>-</button>
                <button onClick={() => dispatch(reset())}>reset</button>
                <button onClick={() => dispatch(addBy(20))}>[20 (+)]</button>
                <button onClick={() => dispatch(subBy(20))}>[20 (-)]</button>

                <hr />
                <input 
                    type="text" 
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                />
                <button onClick={resetAll}>reset</button>
                <button onClick={() => dispatch(addBy(addedValue))}>[{addedValue} (+)]</button>
                <button onClick={() => dispatch(subBy(addedValue))}>[{addedValue} (-)]</button>
            </div>
        </section>
    )
}

export default Counter
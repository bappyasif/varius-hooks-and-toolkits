import { useSelector } from "react-redux"
// import { useAppDispatch, useAppSelector } from "../app/store"
import { addByAmount, decrement, increment, selectCount, subByAmount } from "../features/counterSlice"
import { useAppDispatch, useAppSelector } from "../hooks"
import { ChangeEvent, useState } from "react"

export const Counter = () => {
  const [val, setVal] = useState<number>(0)
  // const count:number = selectCount((state:StateType) => state.count)
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector(state => state.counter.count)
  // const count = useAppSelector(state => state.count)

  const dispatch = useAppDispatch()

  const count2 = useSelector(selectCount)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setVal(Number(e.target.value))

  return (
    <div>
      <p> {count} ~~ Counter ~~ {count2}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <input type="text" value={val} onChange={handleChange} />
      <button onClick={() => dispatch(addByAmount(val))}>AddBy</button>
      <button onClick={() => dispatch(subByAmount(val))}>SubBy</button>
    </div>
  )
}

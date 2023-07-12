import { increment } from "../features/slices";
import { useAppDispatch, useAppSelector } from "../hooks"

export const HomePage = () => {
  const count = useAppSelector(state => state.counter.count)
  const dispatch = useAppDispatch();

  return (
    <div>
        <h1>Home - {count}</h1>
        <button onClick={() => dispatch(increment())}>Increment</button>
    </div>
  )
}

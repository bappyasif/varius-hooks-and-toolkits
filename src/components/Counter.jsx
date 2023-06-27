import { useSelector, useDispatch } from "react-redux"
import { actions } from "../store";

export const Counter = () => {
    const count = useSelector(state => state.count)
    const dispatch = useDispatch();

    const handleIncr = () => {
        dispatch(actions.incr())
    }
    const handleDecr = () => {
        dispatch(actions.decr())
    }

    const handleAdd = () => {
        dispatch(actions.addBy(20))
    }

    const handleSub = () => {
        dispatch(actions.subBy(20))
    }
    
    return (
        <div>
            <h1>Counter - {count}</h1>
            <button onClick={handleIncr}>incr</button>
            <button onClick={handleDecr}>decr</button>
            <button onClick={handleAdd}>incr</button>
            <button onClick={handleSub}>decr</button>
        </div>
    )
}

// export const CounterWithoutReduxToolkits = () => {
//     const count = useSelector(state => state.count)
//     const dispatch = useDispatch();

//     const handleIncr = () => {
//         dispatch({type: "incr"})
//     }
//     const handleDecr = () => {
//         dispatch({type: "decr"})
//     }

//     const handleAdd = () => {
//         dispatch({type: "add", payload: 20})
//     }

//     const handleSub = () => {
//         dispatch({type: "sub", payload: 20})
//     }

//     return (
//         <div>
//             <h1>Counter - {count}</h1>
//             <button onClick={handleIncr}>incr</button>
//             <button onClick={handleDecr}>decr</button>
//             <button onClick={handleAdd}>incr</button>
//             <button onClick={handleSub}>decr</button>
//         </div>
//     )
// }

import { useDispatch, useSelector } from "react-redux"

export const Tryout = () => {
    const dispatch = useDispatch();

    const handleEnroll = () => {
        dispatch({ type: "enroll" })
    }

    const handleReady = () => {
        dispatch({ type: "ready" })
    }
    
    return (
        <div>
            <button onClick={handleEnroll}>enroll now</button>
            <button onClick={handleReady}>got it</button>
            <EnterName />
            <ChooseNumber />

            <ShowAllUserResponses />
        </div>
    )
}

const ShowAllUserResponses = () => {
    const enroll = useSelector(state => state.enroll)
    const ready = useSelector(state => state.ready)
    const name = useSelector(state => state.name)
    const num = useSelector(state => state.num)
    // const {enroll, ready} = state

    // console.log(enroll, ready, "checks!!")

    return (
        <div>
            <p>enroll: {enroll ? "Enrolled" : "click to enroll"}</p>
            <p>ready: {ready ? "Ready" : "click to Begin"}</p>
            <p>name: {name}</p>
            <p>number: {num}</p>
        </div>
    )
}

const EnterName = () => {
    const name = useSelector(state => state.name)
    const dispatch = useDispatch();
    const handleChange = (e) => {
        dispatch({ type: "name", payload: e.target.value })
    }
    return (
        <div>
            <input type="text" value={name} onChange={handleChange} placeholder="enter name" />
            {/* <p>{"test"}</p> */}
        </div>
    )
}

const ChooseNumber = () => {
    const dispatch = useDispatch();
    const handleNum = (e) => {
        dispatch({ type: "num", payload: e.target.value })
    }
    return (
        <select name="choose" id="" onChange={handleNum}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </select>
    )
}
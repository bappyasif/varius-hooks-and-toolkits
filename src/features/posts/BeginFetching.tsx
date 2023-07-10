import { useAppDispatch, useAppSelector } from "../../hooks"
import { beginFetching } from "./postsSlice";

export const BeginFetching = () => {
    const dispatch = useAppDispatch();

    const begin = useAppSelector(state => state.posts.fetchNow);

    const handleClick = () => {
        dispatch(beginFetching())
    }

    console.log(begin, "begin!!")
    
    return (
        <div>
            <h2>BeginFetching</h2>
            <div><h2>Ready To fetch Data?</h2><button disabled={begin} onClick={handleClick}>click here</button></div>
            <h2>{begin ? "Fetching Data....": null}</h2>
        </div>
    )
}

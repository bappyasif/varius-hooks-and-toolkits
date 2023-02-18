import React, { useReducer } from 'react'
import { ACTION, INITIAL_STATE, postReducer } from './postReducer';

function Post() {
  let [state, dispatch] = useReducer(postReducer, INITIAL_STATE)
    const handleFetch = () => {
      dispatch({type: ACTION.FETCH_START})
        // const url = "https://jsonplaceholder.typicode.com/posts/1";
        const url = "";
        fetch(url)
        .then(res => res.json())
        // .catch(err => dispatch({type: ACTION.FETCH_ERROR}))
        .then(data => {
          dispatch({type: ACTION.FETCH_SUCCESS, payload: {text: data}})
        }) .catch(err => {
          dispatch({type: ACTION.FETCH_ERROR})
        })
    }
    console.log(state, "state check!!")
  return (
    <div>
        <button onClick={handleFetch}>{state.loading ? "wait...." : "Fetch Posts"}</button>
        <p>{state.post?.title}</p>
        <span>{state.error ? "Something's wrong!!" : null}</span>
    </div>
  )
}

export default Post
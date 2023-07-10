import { createAsyncThunk } from "@reduxjs/toolkit"
import { PostsListType } from "./postsSlice"

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts"

export const fetchPosts = createAsyncThunk("allPosts/fetchPosts", async () => {
    const response = await fetch(POSTS_URL)
    return response.json()
})

// export const fetchPosts = createAsyncThunk("allPosts/fetch", async () => {
//     const response = await fetch(POSTS_URL)
//     // const data:PostsListType = await response.json()

//     console.log(response.json(), "data!!")
//     // return data
//     return await response.json()
// })
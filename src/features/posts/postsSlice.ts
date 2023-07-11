import { createSlice } from "@reduxjs/toolkit"
import { fetchPosts } from "./fetchRequests"

export type PostType = {
    userId: number,
    id: number,
    title: string,
    body: string
}

export type PostsListType = {
    posts: PostType[]
}

export type StateType = {
    // posts: PostsListType
    posts: PostType[],
    fetchNow: boolean
}

const initialState: StateType = {
    posts: [],
    fetchNow: false
}

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        beginFetching: (state) => {
            state.fetchNow = true
        },
        loadPosts: (state, action) => {
            state.posts = action.payload
            // .sort((a:PostType,b:PostType) => a.userId > b.userId)
            state.fetchNow = false
        },
        addPost: (state, action) => {
            state.posts = state.posts.concat(action.payload)
            state.posts = state.posts.sort((a:PostType, b:PostType) => a.userId > b.userId ? 1 : a.userId < b.userId ? -1 : 0)
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.fetchNow = false;
            state.posts = action.payload
        })
    },
});

export const { beginFetching, loadPosts, addPost } = postsSlice.actions

const PostsReducer = postsSlice.reducer;

export default PostsReducer
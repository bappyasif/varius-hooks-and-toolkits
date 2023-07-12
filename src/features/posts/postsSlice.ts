import { createSlice } from "@reduxjs/toolkit"
import { fetchPosts } from "./fetchRequests"

export type PostType = {
    userId: number,
    id: number,
    title: string,
    body: string,
    up: number,
    down: number
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
            const withVotes = action.payload.map((item:PostType) => {
                item.up = 0;
                item.down = 0;
                return item
            })
            // state.posts = action.payload
            state.posts = withVotes
            // .sort((a:PostType,b:PostType) => a.userId > b.userId)
            state.fetchNow = false
        },
        addPost: (state, action) => {
            state.posts = state.posts.concat(action.payload)
            state.posts = state.posts.sort((a:PostType, b:PostType) => a.userId > b.userId ? 1 : a.userId < b.userId ? -1 : 0)
        },
        upVoted: (state, action) => {
            const updatedPosts = state.posts.map(item => {
                if(item.id === action.payload) {
                    item.up += 1
                    // item.up = item.up ? item.up + 1 : 1
                    // item.up = item.up && item.up + 1
                }
                return item
            })

            state.posts = updatedPosts
        },
        downVoted: (state, action) => {
            state.posts = state.posts.map(item => {
                if(item.id === action.payload) {
                    item.down += 1;
                    // item.down = item.down ? item.down - 1 : 0
                    // item.down = item.down && item.down - 1
                }
                return item
            })
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.fetchNow = false;
            const withVotes = action.payload.map((item:PostType) => {
                item.up = 0;
                item.down = 0;
                return item
            })
            // state.posts = action.payload
            state.posts = withVotes
        })
    },
});

export const { beginFetching, loadPosts, addPost, downVoted, upVoted } = postsSlice.actions

const PostsReducer = postsSlice.reducer;

export default PostsReducer
import { createSlice, nanoid } from "@reduxjs/toolkit"
import { sub } from "date-fns"

const initialState = [
    {
        id: '1',
        title: 'Learning Redux Toolkit',
        content: "I've heard good things.",
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    },
    {
        id: '2',
        title: 'Slices...',
        content: "The more I say slice, the more I want pizza.",
        date: sub(new Date(), { minutes: 5 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    }
]

const postsSlice = createSlice({
    initialState: initialState,
    name: "Posts",
    reducers: {
        // postAdded(state, action) {
        //     // this wont mutate state directly rather as emmer js is working underneath createSlice, it will create a inner state and then gracefully update app state, otherwise we would have to use spread operators as we would usually update a state container
        //     state.push(action.payload)
        // }
        postAdded: {
            reducer: (state, action) => {
                console.log(action.payload, "payload!!")
                state.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        userId
                    }
                }
            }
        }
    }
})

// exporting our state explicitly, so that if there is ever any changes made to postses states we dont have to go on and change it from all components
export const selectAllPosts = state => state.posts

export const { postAdded } = postsSlice.actions

export default postsSlice.reducer
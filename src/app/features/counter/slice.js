import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    count: 0
}

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        // added two actions here
        increment: (state) => {
            state.count += 1
        },
        decrement: (state) => {
            state.count -= 1
        },
        reset: (state) => {
            state.count = 0;
        },
        addBy: (state, action) => {
            state.count += action.payload
        },
        subBy: (state, action) => {
            state.count -= action.payload
        }
    }
})

export const {decrement, increment, addBy, reset, subBy} = counterSlice.actions

export default counterSlice.reducer
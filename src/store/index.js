import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
    count: 0
}

const counterSlice = createSlice({
    name: "Counter",
    initialState: initialState,
    reducers: {
        incr(state) {
            state.count++
        },
        decr(state) {
            state.count--
        },
        addBy(state, action) {
            state.count = state.count + action.payload
        },
        subBy(state, action) {
            state.count = state.count - action.payload
        }
    }
})

const store = configureStore({
    reducer: counterSlice.reducer
})

export const actions = counterSlice.actions;

export default store
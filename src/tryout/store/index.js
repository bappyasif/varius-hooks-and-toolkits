import { createSlice, configureStore } from "@reduxjs/toolkit"

const initialState = {
    enroll: false,
    ready: false,
    name: "",
    num: 1
}

const tryoutSlice = createSlice({
    name: "Tryout Slice",
    initialState,
    reducers: {
        enroll(state) {
            state.enroll = !state.enroll
        },

        ready(state) {
            state.ready = !state.ready
        },

        name(state, action) {
            state.name = action.payload
        },

        num(state, action) {
            state.num = action.payload
        }
    }
})

export const actions = tryoutSlice.actions;

const store = configureStore({
    reducer: tryoutSlice.reducer
});

export default store;
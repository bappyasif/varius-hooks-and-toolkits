import { configureStore } from "@reduxjs/toolkit";
import SliceReducer from "../features/slices";

const store = configureStore({
    reducer: {
        counter: SliceReducer
    }
})

export type RootStateType = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
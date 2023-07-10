import { createSlice } from "@reduxjs/toolkit"
import { WritableDraft } from "immer/dist/internal.js"
import { RootState } from "../../app/store"

export type StateType = {
    count: number
}

const initialState: StateType = {
    count: 0
}

const counterSlice = createSlice({
    name: "counter",
    initialState: initialState,
    reducers: {
        increment: (state) => {
            state.count += 1
        },
        decrement: (state) => {
            state.count -= 1
        },
        addByAmount: (state, action) => {
            state.count += action.payload
        },
        subByAmount: (state, action) => {
            state.count -= action.payload
        }
    }
});

export const { decrement, increment, addByAmount, subByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.count

const CounterReducer = counterSlice.reducer

export default CounterReducer
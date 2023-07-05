import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    count: 0
}

const counterSlice = createSlice({
    name: "counter",
    initialState: initialState,
    reducers: {
        incrementCount(state) {
            state.count += 1
        },
        decrementCount: (state) => {
            state.count -= 1
        },
        resetCounter( state ) {
            state.count = 0;
        },
        incrementCountByAmount: (state, action) => {
            state.count += action.payload
        },
        decrementCountByAmount(state, action) {
            state.count -= action.payload
        }
    }
});

export const {decrementCount, incrementCount, decrementCountByAmount, incrementCountByAmount, resetCounter} = counterSlice.actions;

export default counterSlice.reducer;
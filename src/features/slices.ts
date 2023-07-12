import { createSlice } from "@reduxjs/toolkit"

type InitType = {
    count: number
}

const initState: InitType = {
    count: 0
}

const slice = createSlice({
    initialState: initState,
    name: "count",
    reducers: {
        increment: state => {
            state.count += 1
        }
    }
})

export const { increment } = slice.actions

const SliceReducer = slice.reducer;
export default SliceReducer
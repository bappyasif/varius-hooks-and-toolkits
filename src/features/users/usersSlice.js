import { createSlice } from "@reduxjs/toolkit"

const initialState = [
    {id: 0, name: "big lebowski"},
    {id: 1, name: "dude lebowski"},
    {id: 2, name: "dave gray"},
    {id: 3, name: "neil young"}
]

const usersSlice = createSlice({
    initialState: initialState,
    name: "users",
    reducers: {

    }
});

export const selectAllUsers = (state) => state.users

export default usersSlice.reducer
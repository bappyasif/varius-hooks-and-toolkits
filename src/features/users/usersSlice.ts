import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"

type UserType = {
    name: string
}

export type UsersListType = {
    users: UserType[],
    selected: string
}

const initialState: UsersListType = {
    users: [
        {name: "a"},
        {name: "b"}
    ],
    selected: ""
}

const userSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addUser: (state, action:PayloadAction<UserType>) => {
            const newUser:UserType = action.payload
            state.users.push(newUser)
        },
        selectedUser: (state, action:PayloadAction<UserType>) => {
            state.selected = action.payload.name
        },
        deleteUser: (state, action:PayloadAction<string>) => {
            state.users = state.users.filter(user => user.name !== action.payload)
            state.selected = ""
        },
        updateUser: (state, action) => {
            const updatedList = state.users.map(item => {
                if(item.name === state.selected) {
                    if(action.payload) {
                        item.name = action.payload
                    } else {
                        alert("nope possible!!")
                    }
                }
                return item
            })
            state.users = updatedList
            state.selected = ""
        }
    }
})

export const { addUser, selectedUser, deleteUser, updateUser } = userSlice.actions

// export const usersList = useSelector((state: UsersListType) => state.users)
export const usersList = (state: UsersListType) => state.users

const UsersReducer = userSlice.reducer

export default UsersReducer
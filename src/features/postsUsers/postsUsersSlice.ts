import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../posts/fetchRequests";

type GeoType = {
    lat: string,
    lng: string
  }

type UserAddressType = {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: GeoType
}

export type PostUserType = {
    id: number,
    name: string,
    username: string,
    email: string,
    // address: UserAddressType
};

type PostUsersListType = {
    users: PostUserType[]
}

type PostsUsersInitialStateType = {
    users: PostUserType[],
    whichUser: string
}

const initialState: PostsUsersInitialStateType = {
    users: [],
    whichUser: ""
}

const postsUsersSlice = createSlice({
    initialState,
    name: "posts users",
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            const moddedList = action.payload.map((item:PostUserType) => {
                const {email, id, name, username} = item
                const temp = {
                    name, username, id, email
                }
                return temp
            })
            
            state.users = moddedList

            // const moddedList = action.payload.map((item:PostUserType) => {
            //     const temp:PostUserType = {name: "", email: "", id: 0, username: ""};
            //     const acceptKeys = ["id", "username", "name", "email"]
            //     for(let key in item) {
            //         if(acceptKeys.includes(key)) {
            //             temp[key] = item[key]
            //         }
            //     }
            // })
        })
    }
});

// export const { slectedUser } = postsUsersSlice.actions;

const PostsUsersReducer = postsUsersSlice.reducer;

export default PostsUsersReducer
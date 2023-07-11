import {configureStore} from "@reduxjs/toolkit"
import CounterReducer from "../features/counterSlice";
import { TypedUseSelectorHook } from "react-redux";
import UsersReducer from "../features/users/usersSlice";
import PostsReducer from "../features/posts/postsSlice";
import PostsUsersReducer from "../features/postsUsers/postsUsersSlice";
// import { TypedUseSelectorHook, useDispatch } from "react-redux";
// import { useSelector } from "react-redux";

const store = configureStore({
    reducer: {
        counter: CounterReducer,
        users: UsersReducer,
        posts: PostsReducer,
        postsUsers: PostsUsersReducer
    }
})

// export type RootState = ReturnType<typeof store.getState>

// type StoreType = ReturnType<typeof store.getState>

// const RootStore:StoreType = store

// export const useAppDispatch: ()=>typeof store.dispatch = useDispatch

// export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// export type PostsSelectorType = TypedUseSelectorHook<RootState>
// export const useAppDispatch: () => AppDispatch = useDispatch

// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
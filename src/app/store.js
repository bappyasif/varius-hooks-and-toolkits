import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import postsReducer from "../features/posts/postSlice"
import usersReducer from "../features/users/usersSlice"

const store = configureStore({
    reducer: {
        counter: counterReducer,
        // now we can easily use other slices from other features as well
        posts: postsReducer,
        users: usersReducer
    }
});

export default store;
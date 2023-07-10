import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../app/store";
// import { PostsListType } from "../features/users/usersSlice";
// import { PostsSelectorType, RootState } from "../app/store";
// import { PostsSelectorType } from "../app/store";

// export const usePostsSelector: () => PostsSelectorType = useSelector

// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// export const usePostsListsSelector: TypedUseSelectorHook<RootState> = useSelector((state:RootState) => state.posts.posts)
// export const usePostsListsSelector: TypedUseSelectorHook<PostsListType> = useSelector((state:RootState) => state.posts)

export const useUsersSelector: TypedUseSelectorHook<RootState> = useSelector

// export const usePostsListsType: TypedUseSelectorHook<RootState> = useSelector
// export const usePostsListsSelector = useSelector((state: RootState) => state.posts.posts)

// works, when exported from store
// export const usePostsSelector: PostsSelectorType = useSelector

export const useSelectedUserSelector: TypedUseSelectorHook<RootState> = useSelector
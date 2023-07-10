import { TypedUseSelectorHook, useDispatch } from "react-redux"
import { AppDispatch, RootState } from "../app/store"
import { useSelector } from "react-redux"
import { StateType } from "../features/counterSlice"

export const useAppDispatch: () => AppDispatch = useDispatch

// recommended method
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// export const useAppSelector: TypedUseSelectorHook<StateType> = useSelector
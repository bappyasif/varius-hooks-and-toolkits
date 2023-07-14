import { createSlice } from "@reduxjs/toolkit"

export type MealNameType = {
    [index: string] : string
}

export type MealsType = {
    lists: MealNameType[]
}

const initMealsState : MealsType = {
    lists: []
}

const mealsSlice = createSlice({
    initialState: initMealsState,
    name: "meals",
    reducers: {

    }
})

const MealsReducer = mealsSlice.reducer;

export default MealsReducer
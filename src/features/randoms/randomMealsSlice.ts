import { createSlice } from "@reduxjs/toolkit";
import { MealsType } from "../meals/mealsSlice";

const initRandomMealState: MealsType = {
    lists: []
}

const randomMealSlice = createSlice({
    initialState: initRandomMealState,
    name: "random meals",
    reducers: {

    }
});

const RandomMealReducer = randomMealSlice.reducer

export default RandomMealReducer
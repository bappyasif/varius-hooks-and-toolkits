import { createSlice } from "@reduxjs/toolkit";

type IngredientsType = {
    [index: string]: number;
}

type IngredientsListType = {
    list:IngredientsType[]
}

const initIngredientState: IngredientsListType = {
    list: []
}

const ingredientSlices = createSlice({
    initialState: initIngredientState,
    name: "ingredients",
    reducers: {

    }
});

const IngredientsReducer = ingredientSlices.reducer

export default IngredientsReducer
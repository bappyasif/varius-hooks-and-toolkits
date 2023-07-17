import { createSlice } from "@reduxjs/toolkit";
import { fetchIngredients, fetchMealsByIngredient } from "../../data_fetching";
import { MealItemType } from "../category/categorySlice";

type IngredientsType = {
    // [index: string]: number;
    id: string,
    name: string
}

type IngredientsListType = {
    list:IngredientsType[]
}

type InitIngredientStateType = {
    list:IngredientsType[],
    meals: MealItemType[]
}

const initIngredientState: InitIngredientStateType = {
    list: [],
    meals: []
}

const ingredientSlices = createSlice({
    initialState: initIngredientState,
    name: "ingredients",
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(fetchIngredients.fulfilled, (state, action) => {
            state.list = action.payload.meals.map((item:any) => {
                const ingredient : IngredientsType = {
                    id: item.idIngredient,
                    name: item.strIngredient
                }

                return ingredient
            })
            console.log(action.payload, "ingredients!!")
        }),
        builder.addCase(fetchMealsByIngredient.fulfilled, (state, action) => {
            state.meals = action.payload.meals.map((item:any) => {
                return {
                    id: item.idMeal,
                    mealName: item.strMeal,
                    mealImg: item.strMealThumb
                }
            })
            console.log(action.payload, "ingredient meals")
        })
    }
});

const IngredientsReducer = ingredientSlices.reducer

export default IngredientsReducer
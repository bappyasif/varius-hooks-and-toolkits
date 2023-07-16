import { createSlice } from "@reduxjs/toolkit"
import { fetchMealDetails } from "../../data_fetching"

type IAMType = {
    text: string
}

export type MealInfoType = {
    // [index: string] : string
    mealId: string,
    cuisine: string,
    category: string,
    mealName: string,
    mealThumb: string,
    mealSource: string,
    mealTags: string,
    mealTube: string,
    instructions: string
}

export type forMealInitState = {
    meal: MealInfoType,
    ingredients: IAMType[],
    measures: IAMType[],
    // count: number
}

// export type MealsType = {
//     lists: MealNameType[]
// }

const initMealsState: forMealInitState = {
    // count: 0,
    ingredients: [],
    measures: [],
    meal: {
        category: "",
        cuisine: "",
        mealId: "",
        mealName: "",
        mealSource: "",
        mealTags: "",
        mealThumb: "",
        mealTube: "",
        instructions: ""
    }
}

const mealsSlice = createSlice({
    initialState: initMealsState,
    name: "meals",
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(fetchMealDetails.fulfilled, (state, action) => {
            action.payload.meals.map((item: any) => {
                const meal:MealInfoType = {
                    category: item.strCategory,
                    cuisine: item.strArea,
                    mealId: item.idMeal,
                    mealName: item.strMeal,
                    mealSource: item.strSource,
                    mealTags: item.strTags,
                    mealThumb: item.strMealThumb,
                    mealTube: item.strYoutube,
                    instructions: item.strInstructions
                }
                let ingredients = [] 
                let measures = [] 
                for(let key in item) {
                    console.log(["Ingredient"].includes(key), ["Measure"].includes(key))
                    if(key.includes("Ingredient") && item[key]) {
                        ingredients.push(item[key])
                    } else if(key.includes("Measure") && item[key]) {
                        measures.push(item[key])
                    }
                }
                console.log(meal, "ITEM", ingredients, measures)
                state.meal = meal
                state.ingredients = ingredients
                state.measures = measures
                // return {
                //     meal,
                //     ingredients,
                //     measures,
                //     count: 0
                // }
            })
            console.log(action.payload, "meal details")
        })
    }
})

const MealsReducer = mealsSlice.reducer;

export default MealsReducer
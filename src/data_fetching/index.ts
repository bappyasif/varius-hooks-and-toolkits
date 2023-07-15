import { createAsyncThunk } from "@reduxjs/toolkit";
import { useAppSelector } from "../hooks";

const CATEGORIES_URL = "https://www.themealdb.com/api/json/v1/1/categories.php"

const AREA_URL = "https://www.themealdb.com/api/json/v1/1/list.php?a=list"


export const fetchCategories = createAsyncThunk("fetchCategories", async () => {
    const response = await fetch(CATEGORIES_URL);
    return response.json()
})

export const fetchCuisines = createAsyncThunk("meals/ferchCuisines", async () => {
    const response = await fetch(AREA_URL);
    return response.json()
})

// const CATEGORY_URL = "www.themealdb.com/api/json/v1/1/filter.php?c=Seafood"

// export const fetchFilterByCategory = createAsyncThunk("fetchMealsByCategory", async () => {
//     const category = useAppSelector(state => state.category.viewCategory);
//     const CATEGORY_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
//     console.log(category, CATEGORY_URL, "urls@!")
//     const response = await fetch(CATEGORY_URL);
//     return response.json()
// })
export const fetchFilterByCategory = createAsyncThunk("fetchMealsByCategory", async (category:string) => {
    // const category2 = useAppSelector(state => state.category.viewCategory);
    const CATEGORY_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    console.log(category, CATEGORY_URL, "urls@!")
    const response = await fetch(CATEGORY_URL);
    return response.json()
})
import { createAsyncThunk } from "@reduxjs/toolkit";

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
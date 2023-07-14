import { createSlice } from "@reduxjs/toolkit"
import { fetchCuisines } from "../../data_fetching"

type AreaType = {
    American: number,
    British: number,
    Canadian: number,
    Chinese: number,
    Croatian: number,
    Dutch: number,
    Egyptian: number,
    Filipino: number,
    French: number,
    Greek: number,
    Indian: number,
    Irish: number,
    Italian: number,
    Jamaican: number,
    Japanese: number,
    Kenyan: number,
    Malaysian: number,
    Mexican: number,
    Moroccan: number,
    Polish: number,
    Portuguese: number,
    Russian: number,
    Spanish: number,
    Thai: number,
    Tunisian: number,
    Turkish: number,
    Vietnamese: number,
    Unknown: number
}

const initialState: AreaType = {
    American: 0,
    British: 0,
    Canadian: 0,
    Chinese: 0,
    Croatian: 0,
    Dutch: 0,
    Egyptian: 0,
    Filipino: 0,
    French: 0,
    Greek: 0,
    Indian: 0,
    Irish: 0,
    Italian: 0,
    Jamaican: 0,
    Japanese: 0,
    Kenyan: 0,
    Malaysian: 0,
    Mexican: 0,
    Moroccan: 0,
    Polish: 0,
    Portuguese: 0,
    Russian: 0,
    Spanish: 0,
    Thai: 0,
    Tunisian: 0,
    Turkish: 0,
    Vietnamese: 0,
    Unknown: 0
}

type CuisineNameType = {
    name: string,
    count: number
}

type CuisinesListType = {
    list: CuisineNameType[]
}

const initialStateForCuisines: CuisinesListType = {
    list: []
}

const areaSlice = createSlice({
    initialState: initialStateForCuisines,
    name: "area",
    reducers: {
        inCreaseCountForCuisine: (state, action) => {
            state.list = state.list.map(item => {
                if (item.name === action.payload) {
                    item.count += 1;
                }
                return item
            })
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchCuisines.fulfilled, (state, action) => {
            console.log(action.payload.meals)
            state.list = action.payload.meals.map((item: any) => {
                const { strArea } = item;
                return {
                    name: strArea,
                    count: 0
                }
            })
        })
    }
});

export const { inCreaseCountForCuisine } = areaSlice.actions

const CuisineReducer = areaSlice.reducer;

export default CuisineReducer
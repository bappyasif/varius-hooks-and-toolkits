import { createSlice } from "@reduxjs/toolkit"
import { fetchCategories } from "../../data_fetching";

// type CategoryState = {
//     Beef: number,
//     Breakfast: number,
//     Chicken: number,
//     Dessert: number,
//     Goat: number,
//     Lamb: number,
//     Miscellaneous: number,
//     Pasta: number,
//     Pork: number,
//     Seafood: number,
//     Side: number,
//     Starter: number,
//     Vegan: number,
//     Vegetarian: number
// }

// const initialStateForCategories: CategoryState = {
//     Beef: 0,
//     Breakfast: 0,
//     Chicken: 0,
//     Dessert: 0,
//     Goat: 0,
//     Lamb: 0,
//     Miscellaneous: 0,
//     Pasta: 0,
//     Pork: 0,
//     Seafood: 0,
//     Side: 0,
//     Starter: 0,
//     Vegan: 0,
//     Vegetarian: 0
// }

type CategoryItemType = {
    // [index: string]: number
    count: number,
    id: string,
    imgSrc: string,
    name: string,
    description: string
}

type CategoriesType = {
    list: CategoryItemType[]
}

// type CategoryInitStateType = {
//     list: CategoryItemType[],

// }

const initialStateForCategories: CategoriesType = {
    list: []
}

const categorySlice = createSlice({
    initialState: initialStateForCategories,
    name: "category",
    reducers: {
        increaseCategoryItemCount: (state, action) => {
            state.list = state.list.map((item) => {
                if(item.id === action.payload) {
                    // item.count = item.count ? item.count + 1 : 1
                    item.count += 1
                }
                return item
            })
            // state.list = state.list.map((item: CategoryItemType) => {
            //     const key = Object.keys(item)[0]
            //     if (item[key] === action.payload) {
            //         item.categoryCount = item.categoryCount ? item.categoryCount + 1 : 1
            //         console.log("increase count for :", action.payload, key, Object.keys(item))
            //     }
            //     return item
            //     // console.log("increase count for :", action.payload, key)
            // })
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.list = action.payload.categories.map((item: any) => {
                const {idCategory, strCategory, strCategoryDescription, strCategoryThumb} = item
                return {
                    id: idCategory,
                    name: strCategory,
                    description: strCategoryDescription,
                    imgSrc: strCategoryThumb,
                    count: 0
                }
            })
            console.log(state.list)
        })
    }
});

export const { increaseCategoryItemCount } = categorySlice.actions

const CategoryReducer = categorySlice.reducer;

export default CategoryReducer
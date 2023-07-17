import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "."
import { useParams } from "react-router-dom";

export const useToGetCategories = () => {
    const list = useAppSelector(state => state.categories.list);
    console.log(list, "catgories!!")
    // return {categories: categories}
    return list
}

export const useToGetCuisines = () => {
    const list = useAppSelector(state => state.cuisine.list)
    return list
}

// const useToGetList = (sliceName: string) => {
//     let list = useAppSelector(state => {
//         if(sliceName === "cuisine") {
//             return state.cuisine.list
//         } else if(sliceName === "category") {
//             return state.category.list
//         } else if(sliceName === "area") {
//             return state.category.list
//         }  
//     })
// }

export const useToDispatchFetching = (fetchFunc: any) => { 
    const { name, id } = useParams()   
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchFunc(name || id))
    }, [])
}
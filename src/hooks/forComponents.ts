import { useAppSelector } from "."

export const useToGetCategories = () => {
    const list = useAppSelector(state => state.category.list);
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
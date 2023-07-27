import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "."
import { useParams } from "react-router-dom";
import { fetchCategories, fetchCuisines, fetchIngredients } from "../data_fetching";
import { CategoriesType, CategoryItemType } from "../features/categories/categoriesSlice";
import { CuisineNameType, CuisinesListType } from "../features/area/areaSlices";
import { IngredientsListType, IngredientsType, InitIngredientStateType } from "../features/ingredients/ingredientSlice";

export const useToGetCategories = () => {
    const list = useAppSelector(state => state.categories.list);
    console.log(list, "catgories!!")
    const dispatch = useAppDispatch();
    // return {categories: categories}
    useEffect(() => {
        list.length ? null : dispatch(fetchCategories())
    }, [])

    return list
}

export const useToGetCuisines = () => {
    const list = useAppSelector(state => state.cuisine.list)
    const dispatch = useAppDispatch();
    // return {categories: categories}
    useEffect(() => {
        list.length ? null : dispatch(fetchCuisines())
    }, [])
    return list
}

export const useToGetIngredients = () => {
    const list = useAppSelector(state => state.ingredient.list)
    const dispatch = useAppDispatch();
    // return {categories: categories}
    useEffect(() => {
        list.length ? null : dispatch(fetchIngredients())
    }, [])
    return list
}

// export const fetchOnceOnAppLoad = (data: IngredientsListType) => {
//     const dispatch = useAppDispatch();
//     // return {categories: categories}
//     useEffect(() => {
//         data.list.length ? null : dispatch(fetchCuisines())
//     }, [])
// }

// const fetchOnceOnAppLoad = (propKey: keyof InitIngredientStateType) => {
//     // const list = useAppSelector(state => state[propKey].list)
//     console.log(propKey)
// }

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

export type DataType = {
    // data: (CuisineNameType | CategoryItemType | IngredientsType)[]
    data: (CuisineNameType | CategoryItemType)[]
    // data: CuisineNameType[]
}

export const useToGetHighestCount = (list: DataType) => {
    let highestCount = 0;

    list.data.forEach(item => item.count > highestCount ? highestCount = item.count : null)

    // useEffect(() => {
    //     list.data.forEach(item => item.count > highestCount ? highestCount = item.count : null)
    // }, [list.data])

    return { highestCount }
}

export const useToGetRandomItem = (list: DataType, highestCount: number) => {
    const filteredList = list.data.filter(item => item.count === highestCount)

    const [rando, setRando] = useState<number>(0)

    // console.log(list.data, "!!!!", filteredList.length, highestCount, filteredList[rando], )

    useEffect(() => {
        if (filteredList.length && !rando) {
            setRando(Math.round(Math.random() * filteredList.length))
        }
    }, [rando])

    return { item: filteredList[rando], filteredList }
}

export const useToGetHighestCountedList = (data: CuisinesListType | CategoriesType) => {
    // const cuisines = useToGetCuisines()

    let highestCount = 0;

    data.list.forEach(item => item.count > highestCount ? highestCount = item.count : null)

    const filteredList = data.list.filter(item => item.count === highestCount)

    const [rando, setRando] = useState<number>(0)

    useEffect(() => {
        if (filteredList.length) {
            setRando(Math.round(Math.random() * filteredList.length))
        }
    }, [filteredList, rando])

    return { rando, filteredList }
}

export const useToGetFourRandomItems = (categories: (CategoryItemType | CuisineNameType | IngredientsType)[]) => {
    const [names, setNames] = useState<string[]>([]);

    const { highestCount } = useToGetHighestCount({ data: categories })

    const { item, filteredList } = useToGetRandomItem({ data: categories }, highestCount)

    const chooseRandom = () => {
        const rnd = Math.round(Math.random() * filteredList.length)
        const chkExist = names.findIndex(name => name === filteredList[rnd]?.name)
        if (chkExist === -1 && filteredList[rnd]?.name) {
            setNames(prev => [...prev, filteredList[rnd]?.name])
        }
    }

    const chck = (nm: string) => {
        const chk = names.findIndex(name => name === nm)
        if (chk === -1 && names[0] !== undefined && nm !== "Beef") {
            setNames(prev => [...prev, item.name])
        }
    }

    const removeDuplicate = () => {
        const filtered = names.filter(function (item, pos) {
            return names.indexOf(item) == pos;
        })

        setNames(filtered)
    }

    useEffect(() => {
        item?.name !== undefined && chck(item.name)
    }, [item])

    useEffect(() => {
        names.length < 4 && removeDuplicate()
        filteredList.length && names.length < 4 && chooseRandom()
    }, [names, filteredList])

    return { names }
}

// export const useToGetFourPopularItems = (list: (CategoryItemType | CuisineNameType | IngredientsType)[]) => {
//     const [names, setNames] = useState<string[]>([]);

//     const { highestCount } = useToGetHighestCount({ data: list })

//     const { item, filteredList } = useToGetRandomItem({ data: list }, highestCount)

//     const test = list.filter(item => item.count < highestCount)

//     const chooseRandom = () => {
//         console.log("CHOOSE RANDOM")
//         const rnd = Math.round(Math.random() * test.length)
//         const chkExist = names.findIndex(name => name === test[rnd]?.name)
//         console.log("CHOOSE RANDOM", rnd, chkExist)
//         if (chkExist === -1 && test[rnd]?.name && names.length < 4) {
//             setNames(prev => [...prev, filteredList[rnd]?.name])
//         }
//     }

//     // const chooseRandom = () => {
//     //     const rnd = Math.round(Math.random() * filteredList.length)
//     //     const chkExist = names.findIndex(name => name === filteredList[rnd]?.name)
//     //     if (chkExist === -1 && filteredList[rnd]?.name) {
//     //         setNames(prev => [...prev, filteredList[rnd]?.name])
//     //     }
//     // }

//     const chck = (nm: string) => {
//         const chk = names.findIndex(name => name === nm)
//         console.log(chk, "check!!", names, nm, chk === -1 && nm !== "Beef" && nm !== undefined)
//         if (chk === -1 && nm !== "Beef" && nm !== undefined) {
//             // setNames(prev => {
//             //     const filtered = prev.filter(function (item, pos) {
//             //         return names.indexOf(item) == pos;
//             //     })
//             //     console.log
//             //     return [...filtered]
//             // })
//             setNames(prev => [...prev, nm])
//         }
//     }

//     const removeDuplicate = () => {
//         const filtered = names.filter(function (item, pos) {
//             return names.indexOf(item) == pos;
//         })

//         setNames(filtered)
//     }

//     // const addAllToList = () => {
//     //     !names.length && filteredList.forEach(item => {
//     //         setNames(prev => [...prev, item.name])
//     //         console.log(filteredList.length, "LENGTH", test.length, highestCount)
//     //     })
//     //     // removeDuplicate()
//     // }

//     // useEffect(() => {
//     //     // names.length < 4 && removeDuplicate()
//     //     names.length > 2 && names.length < 4 && removeDuplicate()
//     //     // names.length === 2 && removeDuplicate()
//     //     // names.length === 3 && removeDuplicate()
//     //     // names.length === 4 && removeDuplicate()
//     //     // filteredList.length && names.length < 4 && chooseRandom()
//     //     filteredList.length && filteredList.length < 4 && names.length < filteredList.length && addAllToList()
//     //     filteredList.length && filteredList.length < 4 && names.length < filteredList.length && console.log("running ?!?!?!?", test.length, filteredList.length)

//     //     // filteredList.length < 4 && names.length < filteredList.length && removeDuplicate()
//     //     // console.log(filteredList.length, "FILTERED")
//     //     // filteredList.length > 0 && filteredList.length < 4 && test.length && names.length < 4 && chooseRandom()
//     // }, [names, filteredList])

//     // const allHighestToList = () => {
//     //     const highestOnly = list.filter(item => item.count >= highestCount);
//     //     console.log("highest only!!", highestOnly.length)
//     //     !names.length && highestOnly.forEach((item, idx) => {
//     //         if(idx < 4) {
//     //             console.log("Add name!!", names.length)
//     //             setNames(prev=> [...prev, item.name])
//     //             // setNames(prev => {
//     //             //     const filtered = prev.filter(function (item, pos) {
//     //             //         return names.indexOf(item) == pos;
//     //             //     })
//     //             //     return filtered
//     //             // })
//     //             // const filtered = names.filter(function (item, pos) {
//     //             //     return names.indexOf(item) == pos;
//     //             // })
//     //             // setNames(filtered)
//     //         }
//     //     })
//     // }

//     const highestOnly = list.filter(item => item.count >= highestCount);

//     const allHighestToList = () => {
//         const rnd = Math.floor(Math.random() * highestOnly.length)
//         const currItem = highestOnly[rnd]
//         const checkExists = names.findIndex(name => name === currItem.name)
//         if(checkExists === -1 && currItem.name) {
//             console.log("adding name", currItem.name, currItem)
//             setNames(prev => [...prev, currItem.name])
//         }
//     }

//     useEffect(() => {
//         highestCount !== undefined && names.length < 4 && allHighestToList()
//     }, [highestCount, names])

//     // useEffect(() => {
//     //     names.length === 0 && item?.name !== undefined && chck(item.name)
//     //     item?.name !== undefined && console.log(item.name, names)
//     // }, [item])

//     // useEffect(() => {
//     //     // (names.length == 8) && removeDuplicate()
//     //     // names.length < 4 && test.length && chooseRandom()
//     //     names.length < 4 && console.log("RUNNNNNNN")
//     // }, [names])

//     console.log(names, "names!!!!")

//     return { names }
// }

export const useToGetFourPopularItems = (list: (CategoryItemType | CuisineNameType | IngredientsType)[]) => {
    const [names, setNames] = useState<string[]>([]);

    const { highestCount } = useToGetHighestCount({ data: list })

    const { item, filteredList } = useToGetRandomItem({ data: list }, highestCount)

    const test = list.filter(item => item.count < highestCount)

    const chooseRandom = () => {
        console.log("CHOOSE RANDOM")
        const rnd = Math.round(Math.random() * test.length)
        const chkExist = names.findIndex(name => name === test[rnd]?.name)
        console.log("CHOOSE RANDOM", rnd, chkExist)
        if (chkExist === -1 && test[rnd]?.name && names.length < 4) {
            setNames(prev => [...prev, filteredList[rnd]?.name])
        }
    }

    const chck = (nm: string) => {
        const chk = names.findIndex(name => name === nm)
        console.log(chk, "check!!", names, nm, chk === -1 && nm !== "Beef" && nm !== undefined)
        if (chk === -1 && nm !== "Beef" && nm !== undefined) {
            setNames(prev => [...prev, nm])
        }
    }

    const removeDuplicate = () => {
        const filtered = names.filter(function (item, pos) {
            return names.indexOf(item) == pos;
        })

        setNames(filtered)
    }

    const highestOnly = list.filter(item => item.count >= highestCount);

    const allHighestToList = () => {
        const rnd = Math.floor(Math.random() * highestOnly.length)
        const currItem = highestOnly[rnd]
        const checkExists = names.findIndex(name => name === currItem.name)
        if (checkExists === -1 && currItem.name) {
            console.log("adding name", currItem.name, currItem)
            setNames(prev => [...prev, currItem.name])
        }
    }

    useEffect(() => {
        highestCount !== undefined && names.length < 4 && allHighestToList()
    }, [highestCount, names])

    console.log(names, "names!!!!", highestOnly)

    return { names }
}

export const useToGetAnRandomMeal = () => {
    const category = useAppSelector(state => state.randomMeal.category)
    const cuisine = useAppSelector(state => state.randomMeal.cuisine)
    const mealId = useAppSelector(state => state.randomMeal.mealId)
    const mealName = useAppSelector(state => state.randomMeal.mealName)
    const mealThumb = useAppSelector(state => state.randomMeal.mealThumb)

    return { category, cuisine, mealId, mealName, mealThumb }
}
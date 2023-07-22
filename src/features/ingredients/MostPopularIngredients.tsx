import { Link } from "react-router-dom"
import { useAppSelector } from "../../hooks"
import { useToGetFourRandomItems } from "../../hooks/forComponents"

export const MostPopularIngredients = () => {
    const ingredients = useAppSelector(state => state.ingredient.list)
    // console.log(ingredients, "|INGREDIENTSSSS")
    const {names} = useToGetFourRandomItems(ingredients)

    const renderContent = (
        names.map(name => {
            return (
                <Link to={`ingredients/${name || "Lime"}`}>{name || "Lime"}</Link>
            )
        })
    )

    return (
        <div>
            <h2 className="text-4xl">Most Popular Ingredients</h2>
            <div className="flex gap-4 text-2xl">{renderContent}</div>
        </div>
    )
}


// export const MostPopularIngredients = () => {
//     const ingredients = useAppSelector(state => state.ingredient.list)
//     // console.log(ingredients, "|INGREDIENTSSSS")
//     const { highestCount } = useToGetHighestCount({ data: ingredients })

//     const { item } = useToGetRandomItem({ data: ingredients }, highestCount)

//     let name = ""

//     if (item) {
//         name = item.name
//     }

//     console.log(item, "ITEM!!!!!")
//     return (
//         <div>
//             <h2>MostPopularIngredients - {name || "Chicken"} -- {ingredients.length} - {highestCount}</h2>
//         </div>
//     )
// }

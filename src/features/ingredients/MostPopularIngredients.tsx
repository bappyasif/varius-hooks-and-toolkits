import { useAppSelector } from "../../hooks"
import { useToGetHighestCount, useToGetRandomItem } from "../../hooks/forComponents"

export const MostPopularIngredients = () => {
    const ingredients = useAppSelector(state => state.ingredient.list)
    // console.log(ingredients, "|INGREDIENTSSSS")
    const { highestCount } = useToGetHighestCount({ data: ingredients })

    const { item } = useToGetRandomItem({ data: ingredients }, highestCount)

    let name = ""

    if (item) {
        name = item.name
    }

    console.log(item, "ITEM!!!!!")
    return (
        <div>
            <h2>MostPopularIngredients - {name || "Chicken"} -- {ingredients.length} - {highestCount}</h2>
        </div>
    )
}

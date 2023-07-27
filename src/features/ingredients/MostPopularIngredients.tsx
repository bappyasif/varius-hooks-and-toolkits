import { Link } from "react-router-dom"
import { useAppSelector } from "../../hooks"
import { useToGetFourPopularItems, useToGetFourRandomItems } from "../../hooks/forComponents"
import { useTranslation } from "react-i18next"

export const MostPopularIngredients = () => {
    const ingredients = useAppSelector(state => state.ingredient.list)
    // console.log(ingredients, "|INGREDIENTSSSS")
    // const {names} = useToGetFourRandomItems(ingredients)
    // figure it out how!!
    const {names} = useToGetFourPopularItems(ingredients)

    const renderContent = (
        names.map(name => {
            return (
                <Link key={name} to={`/ingredients/${name || "Lime"}`}>{name || "Lime"}</Link>
            )
        })
    )

    const {t} = useTranslation()

    return (
        <div>
            <h2 className="text-4xl">{t("Most Popular Ingredients")}</h2>
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

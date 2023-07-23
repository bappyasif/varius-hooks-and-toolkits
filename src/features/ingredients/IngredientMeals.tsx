import { useParams } from "react-router-dom"
import { fetchMealsByIngredient } from "../../data_fetching"
import { useToDispatchFetching } from "../../hooks/forComponents"
import { useAppSelector } from "../../hooks"
import { RenderMeal } from "../category/CategoryViewPage"

export const IngredientMeals = () => {
    // const { name } = useParams()
    // useToDispatchFetching(fetchMealsByIngredient, name || "")
    useToDispatchFetching(fetchMealsByIngredient)

    const meals = useAppSelector(state => state.ingredient.meals)

    const renderMeals = (
        meals.map(item => <RenderMeal id={item.id} mealImg={item.mealImg} mealName={item.mealName} key={item.id} />)
    )

    const {name} = useParams()

    return (
        <div className="flex flex-col gap-y-8">
            <h1>Meals Cooked With {name}</h1>
            <div className="flex flex-wrap gap-8">{renderMeals}</div>
        </div>
    )
}

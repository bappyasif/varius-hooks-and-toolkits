import { Link } from "react-router-dom"
import { fetchOneRandomMeal } from "../../data_fetching"
import { useAppSelector } from "../../hooks"
import { useToDispatchFetching } from "../../hooks/forComponents"

export const RandomMeal = () => {
    useToDispatchFetching(fetchOneRandomMeal)
    const category = useAppSelector(state => state.randomMeal.category)
    const cuisine = useAppSelector(state => state.randomMeal.cuisine)
    const mealId = useAppSelector(state => state.randomMeal.mealId)
    const mealName = useAppSelector(state => state.randomMeal.mealName)
    const mealThumb = useAppSelector(state => state.randomMeal.mealThumb)

    const content = (
        <Link to={`/meals/${mealId}`}>
            <p>{category}</p>
            <p>{cuisine}</p>
            <h2>{mealName}</h2>
            <img src={mealThumb} alt={mealName} />
        </Link>
    )

    return (
        <div>
            <h1>Random Meal</h1>
            {/* <RenderMealBasicInfo /> */}
            {content}
        </div>
    )
}

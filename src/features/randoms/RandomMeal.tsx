import { Link } from "react-router-dom"
import { fetchOneRandomMeal } from "../../data_fetching"
import { useToDispatchFetching, useToGetAnRandomMeal } from "../../hooks/forComponents"
import { useEffect, useState } from "react"

export const RandomMeal = () => {
    const [wait, setWait] = useState<boolean>(true)

    useToDispatchFetching(fetchOneRandomMeal)

    const { category, cuisine, mealId, mealName, mealThumb } = useToGetAnRandomMeal()

    useEffect(() => {
        const timer = setTimeout(() => setWait(false), 999)
        return () => clearTimeout(timer)
    }, [])

    const content = (
        wait
            ? null
            :
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

import { Link, useNavigate } from "react-router-dom"
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

    const navigate = useNavigate()

    const handleCategoryClick = () => navigate(`/categories/${category}`)

    const handleCuisineClick = () => navigate(`/cuisines/${cuisine}`)

    const content = (
        wait
            ? null
            :
            <div className="flex flex-col items-center">
                <Link to={`/meals/${mealId}`} className="text-2xl">{mealName}</Link>
                <img className="aspect-square w-96 h-96" src={mealThumb} alt={mealName} />
                <div className="self-start">
                    <button onClick={handleCategoryClick}>{category}</button>
                    <button onClick={handleCuisineClick}>{cuisine}</button>
                </div>
            </div>
    )

    return (
        <div className="flex flex-col items-center">
            <h1>Random Meal</h1>
            {/* <RenderMealBasicInfo /> */}
            {content}
        </div>
    )
}

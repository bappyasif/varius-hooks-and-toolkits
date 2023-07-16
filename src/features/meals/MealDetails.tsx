import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { fetchMealDetails } from "../../data_fetching";
import { useEffect } from "react";

export const MealDetails = () => {
    const { mealId } = useParams()
    const dispatch = useAppDispatch();

    const measures = useAppSelector(state => state.meal.measures);
    const ingredients = useAppSelector(state => state.meal.ingredients)
    useEffect(() => {
        dispatch(fetchMealDetails(mealId || ""))
    }, [mealId])
    return (
        <div>
            <h1>MealDetails</h1>
            {measures.length} -- {ingredients.length}
            <RenderMealBasicInfo />
        </div>
    )
}

const RenderMealBasicInfo = () => {
    const meal = useAppSelector(state => state.meal.meal)
    const { category, cuisine, instructions, mealId, mealName, mealSource, mealTags, mealThumb, mealTube } = meal
    
    const content = (
        <div key={mealId}>
            <h1>{mealName}</h1>
            <p>{category}</p>
            <p>{cuisine}</p>
            <p>{mealTags}</p>
            <a href={mealSource}>Source</a>
            <p>{instructions}</p>
            <img src={mealThumb} alt={mealName} />
            {/* <video src={mealTube} controls></video> */}
            <iframe width="420" height="315"
                src={`${mealTube.replace("watch?v=", "embed/")}`}>
            </iframe>
        </div>
    )

    return content
}

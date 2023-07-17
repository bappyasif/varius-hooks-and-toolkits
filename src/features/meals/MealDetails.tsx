import { Link, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { fetchMealDetails } from "../../data_fetching";
import { useEffect } from "react";
import { IAMType } from "./mealsSlice";
import { useToDispatchFetching } from "../../hooks/forComponents";

export const MealDetails = () => {
    // const { mealId } = useParams()
    // const dispatch = useAppDispatch();

    // useEffect(() => {
    //     dispatch(fetchMealDetails(mealId || ""))
    // }, [mealId])

    useToDispatchFetching(fetchMealDetails)

    return (
        <div>
            <h1>MealDetails</h1>
            {/* {measures.length} -- {ingredients.length} */}
            <RenderMealBasicInfo 
            // ingredients={ingredients} measures={measures} 
            />
        </div>
    )
}

type IAMT = {
    measures: IAMType[],
    ingredients: IAMType[]
}

export const RenderMealBasicInfo = () => {
    const meal = useAppSelector(state => state.meal.meal)
    const { category, cuisine, instructions, mealId, mealName, mealSource, mealTags, mealThumb, mealTube } = meal
    
    // const renderIAMT = ()

    const content = (
        <div key={mealId}>
            <h1>{mealName}</h1>
            <p>{category}</p>
            <p>{cuisine}</p>
            <p>{mealTags}</p>
            <a href={mealSource}>Source</a>
            <RenderIngredientsAndMeasures />
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

const RenderIngredientsAndMeasures = () => {
    const measures = useAppSelector(state => state.meal.measures);
    const ingredients = useAppSelector(state => state.meal.ingredients)
    
    console.log(measures, ingredients);

    const content = (
        ingredients.map((item, idx) => {
            return (
                <div key={item.text + idx}>
                    <Link to={`/ingredients/${item.text}`}>{item.text}</Link> -- {measures[idx].text}
                </div>
            )
        })
    )

    return content
}

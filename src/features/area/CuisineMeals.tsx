import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks"
import { fetchCuisineMeals } from "../../data_fetching";
import { Link, useParams } from "react-router-dom";

export const CuisineMeals = () => {
    const { cuisineName } = useParams()
    
    const dispatch = useAppDispatch();

    const meals = useAppSelector(state => state.cuisine.meals)
    
    useEffect(() => {
        dispatch(fetchCuisineMeals(cuisineName || ""))
    }, [cuisineName])

    const renderMeals = (
        meals.map(item => {
            const { id, mealImg, mealName } = item;
            return (
                <Link to={`/meals/${id}`} key={id}>
                    <div >
                        <h2>{mealName}</h2>
                        <img className="w-48" src={mealImg} alt={mealName} />
                    </div>
                </Link>
            )
        })
    )

    return (
        <div>
            <h1>CuisineMeals -- {meals.length} -- {cuisineName}</h1>
            <div className="flex flex-wrap gap-8">{renderMeals}</div>
        </div>
    )
}

import { Link, useParams } from "react-router-dom"
// import { useAppDispatch } from "../hooks"
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchFilterByCategory } from "../../data_fetching";
// import { fetchFilterByCategory } from "../data_fetching";

export const CategoryViewPage = () => {
    const { categoryName } = useParams()

    const dispatch = useAppDispatch();

    const meals = useAppSelector(state => state.category.meals)

    // const renderMeals = (
    //     meals.map(item => {
    //         const {meals} = item;
    //         meals.map(item => {
    //             const {} = item
    //         })
    //     })
    // )

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

    // console.log(meals, "MEALS")

    useEffect(() => {
        dispatch(fetchFilterByCategory(categoryName || ""))
        // dispatch(fetchFilterByCategory())
    }, [categoryName])

    return (
        <div>
            <h1>CategoryViewPage -- {categoryName}</h1>
            <div className="flex flex-wrap gap-8">{renderMeals}</div>
        </div>
    )
}

import { Link, useParams } from "react-router-dom"
// import { useAppDispatch } from "../hooks"
import { useAppSelector } from "../../hooks";
import { fetchFilterByCategory } from "../../data_fetching";
import { MealItemType } from "./categorySlice";
import { useToDispatchFetching } from "../../hooks/forComponents";
import { useTranslation } from "react-i18next";
// import { fetchFilterByCategory } from "../data_fetching";

export const CategoryViewPage = () => {
    // const { name } = useParams()

    // const dispatch = useAppDispatch();

    // console.log(meals, "MEALS")
    useToDispatchFetching(fetchFilterByCategory)

    // useEffect(() => {
    //     dispatch(fetchFilterByCategory(name || ""))
    //     // dispatch(fetchFilterByCategory())
    // }, [name])

    const {name} = useParams()
    const {t} = useTranslation()

    return (
        <div>
            <h1>{t(`${name}`)} : {t("Meals List")}</h1>
            <CategoryMeals />
        </div>
    )
}

const CategoryMeals = () => {
    const meals = useAppSelector(state => state.category.meals)

    const renderMeals = (
        meals.map(item => <RenderMeal id={item.id} mealImg={item.mealImg} mealName={item.mealName} key={item.id} />)
    )

    return (
        <div className="flex flex-wrap gap-8">{renderMeals}</div>
    )
}

export const RenderMeal = ({ ...item }: MealItemType) => {
    const { id, mealImg, mealName } = item;
    return (
        <Link to={`/meals/${id}`} key={id}>
            <div >
                <h2>{mealName}</h2>
                <img className="w-48" src={mealImg} alt={mealName} />
            </div>
        </Link>
    )
}
import { useAppSelector } from "../../hooks"
import { fetchCuisineMeals } from "../../data_fetching";
import { Link } from "react-router-dom";
import { useToDispatchFetching } from "../../hooks/forComponents";

export const CuisineMeals = () => {
    // const { name } = useParams()
    
    // const dispatch = useAppDispatch();
    useToDispatchFetching(fetchCuisineMeals)

    const meals = useAppSelector(state => state.cuisine.meals)
    
    // useEffect(() => {
    //     dispatch(fetchCuisineMeals(name || ""))
    // }, [name])

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
            <h1>CuisineMeals -- {meals.length}</h1>
            <div className="flex flex-wrap gap-8">{renderMeals}</div>
        </div>
    )
}

import { useEffect } from "react";
import { increment } from "../features/slices";
import { useAppDispatch, useAppSelector } from "../hooks"
import { useToGetCategories } from "../hooks/forComponents";
import { fetchCategories } from "../data_fetching";
import { CategoriesList, FirstEightList } from "../features/categories/CategoriesList";
import { CuisinesList } from "../features/area/CuisinesList";
import { IngredientsList } from "../features/ingredients/IngredientsList";
import { RandomMeal } from "../features/randoms/RandomMeal";

export const HomePage = () => {
  const count = useAppSelector(state => state.counter.count)
  
  const dispatch = useAppDispatch();

  const categories = useToGetCategories();
  
  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  return (
    <div>
      <h1>Home -- {count} -- { categories?.length}</h1>
      {/* <CategoriesList /> */}
      <RandomMeal />
      <FirstEightList />
      <CuisinesList />
      <IngredientsList />
      <button onClick={() => dispatch(increment())}>Increment</button>
    </div>
  )
}

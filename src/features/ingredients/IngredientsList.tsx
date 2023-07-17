import { fetchIngredients } from "../../data_fetching"
import { useAppSelector } from "../../hooks"
import { useToDispatchFetching } from "../../hooks/forComponents"

export const IngredientsList = () => {
    useToDispatchFetching(fetchIngredients)
    const list  = useAppSelector(state => state.ingredient.list)
  return (
    <div>IngredientsList -- {list.length}</div>
  )
}

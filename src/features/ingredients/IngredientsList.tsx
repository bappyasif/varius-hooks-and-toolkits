import { fetchIngredients } from "../../data_fetching"
import { useAppSelector } from "../../hooks"
import { useToDispatchFetching, useToGetIngredients } from "../../hooks/forComponents"

export const IngredientsList = () => {
  // useToDispatchFetching(fetchIngredients)
  // const list  = useAppSelector(state => state.ingredient.list)
  // fetchOnceOnAppLoad({data: list})
  const list = useToGetIngredients()
  return (
    <div>IngredientsList -- {list.length}</div>
  )
}

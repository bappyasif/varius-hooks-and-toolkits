import { Link } from "react-router-dom"
import { fetchIngredients } from "../../data_fetching"
import { useAppSelector } from "../../hooks"
import { useToDispatchFetching, useToGetIngredients } from "../../hooks/forComponents"

export const IngredientsList = () => {
  // useToDispatchFetching(fetchIngredients)
  // const list  = useAppSelector(state => state.ingredient.list)
  // fetchOnceOnAppLoad({data: list})
  const list = useToGetIngredients()

  // const test:any = {}

  // list.forEach(item => {
  //   if(item.name) {
  //     test[item.name] = item.name
  //   }
  // })

  // const onlyNames = list.map(item => ({[item.name]: item.name}))
  // const onlyNames = list.map(item => ({"key": item.name, "value": item.name}))

  console.log(list, "ingredients!!")
  // console.log(onlyNames, "onlyNames", test)
  return (
    <div>
      <h1>IngredientsList -- {list.length}</h1>
      <RenderList />
    </div>
  )
}

const RenderList = () => {
  const list = useToGetIngredients()
  const content = (
    list.map(item => {
      return (
        <div key={item.id} className="w-60">
          <Link to={`/ingredients/${item.name}`}>{item.name}</Link>
          {/* <p>{item.description}</p> */}
        </div>
      )
    })
  )

  return <div className="flex flex-wrap gap-8 justify-between text-2xl">{content}</div>
}

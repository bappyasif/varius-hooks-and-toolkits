import { useAppDispatch } from "../../hooks"
import { useToGetCuisines } from "../../hooks/forComponents"
import { inCreaseCountForCuisine } from "./areaSlices"

export const CuisinesList = () => {
  const cuisines = useToGetCuisines()
  
  console.log(cuisines, "cUISINES")

  const dispatch = useAppDispatch();

  const handleClick = (name: string) => {
    dispatch(inCreaseCountForCuisine(name))
  }

  const renderCuisines = (
    cuisines.map(item => {
      const { name } = item;
      return (
        <div onClick={() => handleClick(name)} key={name} className="w-1/6 text-4xl">{name}</div>
      )
    })
  )

  return (
    <div>
      <h2>CuisinesList - {cuisines.length}</h2>
      <div className="flex flex-wrap justify-around gap-4">{renderCuisines}</div>
    </div>
  )
}

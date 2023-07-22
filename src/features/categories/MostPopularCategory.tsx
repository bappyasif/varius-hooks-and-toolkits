import { useAppSelector } from "../../hooks";
import { useToGetFourRandomItems } from "../../hooks/forComponents";
import { Link } from "react-router-dom";

export const MostPopularCategory = () => {
  const categories = useAppSelector(state => state.categories.list)

  const { names } = useToGetFourRandomItems(categories)

  const renderContent = (
    names?.map(name => (
      <Link to={`categories/${name || "Beef"}`}>{name || "Beef"}</Link>
    ))
  )

  // console.log(names, "names!!")

  return (
    <div>
      <h2 className="text-4xl">Most Popular Categories</h2>
      <div className="flex gap-4 text-2xl">{renderContent}</div>
    </div>
  )
}
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks"
import { useToGetHighestCount, useToGetRandomItem } from "../../hooks/forComponents";
import { CategoriesType, CategoryItemType } from "./categoriesSlice";
// import { CategoryItemType } from "./categoriesSlice";

export const MostPopularCategory = () => {
  const categories = useAppSelector(state => state.categories.list);

  const { highestCount } = useToGetHighestCount({ data: categories })

  const { item } = useToGetRandomItem({ data: categories }, highestCount)

  // re-think this custom hook
  // const {filteredList, rando} = useToGetHighestCountedList(categories)

  console.log(item, "CATEGORY RANDO")

  let name = ""

    if(item) {
        name = item.name
    }

  return (
    <div>
      MostPopulatCategory - {categories.length} -- {highestCount} -- {name}
      <RenderCategory list={categories} name={name} />
    </div>
  )
}

const RenderCategory = ({list, name}: {list:CategoryItemType[], name: string}) => {
  const findCategory = list.find(item => item.name === name)

  // const {imgSrc} = findCategory
  return (
    <Link to={`/categories/${name}`}>
      <h2>{name}</h2>
      <img src={findCategory?.imgSrc} alt={name} />
    </Link>
  )
}

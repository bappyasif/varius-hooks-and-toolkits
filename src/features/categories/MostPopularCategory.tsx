import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks"
import { useToGetHighestCountedList } from "../../hooks/forComponents";
// import { CategoryItemType } from "./categoriesSlice";

export const MostPopularCategory = () => {
  const categories = useAppSelector(state => state.categories.list);
  let highestCount = 0;
  categories.forEach(item => item.count > highestCount ? highestCount = item.count : null)
  // const sorted = categories.sort((a:CategoryItemType, b:CategoryItemType) => a.name > b.name ? 1 : -1)
  // const sorted = categories.sort((a, b) => a.name > b.name ? 1 : a.count === b.count ? 0 : -1)
  // const highestCount = sorted.length && sorted[0]?.count
  const filteredList = categories.filter(item => item.count === highestCount)

  const [rando, setRando] = useState<number>(0)

  useEffect(() => {
    if(filteredList.length) {
      setRando(Math.round(Math.random() * filteredList.length))
    }
  }, [filteredList, rando])

  // re-think this custom hook
  // const {filteredList, rando} = useToGetHighestCountedList(categories)

  return (
    <div>MostPopulatCategory - {categories.length} -- {highestCount} -- {filteredList.length} -- {rando} -- {filteredList[rando]?.name}</div>
  )
}

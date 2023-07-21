import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks";
import { useToGetHighestCount, useToGetRandomItem } from "../../hooks/forComponents";
import { CategoryItemType } from "./categoriesSlice";

export const MostPopularCategory = () => {
  const categories = useAppSelector(state => state.categories.list)

  const { names } = useToGetFourRandomItems(categories)

  const renderContent = (
    names?.map(name => (
      <h2 key={name}>{name}</h2>
    ))
  )

  console.log(names, "names!!")

  return (
    <div>
      MostPopularCategory - {names.length}
      <div className="flex gap-4">{renderContent}</div>
    </div>
  )
}


const useToGetFourRandomItems = (categories: CategoryItemType[]) => {
  const [names, setNames] = useState<string[]>([]);

  const { highestCount } = useToGetHighestCount({ data: categories })

  const { item, filteredList } = useToGetRandomItem({ data: categories }, highestCount)

  const chooseRandom = () => {
    const rnd = Math.round(Math.random() * filteredList.length)
    const chkExist = names.findIndex(name => name === filteredList[rnd]?.name)
    if (chkExist === -1 && filteredList[rnd]?.name) {
      setNames(prev => [...prev, filteredList[rnd]?.name])
    }
  }

  const chck = (nm: string) => {
    const chk = names.findIndex(name => name === nm)
    if (chk === -1 && names[0] !== undefined && nm !== "Beef") {
      setNames(prev => [...prev, item.name])
    }
  }

  const removeDuplicate = () => {
    const filtered = names.filter(function (item, pos) {
      return names.indexOf(item) == pos;
    })

    setNames(filtered)
  }

  useEffect(() => {
    item?.name !== undefined && chck(item.name)
  }, [item])

  useEffect(() => {
    names.length < 4 && removeDuplicate()
    filteredList.length && names.length < 4 && chooseRandom()
  }, [names, filteredList])

  return { names }
}
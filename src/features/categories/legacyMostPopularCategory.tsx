import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks"
import { useToGetHighestCount, useToGetRandomItem } from "../../hooks/forComponents";
import { CategoriesType, CategoryItemType } from "./categoriesSlice";
import { useEffect, useState } from "react";
// import { CategoryItemType } from "./categoriesSlice";

export const MostPopularCategory = () => {
  const [names, setNames] = useState<string[]>([])

  const addToList = (item: string) => setNames(prev => {
    console.log(item, "NEW ITEM!!")
    const check = checkNameIfExist(item)
    return check ? prev : [...prev, item]
  })

  const checkNameIfExist = (item: string) => {
    const found = names.find(name => name === item)
    if (found) {
      console.log("exists!!", item, names)
      return true
    }
    console.log("dosnt exists!!", names)
    return false
  }

  // names.length < 4 && useToAddNameToList({addToList, checkNameIfExist})

  // const runThis = useToAddNameToList({addToList, checkNameIfExist})

  // useEffect(() => {
  //   names.length < 3 && runThis
  // }, [names])

  // const renderPopular = () => names.map(name => <p key={name}>{name} {names.length}</p>)

  return (
    <div>
      <h2>MostPopulatCategory</h2>
      {/* <RenderCategory list={categories} name={name || "Beef"} /> */}
      <div className="flex gap-4">
        {/* {names.length < 4 ? renderPopular() : null} */}
        <ShowCategory itemName={names[0]} addToList={addToList} checkNameIfExist={checkNameIfExist} />
        <ShowCategory itemName={names[1]} addToList={addToList} checkNameIfExist={checkNameIfExist} />
        <ShowCategory itemName={names[2]} addToList={addToList} checkNameIfExist={checkNameIfExist} />
        {/* <ShowCategory addToList={addToList} checkNameIfExist={checkNameIfExist} />
        <ShowCategory addToList={addToList} checkNameIfExist={checkNameIfExist} />
        <ShowCategory addToList={addToList} checkNameIfExist={checkNameIfExist} /> */}
      </div>
    </div>
  )
}

type ShowCategoryPropsType = {
  addToList: (item: string) => void,
  checkNameIfExist: (item: string) => boolean,
  category: string,
  itemName?: string
}

type HookPropsType = Omit<ShowCategoryPropsType, "category">

const useToAddNameToList = (props: HookPropsType) => {
  const {addToList, checkNameIfExist} = props

  const categories = useAppSelector(state => state.categories.list);

  const { highestCount } = useToGetHighestCount({ data: categories })

  let { item } = useToGetRandomItem({ data: categories }, highestCount)

  console.log(item, "CATEGORY RANDO")

  if (item?.name && !checkNameIfExist(item.name)) {
    addToList(item.name)
  }
}

type CategoryProps = Omit<ShowCategoryPropsType, "category">

const ShowCategory = ({ addToList, checkNameIfExist, itemName }: CategoryProps) => {
  const categories = useAppSelector(state => state.categories.list);

  const { highestCount } = useToGetHighestCount({ data: categories })

  let { item } = useToGetRandomItem({ data: categories }, highestCount)

  console.log(item, "CATEGORY RANDO")

  if (item?.name) {
    addToList(item.name)
    // return <RenderCategory list={categories} name={item?.name} />
  } 

  // if (item?.name && !checkNameIfExist(item?.name)) {
  //   addToList(item.name)
  //   // return <RenderCategory list={categories} name={item?.name} />
  // } 
  // else return

  // return <RenderCategory list={categories} name={category} />
  // return item?.name && !checkNameIfExist(item?.name) ? <RenderCategory list={categories} name={item?.name} /> : null
  return <RenderCategory list={categories} name={itemName || item?.name} />
}

// const ShowCategory = ({ addToList, checkNameIfExist, category }: ShowCategoryPropsType) => {
//   const categories = useAppSelector(state => state.categories.list);


//   const { highestCount } = useToGetHighestCount({ data: categories })

//   let { item } = useToGetRandomItem({ data: categories }, highestCount)

//   console.log(item, "CATEGORY RANDO")

//   if (item?.name && !checkNameIfExist(item.name)) {
//     addToList(item.name)
//   } else return

//   return <RenderCategory list={categories} name={category} />
//   // return <RenderCategory list={categories} name={name || "Beef"} />
// }

const RenderCategory = ({ list, name }: { list: CategoryItemType[], name: string }) => {
  const findCategory = list.find(item => item.name === name)

  // const {imgSrc} = findCategory
  return (
    <Link to={`/categories/${name}`}>
      <h2>{name}</h2>
      <img src={findCategory?.imgSrc} alt={name} />
    </Link>
  )
}

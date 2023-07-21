import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks";
import { useToGetHighestCount, useToGetRandomItem } from "../../hooks/forComponents";

export const MostPopularCategory = () => {
  const [names, setNames] = useState<string[]>([]);

  const categories = useAppSelector(state => state.categories.list)

  const { highestCount } = useToGetHighestCount({ data: categories })

  const { item, filteredList } = useToGetRandomItem({ data: categories }, highestCount)

  const chooseRandom = () => {
    const rnd = Math.round(Math.random() * filteredList.length)
    const chkExist = names.findIndex(name => name === filteredList[rnd].name)
    if(chkExist === -1 && filteredList[rnd]?.name) {
      // chck(filteredList[rnd].name)
      setNames(prev => [...prev, filteredList[rnd]?.name])
    }
  }

  // const runThis = () => {
  //   const idx = filteredList.findIndex(item => item.name === names[names.length - 1]);
  //   // setNames(prev => [...prev, filteredList[idx+1].name])
  //   chooseRandom()
  // }

  const chck = (nm: string) => {
    console.log("runing", nm, names.findIndex(name => name === nm))
    // setNames(prev => prev.findIndex(name => name === nm) ? prev : [...prev, nm])
    const chk = names.findIndex(name => name === nm)
    if(chk === -1 && names[0] !== undefined && nm !== "Beef") {
      setNames(prev => [...prev, item.name])
      // removeDuplicate()
    }
  }

  const removeDuplicate = () => {
    const filtered = names.filter(function (item, pos) {
      return names.indexOf(item) == pos;
    })

    setNames(filtered)
  }

  useEffect(() => {
    // item?.name !== undefined && setNames(prev => [...prev, item.name])
    item?.name !== undefined && chck(item.name)
    // item?.name !== undefined && removeDuplicate()
    // removeDuplicate()
  }, [item])

  const runThis = useAddOrNotToList(names, setNames)

  useEffect(() => {
    names.length < 4 && removeDuplicate()
    filteredList.length && names.length < 4 && chooseRandom()
    // filteredList.length && runThis
  }, [names, filteredList])

  console.log(names, "names!!")

  return (
    <div>MostPopularCategory - {highestCount} -- {names.length}</div>
  )
}


const useAddOrNotToList = (names: string[], setNames: React.Dispatch<React.SetStateAction<string[]>>) => {
  const categories = useAppSelector(state => state.categories.list)

  const { highestCount } = useToGetHighestCount({ data: categories })

  const { item, filteredList } = useToGetRandomItem({ data: categories }, highestCount)

  const chooseRandom = () => {
    const rnd = Math.round(Math.random() * filteredList.length)
    const chkExist = names.findIndex(name => name === filteredList[rnd].name)
    if(chkExist === -1 && filteredList[rnd]?.name) {
      // chck(filteredList[rnd].name)
      setNames(prev => [...prev, filteredList[rnd]?.name])
    }
  }

  useEffect(() => {
    // names.length < 4 && removeDuplicate()
    filteredList.length && names.length < 4 && chooseRandom()
  }, [names, filteredList])
}











// import { useEffect, useState } from "react"

// import { DataType, useToGetHighestCount, useToGetRandomItem } from '../../hooks/forComponents'
// import { useAppSelector } from "../../hooks";

// export const MostPopularCategory = () => {
//   const [names, setNames] = useState<string[]>([]);

//   const categories = useAppSelector(state => state.categories.list)

//   const { highestCount } = useToGetHighestCount({ data: categories })

//   const addToList = (nm: string) => setNames(prev => [...prev, nm])

//   useEffect(() => {
//     setNames([])
//     // Once()
//   }, [])

//   const runThis = useForTesting({ data: categories }, highestCount, names, addToList)

//   // const Once = () => {
//   //   for(let key = 0; key < 4; key++) {
//   //     runThis
//   //   }
//   // }

//   useEffect(() => {
//     names.length < 4 && runThis
//   }, [names])

//   return (
//     <div>MostPopularCategory - highestCount: {highestCount} -- {names.length} </div>
//   )
// }

// const useForTesting = (list: DataType, highestCount: number, names: string[], addToList: (nm: string) => void) => {
//   const filteredList = list.data.filter(item => item.count === highestCount)

//   const [rando, setRando] = useState<number>(0)

//   // console.log(list.data, "!!!!", filteredList.length, highestCount, filteredList[rando], )

//   useEffect(() => {
//     if (filteredList.length && !rando && names.length < 3) {
//       setRando(Math.round(Math.random() * filteredList.length))
//     }
//   }, [rando, names])

//   const chkFirst = () => names.findIndex(name => name === filteredList[rando]?.name)

//   if (filteredList[rando]?.name && chkFirst() !== -1) {
//     console.log("FUUUUUU", filteredList[rando]?.name, names, chkFirst())
//     // return {}
//   } else {
//     console.log("OKKKKKKKKKKKKK", chkFirst(), names)
//     addToList(filteredList[rando].name)
//     // return { item: filteredList[rando], filteredList }
//   }

//   // console.log("WHHWWHWHWHH", chkFirst())

//   // return { item: filteredList[rando], filteredList }
// }

// // const useRun = (names: string[], list: DataType ) => {
// //   const chkFirst = () => names.findIndex(name => name === filteredList[rando].name)

// //   if (chkFirst() !== -1) {
// //     console.log("FUUUUUU", filteredList[rando]?.name, names, chkFirst())
// //     return {}
// //   } else {
// //     console.log("OKKKKKKKKKKKKK", chkFirst(), names)
// //     addToList(filteredList[rando].name)
// //     return { item: filteredList[rando], filteredList }
// //   }
// // }
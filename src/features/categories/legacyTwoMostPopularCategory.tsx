import { useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks'
import { useToGetHighestCount, useToGetRandomItem } from '../../hooks/forComponents'


export const MostPopularCategory = () => {
  const [count, setCount] = useState<string[]>([]);
  // const increaseCount = (nm: string) => {
  //   const chk = count.findIndex(item => item === nm)
  //   if(chk === -1) {
  //     setCount(prev => [...prev, nm])
  //   }
  // }

  const addToList = (nm:string) => setCount(prev => [...prev, nm])

  // const timerCount = () => {
  //   const timer = setTimeout(increaseCount, 990)
  //   return () => clearTimeout(timer)
  // }
  // useEffect(() => {
  //   // count.length < 5 && timerCount()
  //   item?.name && count.length < 5 && increaseCount(item.name)
  // }, [count, item])

  const runThis = useAddToList(count, addToList)

  const runFiveTimes = () => {
    for(let k = 0; k < 2; k++) {
      
    }
  }

  useEffect(() => {
    
  }, [count])

  useEffect(() => {
    setCount([])
  }, [])

  console.log(count, "HWHWHWHWHWHW")
  
  return (
    <div>
      MostPopularCategory - {count.length}
      {/* <ShowCategory 
        // addToList={increaseCount} 
        addToList={addToList}
        count={count} 
      /> */}
    </div>
  )
}

const useAddToList = (count: string[], addToList: (nm:string) => void) => {
  const categories = useAppSelector(state => state.categories.list)
  
  const { highestCount } = useToGetHighestCount({ data: categories })

  let { item, filteredList } = useToGetRandomItem({ data: categories }, highestCount)

  const chkFirst = (nm: string) => {
    const chk = count.findIndex(item => item === nm)
    if(chk === -1) {
      addToList(nm)
      // setCount(prev => [...prev, nm])
    }
  }

  useEffect(() => {
    // count.length < 5 && timerCount()
    item?.name && count.length < 5 && chkFirst(item.name)
  }, [count, item])
}

const ShowCategory = ({count, addToList}:{count: string[], addToList: (nm:string) => void}) => {
  const categories = useAppSelector(state => state.categories.list)
  
  const { highestCount } = useToGetHighestCount({ data: categories })

  let { item, filteredList } = useToGetRandomItem({ data: categories }, highestCount)

  const chkFirst = (nm: string) => {
    const chk = count.findIndex(item => item === nm)
    if(chk === -1) {
      addToList(nm)
      // setCount(prev => [...prev, nm])
    }
  }

  useEffect(() => {
    // count.length < 5 && timerCount()
    item?.name && count.length < 5 && chkFirst(item.name)
  }, [count, item])

  return ""
}


// export const MostPopularCategory = () => {
//   const [names, setNames] = useState<string[]>([])

//   const categories = useAppSelector(state => state.categories.list)
  
//   const { highestCount } = useToGetHighestCount({ data: categories })

//   let { item, filteredList } = useToGetRandomItem({ data: categories }, highestCount)

//   console.log(names, "!!", filteredList)

//   // const addOrNotToList = () => {
//   //   filteredList.forEach(item => {
//   //     const chk = names.findIndex(name => item.name === name)
//   //     console.log(item.name, chk, ">!>!>!>!>", chk === -1 && names.length < 4)
//   //     if(chk === -1 && names.length < 4) {
//   //       setNames(prev => [...prev, item.name])
//   //     }
//   //   })
//   // }

//   // const runThis = () => {
//   //   const timer = setTimeout(() => {
//   //     if(names.length === 3) {
//   //       clearTimeout(timer)
//   //     } else {
//   //       addOrNotToList()
//   //     }
//   //   }, 2000)
//   // }

//   const addOrNotToList = (nm:string) => {
//     const chk = names.findIndex(name => name === nm)
//     if(chk === -1) {
//       setNames(prev => [...prev, nm])
//       console.log("running", names.length)
//     }
//   }

//   useEffect(() => {
//     // runThis()
//     item?.name && names.length < 4 && addOrNotToList("ab")
//     names.length < 4 && console.log("running >>>>", names.length)
//   }, [names])

//   useEffect(() => {
//     setNames([])
//   }, [])

//   return (
//     <div>MostPopularCategory - {item?.name} - {names.length}</div>
//   )
// }

// export const MostPopularCategory = () => {
//   const [names, setNames] = useState<string[]>([])

//   const categories = useAppSelector(state => state.categories.list)
  
//   const { highestCount } = useToGetHighestCount({ data: categories })

//   let { item } = useToGetRandomItem({ data: categories }, highestCount)

//   const addOrNotToList = () => {
//     const idx = item?.name && names.findIndex(name => name == item.name)
//     if(idx === -1 && item.name) {
//       setNames(prev => [...prev, item.name])
//       console.log("running!!", idx, item.name)
//     } else {
//       console.log("WTFFFFFF")
//     }
//     // console.log("running!!", idx, item.name)
//     // return idx
//   }

//   useEffect(() => {
//     item.name && names.length<1 && addOrNotToList()
//   }, [names, item])

//   console.log(names, "!!")

//   return (
//     <div>MostPopularCategory - {item?.name}</div>
//   )
// }

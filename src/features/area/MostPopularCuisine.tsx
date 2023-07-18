import { useEffect, useState } from "react";
import { useToGetCuisines, useToGetHighestCountedList } from "../../hooks/forComponents"

export const MostPopularCuisine = () => {
    const cuisines = useToGetCuisines()
    let highestCount = 0;

    cuisines.forEach(item => item.count > highestCount ? highestCount = item.count : null)
    
    const filteredList = cuisines.filter(item => item.count === highestCount)

    const [rando, setRando] = useState<number>(0)

    useEffect(() => {
        if (filteredList.length) {
            setRando(Math.round(Math.random() * filteredList.length))
        }
    }, [filteredList, rando])

    // re-think this custom hook
    // const {filteredList, rando} = useToGetHighestCountedList(cuisines)
    return (
        <div>MostPopularCuisine -- {rando} -- {filteredList[rando]?.name}</div>
    )
}

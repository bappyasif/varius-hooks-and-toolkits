import { Link } from "react-router-dom"
import { useToGetCuisines, useToGetHighestCount, useToGetRandomItem } from "../../hooks/forComponents"

export const MostPopularCuisine = () => {
    const cuisines = useToGetCuisines()

    const { highestCount } = useToGetHighestCount({ data: cuisines })

    const { item } = useToGetRandomItem({ data: cuisines }, highestCount)

    console.log(item, "CUISINE RANDO")

    let name = ""

    if(item) {
        name = item.name
    }

    return (
        <div>
            MostPopularCuisine
            {/* <Link to={`cuisines/${filteredList[rando]?.name}`}>{filteredList[rando].name}</Link> */}
            {name ? <Link to={`cuisines/${name || "Thai"}`}>{name || "Thai"}</Link> : null}
        </div>
    )
}
import { Link } from "react-router-dom"
import { useToGetCuisines, useToGetFourRandomItems } from "../../hooks/forComponents"

export const MostPopularCuisine = () => {
    const cuisines = useToGetCuisines()

    const {names} = useToGetFourRandomItems(cuisines)

    const renderContent = (
        names.map(name => {
            return (
                <Link to={`cuisines/${name || "Thai"}`}>{name || "Thai"}</Link>
            )
        })
    )

    return (
        <div>
            MostPopularCuisine

            <div className="flex gap-4">{renderContent}</div>
        </div>
    )
}

// export const MostPopularCuisine = () => {
//     const cuisines = useToGetCuisines()

//     const { highestCount } = useToGetHighestCount({ data: cuisines })

//     const { item } = useToGetRandomItem({ data: cuisines }, highestCount)

//     console.log(item, "CUISINE RANDO")

//     let name = ""

//     if(item) {
//         name = item.name
//     }

//     return (
//         <div>
//             MostPopularCuisine
//             {/* <Link to={`cuisines/${filteredList[rando]?.name}`}>{filteredList[rando].name}</Link> */}
//             {name ? <Link to={`cuisines/${name || "Thai"}`}>{name || "Thai"}</Link> : null}
//         </div>
//     )
// }
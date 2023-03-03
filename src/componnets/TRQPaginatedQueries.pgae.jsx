import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"

const fetchColors = (pageNumber) => axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`)

// with paginations
export const TRQPaginatedQueriesPgae = () => {
    const [pageNumber, setPageNumber] = useState(1)

    const { isError, isLoading, data: colors, error, isFetching } = useQuery({
        queryKey: ["colors", pageNumber],
        queryFn: () => fetchColors(pageNumber),
        // as upon each pageNumber changes it will be considered as new queries, by keeping previous data from last successfull fetch it will remove "loading to render state" changes and rather 
        // when data is fetched in background previous data will be shown andwhen new data is ready it swaps with old data thus removing loding marker on view
        // this becomes very handy when we need to keep layout intact for any page, cause it will not cause any layout shifting while data is being fetched rather will be shown previous data until new data is ready
        keepPreviousData: true
    })
    if (isError) return <h1>Error Occured....{error.message}</h1>
    if (isLoading) return <h1>Data Loading....</h1>
    return (
        <main>
            <h1>TRQPaginatedQueriesPgae</h1>
            {colors.data.map(color => <h2 key={color.label}>{color.label}</h2>)}
            <section>
                <h2><button disabled={pageNumber === 1 ? true : false} onClick={() => setPageNumber(page => page - 1)}>Previous Page</button></h2>
                <h2><button disabled={pageNumber === 4 ? true : false} onClick={() => setPageNumber(page => page + 1)}>Next Page</button></h2>
            </section>
            {isFetching ? "fetching data in background...." : ""}
        </main>
    )
}


// displays all available colors, no paginations

// const fetchColors = () => axios.get("http://localhost:4000/colors")

// export const TRQPaginatedQueriesPgae = () => {
//     const { isError, isLoading, data: colors, error } = useQuery({
//         queryKey: ["colors"],
//         queryFn: fetchColors
//     })
//     if (isError) return <h1>Error Occured....{error.message}</h1>
//     if (isLoading) return <h1>Data Loading....</h1>
//     return (
//         <main>
//             <h1>TRQPaginatedQueriesPgae</h1>
//             {colors.data.map(color => <h2 key={color.label}>{color.label}</h2>)}
//         </main>
//     )
// }

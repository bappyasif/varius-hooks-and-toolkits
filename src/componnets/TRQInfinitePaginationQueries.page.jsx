import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import { Fragment } from "react"

const fetchColors = ({ pageParam = 1 }) => axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`)

export default function TRQInfinitePaginationQueriesPage() {
    const {
        isError, isLoading, data: colors, error,
        hasNextPage, fetchNextPage, isFetching, isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ["colors"],
        queryFn: fetchColors,
        getNextPageParam: (_lastPage, pages) => {
            if (pages.length < 4) {
                // return pages.length++
                return pages.length + 1
            } else {
                return undefined
            }
        }
    })
    if (isError) return <h1>Error Occured....{error.message}</h1>
    if (isLoading) return <h1>Data Loading....</h1>
    return (
        <main>
            <h1>TRQInfinitePaginatedQueriesPgae</h1>
            <section>
                {
                    colors?.pages?.map((group, idx) => {
                        return (
                            <Fragment key={idx}>
                                {
                                    group?.data.map(color => <h2 key={color.id}>{color.id} -- {color.label}</h2>)
                                }
                            </Fragment>
                        )
                    })
                }
            </section>
            <section>
                <h3><button onClick={fetchNextPage} disabled={!hasNextPage}>Show More</button></h3>
                {/* <h3><button onClick={fetchNextPage} disabled={hasNextPage ? false : true}>Show More</button></h3> */}
                {/* {hasNextPage ? <h3><button disabled={hasNextPage ? true : false}>Show More</button></h3> : null} */}
            </section>
            {(isFetching && !isFetchingNextPage) ? <h4>Fetching Data....</h4> : null}
        </main>
    )
}

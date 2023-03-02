import { Link } from "react-router-dom"
import useSuperHeroesData from "../hooks/useSuperHeroesData"

// will be using tanstack react query for same data fetching and rendering as we did in traditional way in "/super-heroes" page
function TRQSuperheroesPage() {
    const onSuccess = (data) => {
        console.log("successfull fetching", data)
    }

    const onError = (error) => {
        console.log("error while data fetching", error)
    }
    
    // using reusable custom hook, so that when needed same kind of usecase of query we can simply use that instead of code duplication
    const { isLoading, data, isError, error, isFetching, refetch } = useSuperHeroesData(onError, onSuccess, "super-heroes")
    
    if (isLoading || isFetching) return <h2>Loading....</h2>
    
    if (isError) return <h2>{error.message}</h2>

    console.log(isLoading, isFetching, "loading <=> fetching")

    return (
        <main>
            <h1>TRQSuperheroesPage</h1>
            {/* {(isLoading || isFetching) ? <h4>Loading Data....</h4> : null} */}
            {isFetching ? <h4>Fetching Data....</h4> : null}
            <h2><button onClick={refetch}>Fetch Heroes</button></h2>
            {
                data?.data.map(item => <h2 key={item.id}><Link to={`/super-heroes-trq/${item.id}`}>{item.name}</Link></h2>)
                // data?.map(item => <h2 key={item}>{item}</h2>)
            }
        </main>
    )
}

export default TRQSuperheroesPage
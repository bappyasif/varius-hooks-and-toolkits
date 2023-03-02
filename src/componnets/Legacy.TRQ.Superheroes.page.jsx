import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"

// taking query function outside of inline usecase
const fetchSuperheroes = () => axios.get("http://localhost:4000/superheroes")

// will be using tanstack react query for same data fetching and rendering as we did in traditional way in "/super-heroes" page
function TRQSuperheroesPage() {
    const [duration, setDuration] = useState(2000);

    const onSuccess = (data) => {
        if(data.data.length === 5) setDuration(false)
        console.log("successfull fetching", data)
    }
    const onError = (error) => {
        if(error) setDuration(false)
        console.log("error while data fetching", error)
    }
    const { isLoading, data, isError, error, isFetching, refetch } = useQuery({
        queryKey: ["super-heroes"],
        queryFn: fetchSuperheroes,
        // queryFn: () => axios.get("http://localhost:4000/superheroes")
        
        // we can also change default chahe time duration of 5 minutes to anything of our liking
        // now cahce data will be removed after being stale and un-focused / in-view after this given time of our choosing
        // which means after this period of time if we come back to this route, data will be re-fetched to begin with thus "loading" ui will show up as it would have for initial request
        // cache time is set in millis
        // cacheTime: 4000

        // stale time make network request to wait beofe it will fetch for data
        // during this defined stale time "already fetched" data will be considered as "fresh"
        // only when stale time is "over" then new network request is sent to "fetch" if there is any new data or changes in dataset to render and sync accordingly
        // stale default time is 0 millis, thats why when ever we visited that route, it immediately made a network request to fetch for new data
        // staleTime: 30000,

        // when refetchOPnMopunt is true (default behavior) it will make a network request if "stale time" allows it
        // when refetchOnMount is false it will not make any new network request upon re-visting this route after initial fetching
        // when refetchOnMount is set to "always" even if it conflicts with "stale" duration time, it will ALWAYS refertch data on "re-visit" or any "sub-sequest" visits
        // refetchOnMount: "false || true || 'always'"
        // refetchOnMount: false,

        // refetchOnWindowFocus, when set to true (default),it initiates a data re-fetch, thus help with data rendering in-sync with any data changes being made between now and then
        // refetchingOnWindowFocus will give preference to staleTiome before actually making any netwrok request
        // refetchingOnWindowFocus will ALWAYS refetch data irrespective of staleTime
        // refetchOnWindowFocus: "true || false || 'always'"
        // refetchOnWindowFocus: true,

        // refetchInterval ensures of data fetching in user set interval period, regardless of constraints or configurations of other fetching related configs
        // this process of refetching on regular interval known as Polling, its default value is false but can be changed and set to a number value to represent amount of millis
        // this is very helpful for sites and pages where regular updates takes place, so keeping up with that Polling can be very fitting and useful
        // refetchInterval: duration,

        // there is a catch though, when window looses its focus Polling or automatic refetcing would stop
        // to have it continuously Poll or refettched data even when window is out of focused, we will have to use this config
        // refetchIntervalInBackground: true,

        // to stop data from fetching upon on component mount then we will have to set "enabled" to false
        // this is handy when we need to fetch data based on User Event such as onclick
        // enabled: false

        // this runs when fetch query was successfull, to allow side effects to take place, or whets needs to be done after that
        // onSuccess: onSuccess,

        // this runs when fetch query was failed or encountered an error, to allow side effects to take place, or whets needs to be done after that
        // onError: onError,

        // when we need re structure our dataset before rendering, we can do so by configuring this "select" option
        // this "select" options will take "data" recieved from fetching as its argument and then in its function we can re structure as we see it fits for our requirements
        // this will change our data transformation according to this defined function, so we need to adjust our rendering function according to it
        // we can transform entire dataset or just parts of it, depending our requirements we can re structure it before rendering
        select: data => data.data.map(item => item.name)
    })
    // once data is fetched and when coming back to it in any subsequent times it will always look for data into "cache" first
    // when same data is found in "cache" it will not turn "isLoading" to true rather show them on page
    // meanwhile this is happening, react query will "re-fetch" data in background, if there is any new data or changes took place between now and then, when found any data is updated to render with "new dataset"
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
                // data?.data.map(item => <h2 key={item.name}>{item.name}</h2>)
                data?.map(item => <h2 key={item}>{item}</h2>)
            }
        </main>
    )
}

export default TRQSuperheroesPage
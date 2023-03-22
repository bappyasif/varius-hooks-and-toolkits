import React from 'react'
import useSWR from "swr";

const fetcher = async () => {
    const response = await fetch("http://localhost:4000/dashboard");
    const data = await response.json();
    return data
}

const DashboardSwr = () => {
    // const { data, isLoading, error } = useSWR("dashboard", fetcher, {revalidateOnFocus: true, revalidateIfStale: true})
    const { data, isLoading, error } = useSWR("dashboard", fetcher)
    if (isLoading) {
        return <h2>Data Loading....</h2>
    } else if (error) {
        return <h2>An Error Has Occured.... {error}</h2>
    }
    
    return (
        <>
            <div>DashboardPage</div>
            <p>Posts: {data?.posts}</p>
            <p>Likes: {data?.likes}</p>
            <p>Followers: {data?.followers}</p>
            <p>Following: {data?.following}</p>
        </>
    )
}

export default DashboardSwr
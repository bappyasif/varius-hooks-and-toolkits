import React, { useEffect, useState } from 'react'

/**
 * 
 * client side data fetching
 * when data is private
 * when seo is not required
 * data rendering is totally user specific
 * data does not need to be pre-rendered
 */

const DashboardPage = () => {
    const [isLoading, setIsLoading] = useState(true)
    // const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(null)
    const fetchData = () => {
        // setIsLoading(true);
        fetch("http://localhost:4000/dashboard")
            .then(resp => resp.json())
            .catch(err => console.log(err, "request error!!"))
            .then(dataset => setData(dataset))
            .catch(err => console.log(err, "response error!!"))
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        // setIsLoading(true);
        fetchData()
    }, [])

    if (isLoading) {
        return <h2>Loading Data....</h2>
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

export default DashboardPage
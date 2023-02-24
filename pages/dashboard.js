import React, { useEffect, useState } from 'react'

function Dashboard() {
    let [isLoading, setIsLoading] = useState(true)
    let [data, setData] = useState(null)

    const fetchDashboardData = () => {
        fetch("http://localhost:4000/dashboard")
            .then(resp => resp.json())
            .catch(err => console.log("request error", err))
            .then(data => {
                if (data) {
                    setData(data)
                    console.log(data, "data!!")
                    setIsLoading(false)
                }
            })
            .catch(err => console.log("response error", err))
    }

    useEffect(() => {
        fetchDashboardData()
    }, [])

    return (
        <div>
            {
                isLoading
                    ? <h2>Loading....</h2>
                    :
                    <>
                        <h1>Dashboard</h1>
                        <h2>Posts -- {data.posts}</h2>
                        <h2>Likes -- {data.likes}</h2>
                        <h2>Followers -- {data.followers}</h2>
                        <h2>Following -- {data.following}</h2>
                    </>
            }
        </div>
    )
}

export default Dashboard
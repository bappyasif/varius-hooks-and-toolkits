import { useSession, getSession, signIn } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

function Dashboard() {
    let [isLoading, setIsLoading] = useState(true)
    let [data, setData] = useState(null)
    let { data: session, status } = useSession();

    console.log(session, status, "<><>");

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

    const fetchUserSessionData = () => {
        getSession().then(session => {
            if(!session) {
                signIn()
            } else {
                setIsLoading(false)
            }
        })
    }

    useEffect(() => {
        fetchDashboardData();
        // invoking getSession() will cause app to fetch user session data
        // but if we choose to use SessionProvider nextjs context and useSession hook instead network calls would get reduced thus improving app performance and no page flickering while data fetching is in progress
        fetchUserSessionData();
    }, [])

    return (
        <div>
            {
                isLoading
                    ? <h2>Loading....</h2>
                    :
                    status === "authenticated"
                        ?
                        <>
                            <h1>Dashboard</h1>
                            <h2>Posts -- {data.posts}</h2>
                            <h2>Likes -- {data.likes}</h2>
                            <h2>Followers -- {data.followers}</h2>
                            <h2>Following -- {data.following}</h2>
                        </>
                        : null
            }
        </div>
    )
}

export default Dashboard
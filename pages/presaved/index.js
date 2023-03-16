import { PresavedFilteredNewsUI } from '@/components/PresavedFilteredNewsUI'
import { request_internal } from '@/utils/axios-interceptors'
import { useQuery } from '@tanstack/react-query'
import { getSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

const PresavedCustomNewsFilters = () => {
    const [user, setUser] = useState(null)

    const extractSessionData = () => {
        getSession().then(data => setUser(data?.user)).catch(err => console.log(err))
    }
    const { data: presavedData } = useQuery({
        queryKey: ["presaved custom filters of", `${user?.name}`],
        queryFn: () => {
            return request_internal({ url: "customNews", method: "get" })
        },
        enabled: user ? true : false,
    })

    useEffect(() => {
        extractSessionData()
    }, [])
    
    console.log(presavedData?.data, presavedData?.data[user?.name])

    return (
        <main>
            <h1>PresavedFilters</h1>
            <PresavedFilteredNewsUI data={presavedData?.data[user?.name]} />
        </main>
    )
}

export default PresavedCustomNewsFilters
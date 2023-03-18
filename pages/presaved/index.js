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
            <div className='bg-slate-400 opacity-90 pb-1'>
                <h1 style={{ letterSpacing: "2px", wordSpacing: "4px" }} className='text-2xl my-1 text-center xs:hidden sm:block'>You Currently Have These Filters Saved. Please Click Away To Read News From These Filters</h1>
                <h1 style={{ letterSpacing: "3px", wordSpacing: "4px" }} className='text-2xl my-1 text-center xs:block sm:hidden'>You Currently Have These Filters Saved.</h1>
            </div>
            <PresavedFilteredNewsUI data={presavedData?.data[user?.name]} user={user?.name} entireDataset={presavedData?.data} />
        </main>
    )
}

export default PresavedCustomNewsFilters
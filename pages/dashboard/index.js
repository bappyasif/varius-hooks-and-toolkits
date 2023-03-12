import { ListTopTracks } from '@/components/ListTopTracks'
import { useSession } from 'next-auth/react'
import React from 'react'

const DashboardView = () => {
    const {data: session, status} = useSession()

    if(status === "unauthenticated") {
      signIn()
    }
    
    return (
      <main className='flex flex-col'>
        <ListTopTracks />
        {/* <ListCityTopTracks /> */}
        {/* <RenderMenu /> */}
      </main>
    )
}

export default DashboardView
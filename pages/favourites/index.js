import { ListAllFavourites } from '@/components/ListAllFavourites'
import { request_internal } from '@/utils/axios-interceptors'
import { useQuery } from '@tanstack/react-query'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const ShowFavourites = () => {
    const {data: session, status} = useSession()

    if(status === "unauthenticated") {
      signIn()
    }

    const {data: favourites} = useQuery({
        queryKey: ["favourites songs"],
        queryFn: () => {
            return request_internal({url: "/favourites", method: "get"})
        }
    })
  return (
    <main>
        <h1 className='text-4xl'>ShowFavourites</h1>
        {
            favourites?.data?.length
            ?
            <ListAllFavourites data={favourites?.data} />
            :
            <h2 className='text-3xl py-4'>Currently Empty, Consider Adding some from <Link className='bg-blue-400 p-2 rounded-md' href={"/dashboard"}>Dashboard</Link></h2>
        }
    </main>
  )
}

export default ShowFavourites
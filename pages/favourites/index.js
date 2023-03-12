import { ListAllFavourites } from '@/components/ListAllFavourites'
import { request_internal } from '@/utils/axios-interceptors'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const ShowFavourites = () => {
    const {data: favourites} = useQuery({
        queryKey: ["favourites songs"],
        queryFn: () => {
            return request_internal({url: "/favourites", method: "get"})
        }
    })
  return (
    <main>
        <h1>ShowFavourites</h1>
        <ListAllFavourites data={favourites?.data} />
    </main>
  )
}

export default ShowFavourites
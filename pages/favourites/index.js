import { FavouritesGames } from '@/components/FavouritesGames'
import { axios_internal_api_request } from '@/utils/axios-interceptor'
import { useQuery } from '@tanstack/react-query'
import { signIn, useSession } from 'next-auth/react'
import React from 'react'

function FavouritesList() {
    const {data: session, status} = useSession()

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ["favourites", "games", "list"],
        queryFn: () => {
            return axios_internal_api_request({ url: "/favourites", method: "get" })
        }
    })
    
    if(status === "unauthenticated") {
        signIn()
    }

    console.log(data?.data, "favourites!!")
    
    return (
        status === "authenticated"
        ?
        <main>
            <h1>All Favourites Games List</h1>
            {isError ? <h2>Error Ocured....{error.message}</h2> : null}
            {isLoading ? <h2>Loading Data....</h2> : null}
            <FavouritesGames list={data?.data} />
        </main>
        : null
    )
}

export default FavouritesList
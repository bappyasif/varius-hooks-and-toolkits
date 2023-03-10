import { GamesWishlist } from '@/components/GamesWishlist'
import { axios_internal_api_request } from '@/utils/axios-interceptor'
import { useQuery } from '@tanstack/react-query'
import { signIn, useSession } from 'next-auth/react'
import React from 'react'

function WishlistedGames() {
    const { data: session, status } = useSession()

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ["wishlist", "games"],
        queryFn: () => axios_internal_api_request({ url: "/wishlist", method: "get" })
    })

    if (status === "unauthenticated") {
        signIn()
    }

    console.log(data?.data, "wishlist!!")
    return (
        status === "authenticated"
            ?
            <main>
                <h1>WishlistedGames</h1>
                {isError ? <h2>Error Ocured....{error.message}</h2> : null}
                {isLoading ? <h2>Loading Data....</h2> : null}
                {
                    data?.data.length
                        ?
                        <GamesWishlist list={data.data} />
                        :
                        <h2>List is Empty.... consider adding some....</h2>
                }
            </main>
            : null
    )
}

export default WishlistedGames
import { axios_internal_api_request } from '@/utils/axios-interceptor'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import { GoArchive } from 'react-icons/go'

export const FavouritesGames = ({ list }) => {
    const { data: session, status } = useSession()

    // if (status === "unauthenticated") {
    //     signIn()
    // }

    const renderList = () => list?.map(item => <RenderFavouriteGameData key={item.id} item={item} />)

    return (
        <main>
            <h1>List Of Favourites Games</h1>
            {renderList()}
        </main>
    )
}

const RenderFavouriteGameData = ({ item }) => {
    const { id, name, background_image, released } = item

    const clientQuery = useQueryClient()

    const removeFromFavouritesList = () => {
        return axios_internal_api_request({ url: `/favourites/${id}`, method: "delete" })
    }

    const { mutate } = useMutation({
        mutationKey: ["games", "favourites", "remove", `${id}`],
        mutationFn: removeFromFavouritesList,
        onSuccess: () => clientQuery.invalidateQueries(["favourites", "games", "list"])
    })

    const handleRemove = () => mutate()

    return (
        <article>
            <h2>{name}</h2>
            <Image src={background_image} alt={name} width={310} height={310} />
            <h2>Released Date -- {released}</h2>
            <button className='flex gap-6 items-center' onClick={handleRemove}><span>Remove</span> <GoArchive /></button>
        </article>
    )
}
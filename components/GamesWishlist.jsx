import { axios_internal_api_request } from '@/utils/axios-interceptor'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import React from 'react'
import { GoArchive } from 'react-icons/go'

export const GamesWishlist = ({ list }) => {
    const renderList = () => list?.map(item => <RenderWishlistGameData key={item.id} item={item} />)
    return (
        <main>
            <h1>List Of Wishlist Games</h1>
            {renderList()}
        </main>
    )
}


const RenderWishlistGameData = ({ item }) => {
    const { id, name, background_image, released } = item

    const clientQuery = useQueryClient()

    const removeFromWishlist = () => axios_internal_api_request({url: `/wishlist/${id}`, method: "delete"})

    const {mutate} = useMutation({
        mutationKey: ["games", "wishlist", `${id}`],
        mutationFn: removeFromWishlist,
        onSuccess: () => clientQuery.invalidateQueries(["wishlist", "games"])
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
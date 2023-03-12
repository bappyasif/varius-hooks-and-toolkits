import { request_internal } from '@/utils/axios-interceptors'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'

export const ListAllFavourites = ({ data }) => {
    const renderFavourites = () => data?.map(item => <RenderFavourite key={item.id} item={item} />)
    return (
        <section className='flex gap-4'>
            {
                data?.length
                    ?
                    renderFavourites()
                    :
                    <h2 className='text-3xl py-4'>Currently Empty, Consider Adding some from <Link className='bg-blue-400 p-2 rounded-md' href={"/dashboard"}>Dashboard</Link></h2>
            }

        </section>
    )
}

const RenderFavourite = ({ item }) => {
    const { subtitle, subject, id, image, url } = item

    const clientQuery = useQueryClient()

    const { mutate: removeFromList } = useMutation({
        mutationKey: ["remove from favourites songs"],
        mutationFn: () => {
            return request_internal({ url: `/favourites/${id}`, method: "delete" })
        },
        onSuccess: () => clientQuery.invalidateQueries(["favourites songs"])
    })

    return (
        <div className='flex flex-col gap-2 text-3xl px-6'>
            <div className='flex flex-col items-center' href={`/${id}`}>
                <h2>{subject}</h2>
                <img src={image} width={200} height={110} alt={subject} />
            </div>
            <button className='text-xl' onClick={removeFromList}>remove from playlist</button>
        </div>
    )
}

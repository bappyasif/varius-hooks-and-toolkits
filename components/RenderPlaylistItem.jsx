import { request_internal } from '@/utils/axios-interceptors'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'

export const RenderPlaylistItems = ({ items, listName }) => {

    const renderItems = () => items?.map((item, idx) => <RenderPlaylistItem key={idx} item={item} listName={listName} />)

    return (
        <section>
            <h2 className='text-2xl mb-2 bg-stone-400 w-fit px-4'>Songs List:</h2>
            <article className='flex gap-2 flex-wrap'>
                {renderItems()}
            </article>
        </section>
    )
}


const RenderPlaylistItem = ({ item, listName }) => {
    const { subtitle, subject, id, image, url } = item

    const clientQuery = useQueryClient()

    const { data: playlists } = useQuery({
        queryKey: ["playlists"],
        queryFn: () => {
            return request_internal({ url: "/playlists", method: "get" })
        }
    })

    const { mutate: removeFromList } = useMutation({
        mutationKey: ["remove song from playlist"],
        mutationFn: () => {
            const filtered = playlists?.data[listName].filter(item => item.id !== id)

            return request_internal({ url: "/playlists", method: "post", data: { ...playlists?.data, [listName]: filtered } })
        },
        onSuccess: () => clientQuery.invalidateQueries(["playlists"])
    })

    return (
        <div className='flex flex-col gap-2 text-3xl px-6'>
            <Link className='flex flex-col items-center' href={`/${id}`}>
                <h2>{subject}</h2>
                <img src={image} width={200} height={110} alt={subject} />
            </Link>
            <button className='text-xl' onClick={removeFromList}>Remove Song from playlist</button>
        </div>
    )
}
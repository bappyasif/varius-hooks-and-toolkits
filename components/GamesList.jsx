import { secrets } from '@/secrets'
import { rapid_external_axios_request } from '@/utils/axios-interceptor'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React from 'react'

export const GamesList = () => {
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["all-games"],
        queryFn: () => rapid_external_axios_request({url: `/games?key=${secrets.RAWG_API_KEY}`})
    })

    const renderGames = () => data?.data.results.map(item => <RenderGameDetails key={item.name} item={item} />)

  return (
    <section>
        <h1>All Games</h1>
        {renderGames()}
    </section>
  )
}

const RenderGameDetails = ({item}) => {
    const {id, background_image, rating, rating_top, name} = item
    
    return (
        <article>
            <h2>{name}</h2>
            <Image src={background_image} alt={name} width={240} height={330} />
        </article>
    )
}
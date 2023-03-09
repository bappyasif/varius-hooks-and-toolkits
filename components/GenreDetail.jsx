import { secrets } from '@/secrets'
import { rapid_external_axios_request } from '@/utils/axios-interceptor'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const GenreDetail = ({ id }) => {
    const { data } = useQuery({
        queryKey: ["games", "genre", `${id}`],
        queryFn: () => {
            return rapid_external_axios_request({ url: `./genres/${id}?key=${secrets.RAWG_API_KEY}` })
        }
    })

    console.log(data?.data, "!!")
    return (
        <main>
            <h1>GenreDetail</h1>
            {
                data?.data
                    ? <RenderGenreDetailData item={data.data} />
                    : null
            }
        </main>
    )
}

const RenderGenreDetailData = ({ item }) => {
    const { id, name, description, image_background } = item

    return (
        <>
            <article>
                <h2>{name}</h2>
                <Image src={image_background} width={330} height={270} alt={name} />
                <h3>{description}</h3>
            </article>
            <RenderGenreSpeceficGames id={id} />
        </>
    )
}

const RenderGenreSpeceficGames = ({ id }) => {
    const { data } = useQuery({
        queryKey: ["game", "genre", `${id}`],
        queryFn: () => {
            return rapid_external_axios_request({ url: `/genres?key=${secrets.RAWG_API_KEY}` })
        }
    })

    // const games = data?.data.results.filter(item => item.id === id ? item.games : null)
    const games = data?.data.results.filter(item => item.id === id ? item : null)[0].games
    console.log(games, "games!!")

    const renderGames = () => games?.map(item => <RenderGameInfos key={item.name} item={item} />)

    return (
        <>
            <h1>Some Of This Genre Specefic Games</h1>
            <section className='flex gap-4'>
                {renderGames()}
            </section>
        </>
    )
}

const RenderGameInfos = ({ item }) => {
    const { id, name } = item
    const { data } = useQuery({
        queryKey: ["genre", "game", `${id}`],
        queryFn: () => {
            return rapid_external_axios_request({ url: `/games/${id}?key=${secrets.RAWG_API_KEY}` })
        }
    })

    return (
        <figure>
            <Link href={`/game/${id}`}>
                <Image className='h-2/3' src={data?.data.background_image} width={310} height={270} alt={name} />
                <figcaption>{data?.data.name}</figcaption>
            </Link>
        </figure>
    )
}
import { getSession, signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export const GameGenres = ({ data }) => {
    const [loading, setLoading] = useState(true)
    
    const checkSession = () => {
        getSession()
        .then(session => {
            if(!session) {
                signIn()
            } else {
                setLoading(false)
            }
        })
    }
    
    useEffect(() => {
        checkSession()
    }, [])

    const renderGenres = () => data?.map(item => <RenderGenre key={item.id} item={item} />)
    
    return (
        <>
            <h1>GameGenres</h1>
            <section className='flex flex-row flex-wrap justify-start gap-4'>
                {renderGenres()}
            </section>
        </>
    )
}

const RenderGenre = ({ item }) => {
    const { name, id, image_background } = item

    return (
        <article>
            <Link href={`/genres/${id}`}>
                <h2>{name}</h2>
                <Image className='h-2/3' src={image_background} width={400} height={310} />
            </Link>
        </article>
    )
}

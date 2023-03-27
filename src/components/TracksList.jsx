import Link from 'next/link';
import React, { useContext, useEffect } from 'react'
import { AppContext } from './appContext'

export const TracksList = ({ data }) => {
    console.log(data, "DATA!!")
    const appCtx = useContext(AppContext);

    const updateDataInContext = () => appCtx.handleTopTracks(data)

    useEffect(() => {
        data?.length && updateDataInContext()
    }, [data])

    const renderTracks = () => (data || appCtx.topTracks)?.map(track => track?.images && <RenderTrackMinimalView key={track.key} track={track} />)

    return (
        <>
            <Link className='text-2xl bg-blue-400 p-2 rounded-lg' href={"/top-tracks"}>Choose Again Another Country</Link>
            <h2 className='text-2xl my-2'>TracksList</h2>
            <section className='flex flex-wrap gap-4 justify-evenly'>
                {renderTracks()}
            </section>
        </>
    )
}

const RenderTrackMinimalView = ({ track }) => {
    const { images, subtitle, title, key } = track
    const { background } = images

    return (
        <article className='w-1/4'>
            <Link className='text-xl' href={`/top-tracks/track-details/${key}`}>Click Here To See More Details</Link>
            <img src={background} width={400} height={400} />
            <p className='text-2xl break-words'>{title} -- {subtitle}</p>
        </article>
    )
}
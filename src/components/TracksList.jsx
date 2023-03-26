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
            <div>TracksList</div>
            <section>
                {renderTracks()}
            </section>
        </>
    )
}

const RenderTrackMinimalView = ({ track }) => {
    const { images, subtitle, title, key } = track
    const { background } = images

    return (
        <article>
            <Link href={`/top-tracks/track-details/${key}`}>See Details</Link>
            <img src={background} width={400} height={400} />
            <p>{title} -- {subtitle}</p>
        </article>
    )
}
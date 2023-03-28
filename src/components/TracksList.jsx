import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from './appContext'

export const TracksList = ({ data, countryCode }) => {
    // console.log(data, "DATA!!")
    const [tracksData, setTracksData] = useState([]);

    const appCtx = useContext(AppContext);

    // const updateDataInContext = () => appCtx.handleTopTracks(data)
    // const updateDataInContext = () => appCtx.handleTopTracks(data, countryCode)

    // useEffect(() => {
    //     data?.length && updateDataInContext()
    // }, [data])

    console.log(appCtx?.topTracks, "appCtx.topTracks", tracksData)
    const performAlreadyExistingTopTracksData = () => {
        appCtx?.topTracks.forEach(item => {
            console.log(item)
            const foundItem = Object.keys(item).findIndex(val => val == countryCode)
            if(foundItem !== -1) {
                setTracksData(Object.values(item)[0])
            }
        })
    }

    useEffect(() => {
        performAlreadyExistingTopTracksData()
    }, [])

    // const renderTracks = () => (data || appCtx.topTracks)?.map(track => track?.images && <RenderTrackMinimalView key={track.key} track={track} />)
    // const renderTracks = () => (data || appCtx.topTracks[countryCode])?.map(track => track?.images && <RenderTrackMinimalView key={track.key} track={track} />)
    const renderTracks = () => (data || tracksData)?.map(track => track?.images && <RenderTrackMinimalView key={track.key} track={track} />)

    return (
        <>
            <Link className='text-xl bg-blue-400 p-2 rounded-lg' href={"/top-tracks"}>Choose Again Another Country</Link>
            <h2 className='text-2xl bg-blue-200 my-4'>TracksList</h2>
            <section className='flex flex-wrap gap-4 justify-evenly'>
                {renderTracks()}
            </section>
        </>
    )
}

export const RenderTrackMinimalView = ({ track }) => {
    // console.log(track, "TRACK!!!!")
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
import { AppContext } from '@/components/appContext'
import { useFetchSearchData } from '@/hooks'
import React, { useContext, useEffect, useState } from 'react'
import { RenderTrackMinimalView } from "../../TracksList"

export const PrepareForDataRendering = ({ type, query, handleSearch, ready }) => {
    return (
        <>
            {type === "Track" && query ? <SearchTracks query={query} type={type} handleSearch={handleSearch} ready={ready} /> : null}
            {type === "Artist" && query ? <SearchArtists query={query} type={type} handleSearch={handleSearch} ready={ready} /> : null }
        </>
    )
}

const SearchArtists = ({query, type, handleSearch, ready}) => {
    const [dataset, setDataset] = useState([]);

    const appCtx = useContext(AppContext);

    const decideRefetching2 = () => decideRefetching(appCtx, ready, dataset, setDataset, type)

    console.log(query, type, ready);

    const data = useFetchSearchData("/search_artist", query, type, handleSearch, decideRefetching2)

    console.log(data, "DATA SEARCHED For Artist!!", dataset)

    useEffect(() => {
        data?.length && setDataset(data)
    }, [data])

    const renderDataset = () => dataset?.map(item => item?.artist && <RenderArtist item={item?.artist} />)

    return (
        <section className='flex justify-evenly gap-9 flex-wrap my-9'>
            {renderDataset()}
        </section>
    )
}

const RenderArtist = ({item}) => {
    const {adamid, avatar, name, weburl} = item

    return (
        <div key={adamid}>
            <img src={avatar} width={400} height={400} />
            <p className='text-2xl break-words'>{name}</p>
            <a className='bg-blue-200 h-fit px-2 py-1 rounded-sm text-2xl' href={weburl}>See More about {name}, Click Here....</a>
        </div>
    )
}

const decideRefetching = (appCtx, ready, dataset, setDataset, type) => {
    if (ready) {
        const found = appCtx?.searchedData?.find(item => item.type === type && item.query === query && item.data?.length)
        console.log(found, "FOUND!!", appCtx?.searchedData)
        if (found) {
            !dataset.length && setDataset(found?.data)
        }
        return found === undefined ? true : false
    } else {
        return false
    }
}

const SearchTracks = ({ query, type, handleSearch, ready }) => {
    const [dataset, setDataset] = useState([]);

    const appCtx = useContext(AppContext);

    const decideRefetching2 = () => decideRefetching(appCtx, ready, dataset, setDataset, type)

    const data = useFetchSearchData("/search_track", query, type, handleSearch, decideRefetching2)

    console.log(data, "DATA SEARCHED!! for tracks", dataset)

    useEffect(() => {
        data?.length && setDataset(data)
    }, [data])

    const renderTracks = () => (dataset || data)?.map((item, idx) => item?.track?.images && <RenderTrackMinimalView key={idx} track={item?.track} />)

    return (
        <section>
            <h2 className='text-xl my-2'>Found Tracks....</h2>
            <div className='flex justify-between gap-2 flex-wrap pr-4'>
                {renderTracks()}
            </div>
        </section>
    )
}
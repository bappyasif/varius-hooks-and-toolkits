import { AppContext } from '@/components/appContext'
import { useFetchSearchData } from '@/hooks'
import { shazamApiInterceptor } from '@/utils/interceptor'
import { useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'
import { RenderTrackMinimalView } from "../../TracksList"

export const PrepareForDataRendering = ({ type, query, handleSearch }) => {
    return (
        <>
            <div>PrepareForDataRendering</div>
            {type === "Track" && query ? <SearchTracks query={query} type={type} handleSearch={handleSearch} /> : null}
            {type === "Artist" && query}
        </>
    )
}

const SearchTracks = ({ query, type, handleSearch }) => {
    const [dataset, setDataset] = useState([]);

    const appCtx = useContext(AppContext);

    const decideRefetching = () => {
        const found = appCtx?.searchedData?.find(item => item.type === type && item.query === query && item.data?.length)
        console.log(found, "FOUND!!", appCtx?.searchedData)
        if (found) {
            !dataset.length && setDataset(found?.data)
        }
        return found === undefined ? true : false
    }

    const data = useFetchSearchData("/search_track", query, type, handleSearch, decideRefetching)

    console.log(data, "DATA SEARCHED!!", dataset)

    useEffect(() => {
        data && setDataset(data)
    }, [data])

    const renderTracks = () => (dataset || data)?.map((item, idx) => <RenderTrackMinimalView key={idx} track={item?.track} />)

    return (
        <section>
            <h2 className='text-xl my-2'>Found Tracks....</h2>
            <div className='flex justify-between gap-2 flex-wrap pr-4'>
                {renderTracks()}
            </div>
        </section>
    )
}

const RenderTrack = ({ item }) => {

}

// const SearchTracks = ({query}) => {
//     const fetchTracks = () => {
//         const url = {url: "/search_track"}
//         const params = {query: query, limit: '20', start_from: '0', lang: '-'}
//         return beginFetch({url, params})
//     }

//     const {data} = useQuery({
//         queryKey: ["search tracks", `${query}`],
//         queryFn: fetchTracks,
//         refetchOnWindowFocus: false,
//         onSuccess: data => {
//             console.log(data, "Search tracks - fetch succeeded")
//         }
//     })

//     return data
// }
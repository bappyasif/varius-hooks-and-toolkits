import { shazam_axios_interceptor_client } from '@/utils/axios-interceptors'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const fetchTracks = (url) => shazam_axios_interceptor_client({ url: url, params: { country_code: "US", limit: 20, start_from: 0 }, method: "get" })

// const fetchTracksForCity = (url) => shazam_axios_interceptor_client({ url: url, params: { country_code: "UZ", limit: 20, start_from: 0, city_name: "Tashkent" }, method: "get" })
const fetchTracksForCity = (url) => shazam_axios_interceptor_client({ url: url, params: { country_code: "US", limit: 20, start_from: 0, city_name: "New York" }, method: "get" })

export const ListTopTracks = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["top", "tracks", "country"],
        queryFn: () => fetchTracks("/top_country_tracks"),
        refetchOnWindowFocus: false
    })

    // console.log(data?.data)

    const renderTracks = () => data?.data?.result?.tracks.map(item => item?.images && <RenderMusicTrackData key={item.key} item={item} />)

    return (
        data?.data
            ?
            <section>
                <h2 className='text-4xl py-6'>List Of Top Tracks For USA </h2>
                <div className='flex flex-wrap gap-6 justify-start'>
                    {renderTracks()}
                </div>
            </section>
            : null
    )
}

export const ListCityTopTracks = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["top", "tracks", "city"],
        queryFn: () => fetchTracksForCity("/top_city_tracks"),
        refetchOnWindowFocus: false
    })

    console.log(data?.data)

    const renderTracks = () => data?.data?.result?.tracks.map(item => item?.images && <RenderMusicTrackData key={item.key} item={item} />)

    return (
        data?.data
            ?
            <section>
                <h2 className='text-4xl py-6'>List Of Top Tracks For City of New York</h2>
                <div className='flex flex-wrap gap-6 justify-start'>
                    {renderTracks()}
                </div>
            </section>
            : null
    )
}


const RenderMusicTrackData = ({ item }) => {
    const { images, share, url, subtitle, title } = item
    const { background, coverart } = images
    const { avatar, href, image, subject, text } = share

    return (
        <article
            style={{
                backgroundImage: `url('${coverart}')`,
                width: "450px",
                height: "515px",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                // margin: "auto"
            }}
            className="flex flex-col py-2 rounded-lg justify-between"
        >
            <div className='flex gap-6 items-start bg-slate-200 opacity-80'>
                <img className='rounded-xl' src={avatar} width={110} height={80} alt={`${title} by ${subtitle}`} />
                <h2 className='text-2xl'>{subject}</h2>
            </div>
            <p className='flex justify-center items-center gap-6 py-2 bg-slate-200 opacity-80'>
                <img className='rounded-xl' src={image} width={200} height={180} alt={`${title} by ${subtitle}`} />
                <img className='rounded-xl' src={background} width={200} height={180} alt={`${title} by ${subtitle}`} />
            </p>
            <p className='text-2xl bg-slate-200 opacity-80'>
                <span>{text}</span>
                <span>Liten to it from <a className='text-blue-600' target={"_blank"} href={href}>Shazam</a></span>
            </p>
            <p className='flex gap-6 justify-center my-2 text-xl'>
                <button className='py-4 px-6 bg-pink-600 rounded-lg'>Add To Favourites</button>
                <button className='py-4 px-6 bg-pink-800 rounded-lg'>Add to Playlist</button>
            </p>
        </article>
    )
}

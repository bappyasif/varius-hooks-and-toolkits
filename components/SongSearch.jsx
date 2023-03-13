import { shazam_axios_interceptor_client } from '@/utils/axios-interceptors';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'

export const SongSearch = () => {
    const [text, setText] = useState();
    const [searchNow, setSearchNow] = useState(false);

    const handleTextChange = evt => setText(evt.target.value)
    const handleSearch = evt => {
        evt.preventDefault();
        console.log(text, "search this....")
        if (text?.length >= 2) {
            setSearchNow(true);
            // setText(null)
        } else {
            setSearchNow(false);
            alert("please enter a phrase minimum 2-4 characters for a better result")
        }
    }

    return (
        <section>
            <SearchForm handleTextChange={handleTextChange} handleSearch={handleSearch} />
            <ShowSongSearchResults setText={setText} searchNow={searchNow} queryText={text} setSearchNow={setSearchNow} />
            {/* {searchNow ? <ShowSongSearchResults setText={setText} searchNow={searchNow} queryText={text} setSearchNow={setSearchNow} /> : null} */}
        </section>
    )
}

const ShowSongSearchResults = ({ queryText, searchNow, setSearchNow }) => {
    const { data: songs, isLoading } = useQuery({
        queryKey: ["search songs", `${queryText}`],
        queryFn: () => {
            return shazam_axios_interceptor_client({ url: "/search_track", params: { limit: '10', start_from: '0', query: `${queryText}` } })
            // return searchNow ? shazam_axios_interceptor_client({ url: "/search_track", params: { limit: '10', start_from: '0', query: `${queryText}` } }) : null
        },
        onSuccess: () => {
            // setText(null);
            setSearchNow(false)
        },
        enabled: searchNow && queryText?.length > 2,
        refetchOnWindowFocus: false
    })

    console.log(songs?.data, "songs!!", songs?.data?.result?.hits)

    const renderTracks = () => songs?.data?.result?.hits?.map((track, idx) => <RenderTrack key={idx} track={track} />)

    return (
        <section className='flex flex-wrap gap-4'>
            {(isLoading && searchNow) ? <h2>Loading....</h2> : null}
            {(songs?.data?.result?.hits.length) ? renderTracks() : null}
        </section>
    )
}

const RenderTrack = ({ track }) => {
    const { images, share, subtitle, title, url } = track.track;
    const { background, coverart } = images;
    const { subject, text } = share

    console.log(track, track.track, "is it!!", subject, text)

    return (
        <div
            style={{
                backgroundImage: `url('${background}')`,
                // width: "fit-content",
                // height: "fit-content",
                maxHeight: '420px',
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                margin: "auto"
            }}

            className="w-1/4 overflow-y-auto scroll-smooth p-2 px-4 rounded-xl"
        >
            <p className='text-2xl bg-slate-400 opacity-80 flex flex-col'>
                <span className='text-4xl'>{title}</span>
                <span>{subtitle}</span>
            </p>
            <img src={coverart} width={220} height={170} alt={text} />
            <p className='text-2xl bg-slate-400 opacity-80 flex flex-col'>
                <span>{subject}</span>
                <span>{text}</span>
                <span><a href={url}>Click To Visit Shazam And Listen To This Song</a></span>
            </p>
        </div>
    )
}

const SearchForm = ({ handleTextChange, handleSearch }) => {
    return (
        <form action="#" method='post' onSubmit={handleSearch} className="flex justify-center items-center gap-6 text-4xl my-4">
            <fieldset className="text-5xl">
                <label htmlFor="text"></label>
                <input className='rounded-lg px-2' type="text" id='text' onChange={handleTextChange} placeholder='Search For Your Songs In Here....' />
            </fieldset>
            <button className='bg-blue-600 rounded-xl px-4 py-1' type="submit">Click Here To Search</button>
        </form>
    )
}
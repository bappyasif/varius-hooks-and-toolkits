import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineReconciliation } from 'react-icons/ai';
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

    // console.log(appCtx?.topTracks, "appCtx.topTracks", tracksData)
    // const performAlreadyExistingTopTracksData = () => {
    //     appCtx?.topTracks.forEach(item => {
    //         // console.log(item)
    //         const foundItem = Object.keys(item).findIndex(val => val == countryCode)
    //         if(foundItem !== -1) {
    //             setTracksData(Object.values(item)[0])
    //         }
    //     })
    // }

    const performAlreadyExistingTopTracksData = () => {
        const findCountryTopTracks = appCtx.topTracks.find(item => item.countryCode == appCtx.country)
        if (findCountryTopTracks !== undefined) {
            setTracksData(findCountryTopTracks.data)
        }
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

export const RenderTrackMinimalView = ({ track, fromSearch }) => {
    const [show, setShow] = useState(false);

    // console.log(track, "TRACK!!!!")
    const { images, subtitle, title, key, url } = track
    const { background, coverart } = images

    // console.log(key,"TRACK!!!!")

    return (
        <article className='w-1/4 relative'>
            {
                fromSearch
                    ? <a target={"_blank"} className='text-xl' href={`${url}`}>Click Here To Listen To This Track</a>
                    : <Link className='text-xl' href={`/top-tracks/track-details/${key}`}>Click Here To See More Details</Link>
            }
            <img src={background || coverart} width={400} height={400} />
            <p className='text-2xl break-words'>{title} -- {subtitle}</p>
            {
                !fromSearch
                    ? <button onClick={() => setShow(prev => !prev)} className='text-2xl bg-blue-200 px-4 py-1 rounded-md shadow-lg w-full'>Add to Playlist</button>
                    : null
            }
            <div className='absolute bottom-1'>
                {
                    show
                        ? <ShowPlaylists show={show} setShow={setShow} trackId={key} />
                        : null
                }
            </div>
            {/* {
                show
                    ? <ShowPlaylists setShow={setShow} />
                    : null
            } */}
        </article>
    )
}

export const ShowPlaylists = ({ show, setShow, trackId }) => {
    const [createNew, setCreateNew] = useState(false);
    const openCreateNew = () => setCreateNew(true);
    const closeCreateNew = () => setCreateNew(false);
    const appCtx = useContext(AppContext);

    const userFound = appCtx.playlists.find(item => item.userId == "user1")

    console.log(appCtx.playlists, "appCtx.playlists", trackId)

    const renderPlaylists = () => userFound?.lists?.map(item => <PlaylistsDropdowns key={item.name} item={item} setShow={setShow} trackId={trackId} />)

    return (
        <div className='bg-blue-200'>
            {
                createNew
                    ? <PlayListUserInput closeCreateNew={closeCreateNew} />
                    : <button onClick={openCreateNew}>Create A New Playlist</button>
            }
            {renderPlaylists()}
        </div>
    )
}

const PlayListUserInput = ({ closeCreateNew }) => {
    const [text, setText] = useState("")

    const appCtx = useContext(AppContext);

    const handleText = evt => setText(evt.target.value)

    const handleCreate = () => {
        console.log(text)
        const data = { name: text }
        appCtx?.handlePlaylists(data, "user1")
        closeCreateNew()
    }

    return (
        <div className=''>
            <input
                type={"text"}
                onChange={handleText}
                placeholder={"Enter Your Playlist Name"}
            />
            <div className='flex gap-2'>
                <button onClick={handleCreate} className='bg-teal-200 py-1 px-4 w-full'>Create Playlist</button>
                <button onClick={closeCreateNew} className='bg-teal-200 py-1 px-4 w-full'>Cancel</button>
            </div>
        </div>
    )
}

const PlaylistsDropdowns = ({ item, setShow, trackId }) => {
    const appCtx = useContext(AppContext);

    const { name } = item;

    const handleClick = () => {
        // const data = {name, }
        appCtx.handleAddToPlaylist("user1", name, trackId)
        setShow(false)
    }

    return (
        <div style={{cursor: "pointer"}} className="flex gap-2 items-center" onClick={handleClick}>
            {name}
            {<AiOutlineReconciliation />}
        </div>
    )
}
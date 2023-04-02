import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineCheck, AiOutlineReconciliation } from 'react-icons/ai';
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

export const RenderTrackMinimalView = ({ track, fromSearch, fromPlaylist }) => {
    const [show, setShow] = useState(false);

    // console.log(track, "TRACK!!!!")
    const { images, subtitle, title, key, url } = track
    const { background, coverart } = images

    // console.log(key,"TRACK!!!!")

    return (
        <article className={`${fromPlaylist ? "w-full" : "w-1/4"} relative`}>
            {
                fromSearch
                    ? <a target={"_blank"} className='text-xl bg-teal-200 px-4 rounded-md' href={`${url}`}>{fromPlaylist ? "Listen To This Track" : "Click Here To Listen To This Track"}</a>
                    : <Link className='text-xl' href={`/top-tracks/track-details/${key}`}>Click Here To See More Details</Link>
            }
            <img src={background || coverart} width={400} height={400} />
            <p className='text-2xl overflow-hidden text-ellipsis' style={{
                lineHeight: "1em",
                maxHeight: "2em",
                lineClamp: 2
            }}>{title} -- {subtitle}</p>
            {
                !fromSearch
                    ? <button onClick={() => setShow(prev => !prev)} className='text-2xl bg-blue-200 px-4 py-1 rounded-md shadow-lg w-full'>Add to Playlist</button>
                    : null
            }
            <div className='absolute bottom-1 z-10'>
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

    const userFound = appCtx?.playlists?.find(item => item.userId == "user1")

    console.log(appCtx.playlists, "appCtx.playlists", trackId)

    const renderPlaylists = () => userFound?.lists?.map(item => <PlaylistsDropdowns key={item.name} item={item} setShow={setShow} trackId={trackId} />)

    return (
        <div className='bg-blue-200'>
            {
                createNew
                    ? <PlayListUserInput closeCreateNew={closeCreateNew} />
                    : <button className='text-2xl' onClick={openCreateNew}>Create Playlist</button>
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
                className='w-full text-xl'
                type={"text"}
                onChange={handleText}
                placeholder={"Enter Your Playlist Name"}
            />
            <div className='flex gap-2 text-2xl'>
                <button onClick={handleCreate} className='bg-teal-200 py-1 px-4 w-full'>Create</button>
                <button onClick={closeCreateNew} className='bg-teal-200 py-1 px-4 w-full'>Cancel</button>
            </div>
        </div>
    )
}

const PlaylistsDropdowns = ({ item, setShow, trackId }) => {
    const [added,setAdded] = useState(false);

    const appCtx = useContext(AppContext);

    const { name } = item;

    const handleClick = () => {
        // const data = {name, }
        appCtx.handleAddToPlaylist("user1", name, trackId)
        setShow(false)
    }

    const checkInWhichPlaylist = () => {
        const filtered = appCtx.playlists?.filter(item => item.userId === "user1" && item?.lists?.length)
        console.log(appCtx.playlists, filtered)
        filtered[0]?.lists?.forEach(item => {
            if(item?.name == name && item?.tracks?.length) {
                setAdded(item.tracks.includes(trackId))
            }
        })
    }

    useEffect(() => {
        trackId && checkInWhichPlaylist()
    }, [trackId])

    return (
        <div style={{cursor: "pointer"}} className="flex gap-2 items-center text-xl justify-between outline outline-1 outline-red-200 px-2 mt-2" onClick={handleClick}>
            <span className='text-ellipsis overflow-hidden w-1/2'>{name}</span>
            <span className='w-1/2 flex justify-center text-4xl'>{ added ? <AiOutlineCheck /> : <AiOutlineReconciliation />}</span>
        </div>
    )
}
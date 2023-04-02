import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineCheck, AiOutlineReconciliation } from 'react-icons/ai';
import { AppContext } from './appContext'

export const TracksList = ({ data, countryCode }) => {
    const [tracksData, setTracksData] = useState([]);

    const appCtx = useContext(AppContext);

    const performAlreadyExistingTopTracksData = () => {
        const findCountryTopTracks = appCtx.topTracks.find(item => item.countryCode == appCtx.country)
        if (findCountryTopTracks !== undefined) {
            setTracksData(findCountryTopTracks.data)
        }
    }

    useEffect(() => {
        performAlreadyExistingTopTracksData()
    }, [])

    const renderTracks = () => (data || tracksData)?.map(track => track?.images && <RenderTrackMinimalView key={track.key} track={track} />)

    return (
        <>
            <Link className='text-xl bg-blue-400 p-2 rounded-lg font-bold' href={"/top-tracks"}>Choose Another Country List</Link>
            <h2 className='text-2xl bg-blue-200 my-4 font-extrabold'>Trending Tracks</h2>
            <section className='flex flex-wrap gap-4 justify-between pr-8'>
                {renderTracks()}
            </section>
        </>
    )
}

export const RenderTrackMinimalView = ({ track, fromSearch, fromPlaylist }) => {
    const [show, setShow] = useState(false);

    const { images, subtitle, title, key, url } = track
    const { background, coverart } = images

    return (
        <article className={`${fromPlaylist ? "w-full" : "w-1/4"} flex flex-col justify-between relative bg-stone-200 p-1 rounded-lg`} style={{height: fromPlaylist ? "327px" : "472px"}}>
            <div className='bg-teal-200 px-4 rounded-md text-xl font-bold text-center'>
                {
                    fromSearch
                        ? <a target={"_blank"} className='' href={`${url}`}>{fromPlaylist ? "Listen To This Track" : "Click To Listen To This Track"}</a>
                        : <Link className='' href={`/top-tracks/track-details/${key}`}>Click To See More Details</Link>
                }
            </div>

            <img src={background || coverart} width={400} height={400} />
            <p className='text-2xl overflow-hidden text-ellipsis' style={{
                lineHeight: "1em",
                maxHeight: "2em",
                lineClamp: 2
            }}>{title} -- {subtitle}</p>
            {
                !fromSearch
                    ? <button onClick={() => setShow(prev => !prev)} className='text-2xl bg-blue-200 px-4 py-1 rounded-md shadow-lg w-full font-bold'>Add to Playlist</button>
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

    // console.log(appCtx.playlists, "appCtx.playlists", trackId)

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
    const [added, setAdded] = useState(false);

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
            if (item?.name == name && item?.tracks?.length) {
                setAdded(item.tracks.includes(trackId))
            }
        })
    }

    useEffect(() => {
        trackId && checkInWhichPlaylist()
    }, [trackId])

    return (
        <div style={{ cursor: "pointer" }} className="flex gap-2 items-center text-xl justify-between outline outline-1 outline-red-200 px-2 mt-2" onClick={handleClick}>
            <span className='text-ellipsis overflow-hidden w-1/2'>{name}</span>
            <span className='w-1/2 flex justify-center text-4xl'>{added ? <AiOutlineCheck /> : <AiOutlineReconciliation />}</span>
        </div>
    )
}
import { request_internal, shazam_axios_interceptor_client } from '@/utils/axios-interceptors'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'

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
    const { images, share, url, subtitle, title, key } = item
    const { background, coverart } = images
    const { avatar, href, image, subject, text } = share

    const forDD = { subtitle, subject, id: key, image, url, text}

    const [showMenu, setShowMenu] = useState(false)

    // console.log(item, "ITEM")

    const {mutate: addToFavourites} = useMutation({
        mutationKey: ["Add To Favourites"],
        mutationFn: () => {
            return request_internal({url: "/favourites", method: "post", data: forDD})
        }
    })

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
            <p className='flex gap-6 justify-center my-2 text-xl relative'>
                <button onClick={addToFavourites} className='py-4 px-6 bg-pink-600 rounded-lg'>Add To Favourites</button>
                <button onClick={() => setShowMenu(prev => !prev)} className='py-4 px-6 bg-pink-800 rounded-lg'>Add to Playlist</button>
                { showMenu ? <RenderMenu item={forDD} setShowMenu={setShowMenu} /> : null}
            </p>
        </article>
    )
}

export const RenderMenu = ({item, setShowMenu}) => {
    const clientQuery = useQueryClient()

    const fetchExistingLists = () => request_internal({ url: "/playlists" })

    const { data: playlists } = useQuery({
        queryKey: ["playlists"],
        queryFn: fetchExistingLists,
        refetchOnWindowFocus: false
    })

    const {mutate: createNewList} = useMutation({
        mutationKey: ["create playlist"],
        mutationFn: () => {
            const inputName = prompt("Enter Your List Name", "Awesome Tracks");
            // playlists?.data[inputName] = null
            // return request_internal({url: "/playlists", method: "post", data: playlists?.data})
            return request_internal({url: "/playlists", method: "post", data: {[inputName]: []}})
        },
        onSuccess: () => clientQuery.invalidateQueries(["playlists"])
    })

    const handleCreateNewList = () => createNewList()

    // console.log(playlists?.data, "playlist", playlists?.data?.length)

    const checkListIfEmpty = playlists?.data && Object.keys(playlists?.data).length

    return (
        <div className='absolute bg-blue-200 px-3 py-1 text-3xl rounded-xl'>
            {
                checkListIfEmpty
                    ?
                    <RenderMenuLists clientQuery={clientQuery} items={playlists?.data} songData={item} setShowMenu={setShowMenu} />
                    :
                    <>
                        <p>No Playlists Has Been Created Yet</p>
                        <button onClick={handleCreateNewList}>Create A New Playlist</button>
                    </>
            }
        </div>
    )
}

const RenderMenuLists = ({ items, songData={subtitle: "test2"}, setShowMenu, clientQuery }) => {
    // console.log(items, "itenmsx")

    const arr = []

    for(let key in items) {
        arr.push({[key]: items[key]})
    }

    const {mutate: addNewList} = useMutation({
        mutationKey: ["playlists", "another", "new"],
        mutationFn: () => {
            const inputName = prompt("Enter Your List Name", "Awesome Tracks");
            items[inputName] = []
            console.log(items, "ADDNEW", inputName)
            return request_internal({url: "/playlists", method: "post", data: items})
        },
        onSuccess: () => clientQuery.invalidateQueries(["playlists"])
    })

    const renderMenus = () => arr?.map((item, idx) => <RenderMenuList key={idx} item={item} songData={songData} setShowMenu={setShowMenu} />)

    return (
        <menu className='flex flex-col justify-center'>
            {renderMenus()}
            <button onClick={addNewList}>Create New</button>
        </menu>
    )
}

const RenderMenuList = ({ item, songData, setShowMenu }) => {
    // console.log(item, Object.keys(item))
    const listName = Object.keys(item)[0];

    const getListsData = () => request_internal({url: "/playlists"})

    const {mutate: addSongToPlaylist} = useMutation({
        mutationKey: ["add to playlist", `${listName}`],
        mutationFn: async () => {
            let newData = []

            const response = await getListsData()
            const data = response?.data

            const idx = data[listName].findIndex(item => item.subtitle === songData.subtitle)

            idx !== -1 ? data : data[listName].push(songData)
            newData = data

            setShowMenu(false)

            return request_internal({url: "/playlists", method: "post", data: newData})
        }
    })

    const renderListName = () => Object.keys(item).map(name => <RenderMenuItem key={name} name={name} addSongToPlaylist={addSongToPlaylist} />)
    return (
        <ul className='flex flex-col gap-4'>
            {renderListName()}
        </ul>
    )
}

const RenderMenuItem = ({ name, addSongToPlaylist }) => {
    const handleClick = () => {
        addSongToPlaylist()
    }
    return (
        <li onClick={handleClick} className='my-1 px-4 rounded-md outline-none hover: outline-2, outline-blue-900, outline'>
            {name}
        </li>
    )
}
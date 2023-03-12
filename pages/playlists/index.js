import { RenderPlaylistItems } from '@/components/RenderPlaylistItem'
import { request_internal } from '@/utils/axios-interceptors'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const ShowPlaylists = () => {
    const {data: playlists} = useQuery({
        queryKey: ["playlists"],
        queryFn: () => request_internal({url: "/playlists", method: "get"})
    })
    
    const arr = []

    for(let key in playlists?.data) {
        arr.push({[key]: playlists.data[key]})
    }

    // console.log(arr, "playlists<><>")

    const renderLists = () => arr?.map((item, idx) => <RenderPlaylist key={idx} item={item} />)

  return (
    <div>
        <h1 className='text-4xl'>All Available Playlists</h1>
        {arr.length ? renderLists() : null}
    </div>
  )
}

const RenderPlaylist = ({item}) => {
    const listName = Object.keys(item)[0];
    const listItems = Object.values(item);

    const renderListItems = () => listItems?.map((list, idx) => <RenderPlaylistItems key={idx} items={list} listName={listName} />)

    return (
        <section>
            <h1 className='text-3xl py-4'>{listName}</h1>
            {renderListItems()}
        </section>
    )
}

export default ShowPlaylists
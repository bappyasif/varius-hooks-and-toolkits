import React, { useContext } from 'react'
import { AppContext } from '../appContext'
import { RenderTrackMinimalView } from '../TracksList'
import { AiOutlineScissor } from 'react-icons/ai'

export const ShowUserPlaylists = ({ data }) => {
  const renderLists = () => data?.map((item, idx) => <RenderPlaylist key={item.name + idx} item={item} />)
  return (
    <section className='flex flex-wrap gap-4'>
      {renderLists()}
    </section>
  )
}

const RenderPlaylist = ({ item }) => {
  const { name, tracks } = item

  return (
    <div className='flex flex-col w-full'>
      <RenderNameCard name={name} />
      <p className='text-2xl my-2 bg-blue-200'>Lists Of Tracks In This Playlist</p>
      <RenderTracks tracks={tracks} name={name} />
    </div>
  )
}

const RenderTracks = ({ tracks, name }) => {
  const renderItems = () => tracks?.map(item => <RenderTrack key={item} keyId={item} name={name} />)

  return (
    <div className='flex gap-4 flex-wrap self-start w-full'>
      {renderItems()}
    </div>
  )
}

const RenderTrack = ({ keyId, name }) => {
  const appCtx = useContext(AppContext);

  const foundTrack = appCtx?.topTracks[0]?.data.find(item => item.key == keyId)

  // console.log(appCtx?.topTracks?.data, keyId, foundTrack)

  const handleRemoveTrack = () => {
    console.log(keyId, "!!delete!!")
    // appCtx?.topTracks[0]?.data.filter(item => item.key == keyId)
    appCtx.handleRemoveFromPlaylist("user1", name, keyId)
  }

  return (
    <div className='w-1/3 bg-stone-200 rounded-md px-1'>
        <RenderTrackMinimalView track={foundTrack} fromSearch={true} fromPlaylist={true} />
        <button onClick={handleRemoveTrack} className='text-lg font-bold flex gap-2 items-center bg-neutral-400 text-red-800 rounded-lg my-1 mt-6 w-full'><AiOutlineScissor size={"31px"} /> <span className='text-center w-full text-xl'>Remove From Playlist</span></button>
    </div>
  )
}

const RenderNameCard = ({ name, url }) => {
  return (
    <div className='w-1/2'>
      <h2 className='text-4xl text-sky-900'>{name}</h2>
      <img src={url || "https://source.unsplash.com/random"} width={450} height={450} />
    </div>
  )
}
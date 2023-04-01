import React, { useContext } from 'react'
import { AppContext } from '../appContext'
import { RenderTrackMinimalView } from '../TracksList'
import { AiOutlineScissor } from 'react-icons/ai'

export const ShowUserPlaylists = ({ data }) => {
  const renderLists = () => data?.map((item, idx) => <RenderPlaylist key={item.name + idx} item={item} />)
  return (
    <section className='flex gap-8'>
      {renderLists()}
    </section>
  )
}

const RenderPlaylist = ({ item }) => {
  const { name, tracks } = item

  return (
    <div>
      <RenderNameCard name={name} />
      <p>Lists Of Tracks In This Playlist</p>
      <RenderTracks tracks={tracks} name={name} />
    </div>
  )
}

const RenderTracks = ({ tracks, name }) => {
  const renderItems = () => tracks?.map(item => <RenderTrack key={item} keyId={item} name={name} />)

  return (
    <div className='flex gap-4'>
      {renderItems()}
    </div>
  )
}

const RenderTrack = ({ keyId, name }) => {
  const appCtx = useContext(AppContext);

  const foundTrack = appCtx?.topTracks[0]?.data.find(item => item.key == keyId)

  console.log(appCtx?.topTracks?.data, keyId, foundTrack)

  const handleRemoveTrack = () => {
    console.log(keyId, "!!delete!!")
    // appCtx?.topTracks[0]?.data.filter(item => item.key == keyId)
    appCtx.handleRemoveFromPlaylist("user1", name, keyId)
  }

  return (
    <div style={{minHeight: "342px"}} className='flex flex-col justify-between'>
        <RenderTrackMinimalView track={foundTrack} fromSearch={true} fromPlaylist={true} />
        <button onClick={handleRemoveTrack} className='text-md flex gap-2 items-center'><AiOutlineScissor /> <span>Remove From Playlist</span></button>
    </div>
  )
}

const RenderNameCard = ({ name, url }) => {
  return (
    <div className='w-1/3'>
      <h2>{name}</h2>
      <img src={url || "https://source.unsplash.com/random/600?sig=1"} />
    </div>
  )
}
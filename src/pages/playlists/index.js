import { AppContext } from '@/components/appContext'
import { ShowUserPlaylists } from '@/components/forPlaylists';
import React, { useContext } from 'react'

const UserPlaylists = () => {
    const appCtx = useContext(AppContext);

    const foundPlaylists = appCtx?.playlists?.find(item => item?.userId == "user1" && item?.lists?.length)

    console.log(appCtx?.playlists, foundPlaylists)

  return (
    <main>
        <h1>User Playlists</h1>
        <ShowUserPlaylists data={foundPlaylists?.lists} />
    </main>
  )
}

export default UserPlaylists
import { AppContext } from '@/components/appContext'
import { ShowUserPlaylists } from '@/components/forPlaylists';
import { useToFetchPlaylists } from '@/hooks';
import { internalApiRequest } from '@/utils/interceptor';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import React, { useContext, useState } from 'react'

const UserPlaylists = () => {
  // const [fetchPlaylists, setFetchPlaylists] = useState(true);

  const appCtx = useContext(AppContext);

  const {data: session} = useSession();

  // const {data} = useToFetchPlaylists(fetchPlaylists, setFetchPlaylists)
  const {data} = useToFetchPlaylists()

  // const fetchingPlaylist = () => {
  //   const url = "/playlists";
  //   const method = "GET";
  //   // const data = {userId: "user1"};
  //   // const params = {userId: "user1"};
  //   const params = {userId: session?.user.id};
  //   // return internalApiRequest({url, method, data, params, headers: {"Content-Type": "application/json"}})
  //   return internalApiRequest({url, method, params})
  // }

  // const {data} = useQuery({
  //   // queryKey: ["fetching playlist", `user1`],
  //   queryKey: ["fetching playlist", `${session.user.id}`],
  //   queryFn: fetchingPlaylist,
  //   refetchOnWindowFocus: false,
  //   // enabled: fetchPlaylists && appCtx?.playlists?.length == 0,
  //   enabled: fetchPlaylists,
  //   onSuccess: data => {
  //     data?.data?.result?.length && setFetchPlaylists(false)
  //     appCtx.handleInitialUserPlaylist(data?.data?.result)
  //     // appCtx?.playlists?.length == 0 && data?.data?.result?.length && setFetchPlaylists(false)
  //   }
  // })

  // const foundPlaylists = appCtx?.playlists?.find(item => item?.userId == "user1" && item?.lists?.length)
  const foundPlaylists = appCtx?.playlists?.find(item => (item?.userId == session?.user?.id) && item?.lists?.length)

  console.log(appCtx?.playlists, foundPlaylists, data?.data)

  return (
    <main className='w-full'>
      <h1 className='text-6xl bg-blue-200 mb-4'>User Playlists</h1>
      {/* <ShowUserPlaylists data={foundPlaylists?.lists} /> */}
      <ShowUserPlaylists data={foundPlaylists?.lists} />
    </main>
  )
}

export default UserPlaylists
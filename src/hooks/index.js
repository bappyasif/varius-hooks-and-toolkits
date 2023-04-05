import { AppContext } from '@/components/appContext'
import { internalApiRequest, shazamApiInterceptor } from '@/utils/interceptor'
import { useQuery } from '@tanstack/react-query'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'

const beginFetch = (options) => shazamApiInterceptor(options)

export function useFetchSearchData(url, query, type, handleSearch, decideRefetching) {
    const appCtx = useContext(AppContext);

    const fetchTracks = () => {
        // const url = { url: "/search_track" }
        // const url = { url }
        const params = { query: query, limit: '20', start_from: '0', lang: '-' }
        return beginFetch({ url, params })
    }

    const { data } = useQuery({
        queryKey: [`search ${type}`, `${query}`],
        queryFn: fetchTracks,
        refetchOnWindowFocus: false,
        enabled: decideRefetching(),
        onSuccess: data => {
            handleSearch()
            data?.data?.result?.hits && appCtx.handleSearchData(type, query, data?.data?.result?.hits)
            console.log(data, "Search - fetch succeeded")
        }
    })

    return data?.data?.result?.hits
}


export function useWhenClickedOutside(ref, handler) {
    // console.log("close hook", ref.current)
    useEffect(() => {
        let listener = event => {
            if (!ref.current || ref.current.contains(event.target)) return
            handler(event)
        }

        document.addEventListener('mousedown', listener)

        return () => document.removeEventListener('mousedown', listener)

    }, [ref, handler])

    // useEffect(() => {
    //     const listener = event => {
    //         if (ref.current && !ref.curent.contains(event.target)) {
    //             console.log("should close")
    //             handler()
    //         } else {
    //             console.log("stay open")
    //             return
    //         }

    //         document.addEventListener("mousedown", listener);

    //         return () => document.removeEventListener("mousedown", listener)
    //     }
    // }, [ref, handler])
}

export function useToFetchPlaylists () {
    const {data: session, status} = useSession();
    const appCtx = useContext(AppContext);
    const router = useRouter()

  const fetchingPlaylist = () => {
    const url = "/playlists";
    const method = "GET";
    // const data = {userId: "user1"};
    // const params = {userId: "user1"};
    const params = {userId: session?.user?.id};
    // return internalApiRequest({url, method, data, params, headers: {"Content-Type": "application/json"}})
    return internalApiRequest({url, method, params})
  }

  const {data} = useQuery({
    // queryKey: ["fetching playlist", `user1`],
    queryKey: ["fetching playlist", `${session?.user?.id}`],
    queryFn: fetchingPlaylist,
    refetchOnWindowFocus: false,
    enabled: status === "authenticated" && appCtx?.playlists?.length == 0,
    // enabled: appCtx?.playlists?.length == 0,
    // enabled: fetchPlaylists && appCtx?.playlists?.length == 0,
    // enabled: fetchPlaylists,
    onSuccess: data => {
        console.log("fetched playlists!!")
    //   data?.data?.result?.length && setFetchPlaylists(false)
      appCtx.handleInitialUserPlaylist(data?.data?.result)
      // appCtx?.playlists?.length == 0 && data?.data?.result?.length && setFetchPlaylists(false)
    }
  })

  console.log(status, "STATYS!!")

//   useEffect(() => {
//     // status === "unauthenticated" ? signIn() : null
//     status === "unauthenticated" ? router.push("/api/auth/signin") : null
//   }, [])

  return {data}
}
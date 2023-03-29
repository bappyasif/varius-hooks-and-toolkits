import { AppContext } from '@/components/appContext'
import { shazamApiInterceptor } from '@/utils/interceptor'
import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'

const beginFetch = (options) => shazamApiInterceptor(options)

export function useFetchSearchData (url, query, type, handleSearch, decideRefetching) {
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
            console.log(data, "Search tracks - fetch succeeded")
        }
    })

    return data?.data?.result?.hits
}

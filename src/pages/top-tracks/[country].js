import { AppContext } from '@/components/appContext'
import { TracksList } from '@/components/TracksList'
import { countriesCodes, countriesConversions } from '@/utils/data'
import { shazamApiInterceptor } from '@/utils/interceptor'
import { useQuery } from '@tanstack/react-query'
import { data } from 'autoprefixer'
import React, { useContext } from 'react'

const fetchTracks = (options) => shazamApiInterceptor(options)

const TopTracksInCountry = ({country}) => {
  const appCtx = useContext(AppContext)

  const manageFetching = () => {
    const url = "/top_country_tracks"
    const params = {country_code: country, limit: '100', start_from: '0'}
    return fetchTracks({url, params})
  }

  const {data: tracks, isError, isLoading, error} = useQuery({
    queryKey: ["top-tracks", `${country}`],
    queryFn: manageFetching,
    refetchOnWindowFocus: false,
    enabled: appCtx.country != country ? true : false,
    // enabled: country ? true : false,
    // onSuccess: () => {
    //   appContext.handleTopTracks(tracks?.data?.result?.tracks)
    //   console.log(tracks?.data?.result?.tracks, "WHWTWHWTW")
    // }
  })

  // if(isLoading) {
  //   return <h2>Loading Data....</h2>
  // } else 
  if(isError) {
    return <h2>Error Occured.... {error.message}</h2>
  }

  console.log(appCtx.country, country, appCtx.country!=country)

  // console.log(tracks?.data?.result?.tracks, "tracks!!")

  return (
    <>
    <div>TopTracksInCountry -- {country}</div>
    {isLoading && (appCtx.country != country) ? <h2>Loading Data....</h2> : null}
    <TracksList data={tracks?.data?.result?.tracks} />
    </>
  )
}

export const getStaticPaths = () => {
  const paths = countriesConversions()?.map(country => ({params: {country: `${country.code}`}}))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async (context) => {
    const {params} = context;
    const {country} = params
    console.log(params, "!!", country)
    // console.log(params, "!!")
    return {
      props: {country: country}
    }
}

export default TopTracksInCountry
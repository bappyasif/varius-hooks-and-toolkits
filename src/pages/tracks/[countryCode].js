import { TracksList } from '@/components/TracksList'
import { countriesCodes, countriesConversions } from '@/utils/data'
import { shazamApiInterceptor } from '@/utils/interceptor'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const TopTracksByCountry = ({ countryCode, data }) => {
  // console.log(data, "DATA!!")
  return (
    <>
      <div>TopTracksByCountry -- {countryCode}</div>
      <TracksList data={data} />
    </>
  )
}

export const getStaticPaths = () => {
  // const paths = countriesConversions().map(country => ({params: {countryCode: country.code}}))

  // const paths = countriesConversions().map(country => (country.code == "BD" || country.code == "US" || country.code == "GB" || country.code == "IL") && ({params: {countryCode: country.code}}))

  const paths = countriesConversions().map(country => {
    // if (country.code == "BD" || country.code == "US" || country.code == "GB" || country.code == "IL") {
    if (country.code == "US") {
      return { params: { countryCode: country.code } }
    }
  }).filter(item => item)

  console.log(paths, "paths!!")

  return {
    paths,
    fallback: false
  }
}

const fetchTracks = (options) => shazamApiInterceptor(options)

export const getStaticProps = async context => {
  const { params } = context
  const { countryCode } = params
  console.log(countryCode, "countryCode")

  const manageFetching = () => {
    const url = "/top_country_tracks"
    const params = { country_code: countryCode, limit: '100', start_from: '0' }
    return fetchTracks({ url, params })
  }

  // const {data:topTracks} = useQuery({
  //   queryKey: ["top-tracks", `${countryCode}`],
  //   queryFn: manageFetching,
  //   refetchOnWindowFocus: false
  // })

  // const response = manageFetching().then(data=>data)
  // const data = await response.json()
  const data = await manageFetching().then(data => data)

  // console.log(data?.data?.result?.tracks, ">DATA><>")

  return {
    props: {
      countryCode: countryCode,
      data: data?.data?.result?.tracks
      // data: topTracks.data?.result?.tracks
    }
  }
}

export default TopTracksByCountry
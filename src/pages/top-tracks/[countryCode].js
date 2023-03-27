import { TracksList } from '@/components/TracksList'
import { shazamApiInterceptor } from '@/utils/interceptor'
import React from 'react'

const TopTracksByCountry = ({ countryCode, data }) => {
    // console.log(data, "DATA<><>!!")
    return (
        <>
            <div>TopTracksByCountry -- {countryCode}</div>
            <TracksList data={data} />
        </>
    )
}

const fetchTracks = (options) => shazamApiInterceptor(options)

export const getServerSideProps = async (context) => {
    const { params } = context
    const { countryCode } = params
    console.log(countryCode, "countryCode")

    const manageFetching = () => {
        const url = "/top_country_tracks"
        const params = { country_code: countryCode, limit: '100', start_from: '0' }
        return fetchTracks({ url, params })
    }

    const data = await manageFetching().then(data => data)

    return {
        props: {
            countryCode: countryCode,
            data: data?.data?.result?.tracks
        }
    }
}

export default TopTracksByCountry
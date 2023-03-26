import TrackDetail from '@/components/TrackDetail';
import React from 'react'

const TrackDetailPage = ({ track_key }) => {
    return (
        <>
            <div>TrackDetail -- {track_key}</div>
            <TrackDetail track_key={track_key} />
        </>
    )
}

export const getServerSideProps = context => {
    const { params } = context;
    const { track_key } = params;

    console.log(params, track_key, "check check!!")

    return {
        props: {
            track_key
        }
    }
}

export default TrackDetailPage
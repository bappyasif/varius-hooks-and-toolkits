import { AppContext } from '@/components/appContext';
import TrackDetail from '@/components/TrackDetail';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react'

const TrackDetailPage = ({ track_key }) => {
    const appCtx = useContext(AppContext);

    const router = useRouter()
    
    return (
        <main className='flex flex-col w-full'>
            <div className='text-2xl w-full text-center'>TrackDetail -- {track_key}</div>
            <Link className='text-xl bg-blue-400 px-4 py-1 rounded-lg w-fit' href={`/top-tracks/${appCtx.country}`}>Go To Tracks List</Link>
            <TrackDetail track_key={track_key} />
        </main>
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
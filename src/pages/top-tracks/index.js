import { AppContext } from '@/components/appContext';
import { SelectCountry } from '@/components/select-country';
import { useRouter } from 'next/router';
import React, { useContext } from 'react'

const TopTracksByCountry = () => {
    const appCtx = useContext(AppContext)

    const router = useRouter();

    const handleCountryChange = (e) => {
        appCtx.handleCountry(e.target.value != -1 ? e.target.value : "BD")
        router.push(`/top-tracks/${e.target.value != -1 ? e.target.value : "BD"}`)
    }
    
    return (
        <main className='flex flex-col'>
            <div>TopTracks</div>
            <SelectCountry handleCountryChange={handleCountryChange} />
        </main>
    )
}

export default TopTracksByCountry
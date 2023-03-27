import { AppContext } from '@/components/appContext'
import { SelectCountry } from '@/components/select-country'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

const TopTracks = () => {
    const appCtx = useContext(AppContext)

    const router = useRouter();

    const handleCountryChange = (e) => {
        appCtx.handleCountry(e.target.value != -1 ? e.target.value : "BD")
        router.push(`/tracks/${e.target.value != -1 ? e.target.value : "BD"}`)
    }
    
    return (
        <>
            <div>TopTracks</div>
            <SelectCountry handleCountryChange={handleCountryChange} />
        </>
    )
}

export default TopTracks
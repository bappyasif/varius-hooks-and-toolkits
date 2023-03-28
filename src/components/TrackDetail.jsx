import { shazamApiInterceptor } from '@/utils/interceptor';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react'
import { AppContext } from './appContext'

const TrackDetail = ({ track_key }) => {
    const appCtx = useContext(AppContext);
    // console.log(appCtx?.topTracks[appCtx.country], "appCtx?.topTracks[appCtx.country]")
    const foundTrack = appCtx?.topTracks[appCtx.country]?.find(track => track.key === track_key)
    // console.log(foundTrack, "foundTrack", appCtx?.topTracks)

    const { data } = useQuery({
        queryKey: ["search track details", `${track_key}`],
        queryFn: () => {
            const params = { track_id: `${track_key}` }
            return shazamApiInterceptor({ url: "/track_about", params })
        },
        refetchOnWindowFocus: false,
        enabled: foundTrack == undefined ? true : false
    })

    // console.log(data?.data.result, "!!")

    return (
        <>
            <div className='text-2xl bg-blue-200 my-4'>TrackDetail</div>
            {
                foundTrack || data?.data?.result
                    ? <RenderTrackDetails data={foundTrack !== undefined ? foundTrack : data?.data?.result} />
                    : null
            }
        </>
    )
}

const RenderTrackDetails = ({ data }) => {
    const { hub, share, url } = data
    // const {actions, displayname } = hub
    // const {avatar, href, html, image, snapchat, subject} = share
    return (
        <section>
            {/* <RenderShareInfo share={share} />
            <RenderHubInfo hub={hub} /> */}
            <div className='flex justify-around'>
                <RenderShareInfo share={share} />
                <RenderHubInfo hub={hub} url={url} share={share} />
                {/* <a className='text-xl bg-blue-200 h-fit px-2' href={url}>Open Track In Shazam</a> */}
            </div>
            {/* <a href={url}>Open Track In Shazam</a> */}
        </section>
    )

}

const RenderShareInfo = ({ share }) => {
    const { avatar, href, html, image, snapchat, subject } = share

    return (
        <div className='flex gap-4'>
            {/* <div className='flex flex-col w-1/4'>
                <img src={avatar || image} width={200} height={130} alt={subject} />
                <h2 className='text-2xl bg-blue-200 rounded-md'>{subject}</h2>
            </div> */}
            <div>
                <img src={image} />
                <div className='flex gap-1 flex-col text-xl'>
                    <a className='bg-blue-200 rounded-md' href={snapchat}>Open Track In SnapChat</a>
                    <a className='bg-blue-200 rounded-md' href={href}>Listen To This Track</a>
                    <a className='bg-blue-200 rounded-md' href={html}>Share Track</a>
                </div>
            </div>
        </div>
    )
}

const RenderHubInfo = ({ hub, url, share }) => {
    const { actions, displayname, explicit, name } = hub
    const { uri } = actions[1]

    // console.log(explicit, uri, name, "WHHWHWHW")

    return (
        <div className='text-xl'>
            <div className='flex flex-col mt-2 mb-8'>
                <img src={share?.avatar || share?.image} width={200} height={130} alt={share?.subject} />
                <h2 className='text-2xl bg-blue-200 rounded-md'>{share?.subject}</h2>
            </div>

            <h2>Music Hub: <span className='text-2xl'>{displayname}</span></h2>
            <h4>Explicit Content: <span className='text-2xl'>{explicit ? "Include" : "None"}</span></h4>
            <div className='flex flex-col gap-2 text-2xl'>
                <a className='bg-blue-200 h-fit px-2 py-1 rounded-sm' href={uri}>Open in: <span className='text-2xl'>{name || displayname}</span></a>
                <a className='bg-blue-200 h-fit px-2 py-1 rounded-sm' href={url}>Open Track In Shazam</a>
            </div>
        </div>
    )
}

export default TrackDetail
import { shazamApiInterceptor } from '@/utils/interceptor';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react'
import { AppContext } from './appContext'

const TrackDetail = ({ track_key }) => {
    const appCtx = useContext(AppContext);
    const foundTrack = appCtx?.topTracks.find(track => track.key === track_key)
    console.log(foundTrack, "foundTrack", appCtx?.topTracks)

    const {data} = useQuery({
        queryKey: ["search track details", `${track_key}`],
        queryFn: () => {
            const params = {track_id: `${track_key}`}
            return shazamApiInterceptor({ url: "/track_about", params})
        },
        refetchOnWindowFocus: false,
        enabled: foundTrack == undefined ? true : false
    })

    console.log(data?.data.result, "!!")

    return (
        <>
            <div>TrackDetail</div>
            {
                foundTrack || data?.data.result
                    ? <RenderTrackDetails data={foundTrack !== undefined ? foundTrack : data?.data.result} />
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
        <main>
            <RenderShareInfo share={share} />
            <RenderHubInfo hub={hub} />
            <a href={url}>Open Track In Shazam</a>
        </main>
    )

}

const RenderShareInfo = ({ share }) => {
    const { avatar, href, html, image, snapchat, subject } = share

    return (
        <div>
            <img src={avatar} width={290} height={220} alt={subject} />
            <h2>{subject}</h2>
            <img src={image} />
            <div>
                <a href={snapchat}>Open Track In SnapChat</a>
                <a href={href}>Listen To This Track</a>
                <a href={html}>Share Track</a>
            </div>
        </div>
    )
}

const RenderHubInfo = ({ hub }) => {
    const { actions, displayname, explicit, name } = hub
    const { uri } = actions[1]

    return (
        <div>
            <h2>{displayname}</h2>
            <a href={uri}>Open in {name}</a>
        </div>
    )
}

export default TrackDetail
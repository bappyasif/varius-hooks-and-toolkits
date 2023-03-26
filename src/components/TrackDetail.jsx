import React, { useContext } from 'react'
import { AppContext } from './appContext'

const TrackDetail = ({ track_key }) => {
    const appCtx = useContext(AppContext);
    const foundTrack = appCtx?.topTracks.find(track => track.key === track_key)
    console.log(foundTrack, "foundTrack", appCtx?.topTracks)
    return (
        <>
            <div>TrackDetail</div>
            {
                foundTrack
                    ? <RenderTrackDetails data={foundTrack} />
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
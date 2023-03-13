import Image from 'next/image'
import React from 'react'

export const RenderShazamData = ({ data }) => {
    const { genres, images, share, subtitle, title, url } = data
    const { primary } = genres
    const { background, coverart } = images
    const { avatar, href, image } = share

    return (
        <section
            
            style={{
                backgroundImage: `url('${coverart}')`,
                width: "fit-content",
                height: "fit-content",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                margin: "auto"
            }}
        >
            {/* <Image src={avatar} width={220} height={180} alt={`${title} by ${subtitle}`} /> */}
            <img className='rounded-xl' src={avatar} width={110} height={80} alt={`${title} by ${subtitle}`} />
            <div className='bg-blue-200 text-2xl opacity-80'>
                <h2 className='text-4xl py-4 px-2'>{title}</h2>
                <h3 className='text-3xl p-2'>By, {subtitle}</h3>
                <h4 className='text-xl px-2'>Genre: {primary}</h4>
            </div>
            <h5 className='text-white text-4xl px-3 py-2'>Some of their Photos: </h5>
            <p className='flex justify-center items-center gap-6 py-2'>
                {/* <Image src={image} width={220} height={180} alt={`${title} by ${subtitle}`} /> */}
                <img className='rounded-xl' src={image} width={220} height={180} alt={`${title} by ${subtitle}`} />
                {/* <Image src={background} width={220} height={180} alt={`${title} by ${subtitle}`} /> */}
                <img className='rounded-xl' src={background} width={220} height={180} alt={`${title} by ${subtitle}`} />
            </p>
            <h4 className='bg-blue-400 text-zinc-800 text-4xl px-2 py-4 m-auto opacity-90'>Listen to this Music from <a className='text-blue-600' target={"_blank"} href={href}>Shazam</a></h4>
        </section>
    )
}

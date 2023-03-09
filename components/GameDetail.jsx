import { secrets } from '@/secrets'
import { rapid_external_axios_request } from '@/utils/axios-interceptor'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React from 'react'
import { GoCloudUpload, GoHeart } from 'react-icons/go'

export const GameDetail = ({id}) => {
    console.log(id, "!!")
    const {data:detail, isError, isLoading, error} = useQuery({
        queryKey: ["game", `${id}`],
        queryFn: () => {
            return rapid_external_axios_request({url: `/games/${id}?key=${secrets.RAWG_API_KEY}`})
        }
    })

    console.log(detail?.data)
  return (
    detail?.data 
    ? 
    <>
        {/* rapid api does not have that in their implementation of that api */}
        {/* i tried directly fetching this data from browser got not found response back from rawg server */}
        {/* <RenderGameTrailers id={id} /> */}
        <RenderGameDetails item={detail?.data} />
    </>
     : null
  )
}

const RenderGameTrailers = ({id}) => {
    const {data} = useQuery({
        queryKey: ["game", `${id}`, "trailers"],
        queryFn: () => {
            return rapid_external_axios_request({url: `/games/${id}/youtube?key=${secrets.RAWG_API_KEY}`})
        }
    })

    console.log(data?.data, "trailers")
    return null
}

const RenderGameDetails = ({item}) => {
    const {name, id, description_raw, background_image, background_image_additional, released} = item;

    return (
        <article 
            style={{
                background: `url(${background_image_additional})`,
                backgroundSize: "cover",
                // backgroundRepeat: "no-repeat"
            }}
        >
            <h2>{name}</h2>
            <Image src={background_image} width={450} height={310} alt={name} />
            <h3>{released}</h3>
            <h4 className='bg-slate-400 text-3xl text-white opacity-90'>{description_raw}</h4>
            <div className='flex gap-6'>
                <button className='text-6xl flex items-center gap-4'><span>Love</span> <GoHeart /></button>
                <button  className='text-6xl flex items-center gap-4'>Wishlist <GoCloudUpload /></button>
            </div>
        </article>
    )

}
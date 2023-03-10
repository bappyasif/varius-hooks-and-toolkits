import { secrets } from '@/secrets'
import { axios_internal_api_request, rapid_external_axios_request } from '@/utils/axios-interceptor'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import React from 'react'
import { GoCloudUpload, GoHeart } from 'react-icons/go'

export const GameDetail = ({ id }) => {
    console.log(id, "!!")
    const { data: detail, isError, isLoading, error } = useQuery({
        queryKey: ["game", `${id}`],
        queryFn: () => {
            return rapid_external_axios_request({ url: `/games/${id}?key=${secrets.RAWG_API_KEY}` })
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

const RenderGameTrailers = ({ id }) => {
    const { data } = useQuery({
        queryKey: ["game", `${id}`, "trailers"],
        queryFn: () => {
            return rapid_external_axios_request({ url: `/games/${id}/youtube?key=${secrets.RAWG_API_KEY}` })
        }
    })

    console.log(data?.data, "trailers")
    return null
}

const RenderGameDetails = ({ item }) => {
    const { name, id, description_raw, background_image, background_image_additional, released } = item;

    const addToList = async (item, listName) => {
        return axios_internal_api_request({url:`/${listName}`, data: item, method: "post"}).then(() => console.log(`added to list ${listName}`)).catch(err => console.log("error occured....", err.message))
        // return axios.post(`http://localhost:4000/${listName}`, item).then(() => console.log(`added to list ${listName}`)).catch(err => console.log("error occured....", err.message))
    }

    const { mutate: addToFavourite } = useMutation({
        mutationKey: ["addToList", "favourites"],
        mutationFn: (newItem) => addToList(newItem, "favourites")
    })

    const handleAddToFavourite = () => addToFavourite({ id, name, description_raw, background_image, released })

    const { mutate: addToWishlist } = useMutation({
        mutationKey: ["addToList", "wishlist"],
        mutationFn: (newItem) => addToList(newItem, "wishlist")
    })

    const handleAddoToWishlist = () => addToWishlist({ id, name, description_raw, background_image, released })

    return (
        <article
            style={{
                background: `url(${background_image_additional})`,
                backgroundSize: "cover",
                // backgroundRepeat: "no-repeat"
            }}
        >
            <h2 className='text-4xl my-4'>{name}</h2>
            <Image src={background_image} width={450} height={310} alt={name} />
            <h3 className='text-4xl'>Released Date: {released}</h3>
            <div className='bg-slate-400 text-3xl text-white opacity-90'>
                <h4>{description_raw}</h4>
                <div className='flex gap-6'>
                    <button className='text-6xl flex items-center gap-4' onClick={handleAddToFavourite}><span>Love</span> <GoHeart /></button>
                    <button className='text-6xl flex items-center gap-4' onClick={handleAddoToWishlist}>Wishlist <GoCloudUpload /></button>
                </div>
            </div>
        </article>
    )

}
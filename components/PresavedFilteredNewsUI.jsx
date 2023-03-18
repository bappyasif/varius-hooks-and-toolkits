import { request_internal } from '@/utils/axios-interceptors'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { CiSquareRemove } from "react-icons/ci"
import { countriesCodes, possibleLanguages } from "../forNewsList"

export const PresavedFilteredNewsUI = ({ data, user, entireDataset }) => {
    const [filters, setFilters] = useState([]);
    const handleFilters = data => setFilters(data);

    useEffect(() => {
        handleFilters(data)
    }, [data])

    console.log(data, "DATA!!")

    const renderFilters = () => filters?.map((item, idx) => <RenderFilter key={idx} item={item} data={filters} user={user} handleFilters={handleFilters} entireDataset={entireDataset} />)
    // const renderFilters = () => data?.map((item, idx) => <RenderFilter key={idx} item={item} data={data} user={user} />)

    return (
        <section className='flex gap-8 flex-wrap'>
            {/* <h1>PresavedFilteredNewsUI</h1> */}
            {renderFilters()}
        </section>
    )
}

const RenderFilter = ({ item, data, user, handleFilters, entireDataset }) => {
    const { country, category, language } = item

    let lang = ""

    for (let key in possibleLanguages) {
        if (possibleLanguages[key] === language) {
            lang = key;
        }
    }

    const removedData = () => {
        const filtered = data.filter(item => !(item.country === country && item.category === category && item.language === language) ? item : null).filter(item => item)
        return filtered
    }

    const { mutate } = useMutation({
        mutationKey: ["remove from filters"],
        mutationFn: () => {
            const filtered = removedData()
            handleFilters(filtered)
            const updatedUserData = { [user]: filtered }

            entireDataset[user] = filtered

            console.log(entireDataset, updatedUserData, "<><><><>")

            return request_internal({ url: "/customNews", method: "post", data: entireDataset })

            // return request_internal({url: "/customNews", method: "post", data: {[user]: filtered}})
        }
    })

    const removeFilter = () => {
        // const filtered = data.filter(item => !(item.country === country && item.category === category && item.language === language) ? item : null).filter(item => item)
        // const filtered = removedData()
        // console.log(filtered, "filtered!!", item)
        mutate()
        // handleFilters(filtered)
    }

    return (
        <article className='my-2 outline-1 outline px-4 rounded-lg relative bg-slate-400 pb-1'>
            <CiSquareRemove onClick={removeFilter} className='text-4xl absolute right-0 text-slate-900  hover:text-red-900 hover:duration-1000 hover:animate-pulse' />
            <h2 className='flex flex-col gap-4 justify-center items-center mb-2 mt-8 px-2 pr-4'>
                <span className='flex justify-between w-full'><span>Country:</span> <span className='text-xl'>{countriesCodes[country.toUpperCase()]}</span></span>
                <span className='flex justify-between w-full'>Category: <span className='text-xl'>{category}</span></span>
                <span className='flex justify-between w-full'>Language: <span className='text-xl'>{lang}</span></span>
            </h2>
            <Link className='text-sm py-1 bg-zinc-600 px-2 rounded-lg text-white hover:bg-slate-900 hover:text-yellow-400 hover:duration-1000 hover:animate-pulse' href={`/presaved/${country}/${category}/${language}`}>See Current News On These Filters</Link>
        </article>
    )
}
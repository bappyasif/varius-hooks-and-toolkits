import Link from 'next/link'
import React from 'react'
import {CiSquareRemove} from "react-icons/ci"
import {countriesCodes, possibleLanguages} from "../forNewsList"

export const PresavedFilteredNewsUI = ({ data }) => {
    console.log(data, "DATA!!")
    const renderFilters = () => data?.map((item, idx) => <RenderFilter key={idx} item={item} />)
    return (
        <section className='flex gap-8 flex-wrap'>
            {/* <h1>PresavedFilteredNewsUI</h1> */}
            {renderFilters()}
        </section>
    )
}

const RenderFilter = ({ item }) => {
    const { country, category, language } = item

    let lang = ""

    for(let key in possibleLanguages) {
        if(possibleLanguages[key] === language) {
            lang = key;
        }
    }

    return (
        <article className='my-2 outline-1 outline px-4 rounded-lg relative bg-slate-400 pb-1'>
            <CiSquareRemove className='text-4xl absolute right-0 text-slate-900 hover:text-red-900' />
            <h2 className='flex flex-col gap-4 justify-center items-center mb-2 mt-8 px-2 pr-4'>
                <span className='flex justify-between w-full'><span>Country:</span> <span className='text-xl'>{countriesCodes[country.toUpperCase()]}</span></span>
                <span className='flex justify-between w-full'>Category: <span className='text-xl'>{category}</span></span>
                <span className='flex justify-between w-full'>Language: <span className='text-xl'>{lang}</span></span>
            </h2>
            <Link className='text-sm py-1 bg-zinc-600 px-2 rounded-lg text-white hover:bg-slate-900' href={`/presaved/${country}/${category}/${language}`}>See Current News On These Filters</Link>
        </article>
    )
}
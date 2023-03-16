import Link from 'next/link'
import React from 'react'

export const PresavedFilteredNewsUI = ({ data }) => {
    console.log(data, "DATA!!")
    const renderFilters = () => data?.map((item, idx) => <RenderFilter key={idx} item={item} />)
    return (
        <section className='flex gap-4'>
            {/* <h1>PresavedFilteredNewsUI</h1> */}
            {renderFilters()}
        </section>
    )
}

const RenderFilter = ({ item }) => {
    const { country, category, language } = item

    return (
        <article className='my-2 outline-1 outline px-4 rounded-lg'>
            <h2 className='flex flex-col gap-4 justify-center items-center mb-2'>
                <span className='flex justify-between w-full px-2'><span>Country:</span> <span>{country}</span></span>
                <span className='flex justify-between w-full px-2'>Category: <span>{category}</span></span>
                <span className='flex justify-between w-full px-2'>Language: <span>{language}</span></span>
            </h2>
            <Link className='text-sm' href={`/presaved/${country}/${category}/${language}`}>See Current News On this Filter</Link>
        </article>
    )
}
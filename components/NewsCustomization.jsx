import { countriesCodes, newsCategories, possibleLanguages } from '@/forNewsList';
import { useExtractPresavedFiltersForUser, useExtractSearcResults, useToAddPresavedFilters } from '@/hooks';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { RenderNewsArticles } from './RenderNewsArticles';

export const NewsCustomization = () => {
    const [newsFilters, setNewsFilters] = useState({})

    const [searchNow, setSearchNow] = useState(false)

    const [showTooltip, setShowTooltip] = useState(false)

    const [activateFunctionalities, setActivateFunctionlaities] = useState(false)

    const { data: sesisonUser, status} = useSession()

    const handleTooltipShow = () => setShowTooltip(true)

    const handleTooltipClose = () => setShowTooltip(false)

    const {presavedData} = useExtractPresavedFiltersForUser(sesisonUser?.user.name)

    const handleNewsFilters = (evt, elem) => setNewsFilters(prev => ({ ...prev, [elem]: evt.target.value }))

    const {searchedResults, isError, isLoading, error} = useExtractSearcResults(searchNow, setSearchNow, newsFilters)

    const handleSearch = () => {
        if (newsFilters["country"] && newsFilters["category"] && newsFilters["language"]) {
            setSearchNow(true)
        } else {
            alert("select all three options first and then click search for POSSIBLE news")
        }
    }

    const {mutate} = useToAddPresavedFilters(sesisonUser?.user.name, newsFilters, presavedData)

    const handleSaveCustomNewsFilters = () => {
        mutate()
    }

    useEffect(() => {
        if(
            (newsFilters?.category && newsFilters?.language && newsFilters?.country)
            &&
            (newsFilters?.category !== "Choose Category" && newsFilters?.language !== "Choose Language" && newsFilters?.country !== "Choose Country")
        ) {
            setActivateFunctionlaities(true)
        } else {
            setActivateFunctionlaities(false)
        }

    }, [newsFilters])

    return (
        <div className='w-full'>
            <div className='bg-slate-600 opacity-90'>
                <h1 style={{ letterSpacing: "11px", wordSpacing: "4px" }} className='text-2xl text-white text-center xs:hidden md:block'>Select All Three Options And Then Click Search For News</h1>
                <section className='flex xs:flex-col lg:flex-row md:gap-2 xs:gap-4 text-2xl my-6'>
                    <RenderListOfAllAvailableCountries handleNewsFilters={handleNewsFilters} />
                    <RenderListOfPossibleNewsLanguages handleNewsFilters={handleNewsFilters} />
                    <PossibleNewsCategoriesList handleNewsFilters={handleNewsFilters} />
                    <div 
                        style={{
                            pointerEvents: activateFunctionalities ? "auto" : "none"
                        }} 
                        className='flex gap-2 w-full'
                    >
                        <button disabled={activateFunctionalities ? false : true} onClick={handleSearch} className={`${activateFunctionalities ? "bg-blue-600 text-white hover:bg-blue-800" : "bg-blue-200 text-red-800"} w-full p-2 rounded-lg ${(!searchNow && !searchedResults?.data?.results.length && activateFunctionalities) ? "animate-pulse" : ""}`}>Search</button>

                        <button disabled={(sesisonUser?.user?.name && activateFunctionalities) ? false : true} onMouseEnter={handleTooltipShow} onMouseLeave={handleTooltipClose} onClick={handleSaveCustomNewsFilters} className={`${(sesisonUser?.user?.name && activateFunctionalities) ? "bg-blue-600 text-yellow-200 hover:bg-blue-800" : "bg-blue-200 text-yellow-600"}  p-2 w-full rounded-lg relative`}>Save Search</button>

                        { ( sesisonUser?.user?.name && activateFunctionalities && showTooltip) ? <span className='absolute bg-slate-400 top-6 right-4'>Save This Custom Filter</span> : ( !sesisonUser?.user?.name && activateFunctionalities ) ?  <span className='absolute bg-slate-400 top-6 right-8'>Login First To Save!!</span> : null}
                    </div>
                </section>
            </div>

            {isError ? <h2>Error Occured....</h2> : error?.message}
            <RenderSearchedNewsResults newsResults={searchedResults} searchNow={searchNow} />
        </div>
    )
}

export const RenderSearchedNewsResults = ({newsResults, searchNow}) => {
    return (
        newsResults?.data?.results.length
                    ? <RenderNewsArticles data={newsResults?.data.results} />
                    : searchNow
                        ? <h2 className='bg-slate-600 opacity-90 text-2xl text-white'>Loading Search Data</h2>
                        : <h2 className='bg-slate-600 opacity-90 text-2xl text-white'>Searched News Data Will Show Up In Here....</h2>
    )
}

export const PossibleNewsCategoriesList = ({ handleNewsFilters }) => {
    const renderList = () => newsCategories?.map(item => <RenderCategory key={item} name={item} />)
    return (
        <select className='w-min-1/4' onChange={e => handleNewsFilters(e, "category")} name="categories" id="news-categories" placeholder='Select Preferred News Categories'>
            <option value={null}>Choose Category</option>
            {renderList()}
        </select>
    )
}

const RenderCategory = ({ name }) => {
    return <option value={name}>{name}</option>
}

export const RenderListOfPossibleNewsLanguages = ({ handleNewsFilters }) => {
    const list = [];

    for (let key in possibleLanguages) {
        const obj = { country: key, code: possibleLanguages[key] }
        list.push(obj)
    }

    const renderList = () => list?.map(item => <RenderOption key={item.code} item={item} />)

    return (
        <select className='' onChange={e => handleNewsFilters(e, "language")} name="languages" id="language-list" placeholder='Select Language For News'>
            <option value={null}>Choose Language</option>
            {renderList()}
        </select>
    )
}

export const RenderListOfAllAvailableCountries = ({ handleNewsFilters }) => {
    const restructuredList = [];

    for (let key in countriesCodes) {
        const obj = { code: key.toLocaleLowerCase(), country: countriesCodes[key] }
        restructuredList.push(obj)
    }

    const renderList = () => restructuredList?.map(item => <RenderOption key={item.code} item={item} />)

    return (
        <select className='' onChange={e => handleNewsFilters(e, "country")} name="countries" id="country-list" placeholder='Select Country For News'>
            <option value={null}>Choose Country</option>
            {renderList()}
        </select>
    )
}

const RenderOption = ({ item }) => {
    const { code, country } = item

    return (
        <option value={code} label={country}>{country}</option>
    )
}
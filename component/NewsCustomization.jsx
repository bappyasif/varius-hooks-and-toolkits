import { countriesCodes, newsCategories, possibleLanguages } from '@/forNewsList';
import { news_data_request_interceptor } from '@/utils/axios-interceptors';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { RenderNewsArticles } from './RenderNewsArticles';

export const NewsCustomization = ({handleNews}) => {
    const [newsFilters, setNewsFilters] = useState({})
    const [searchNow, setSearchNow] = useState(false)

    const handleNewsFilters = (evt, elem) => setNewsFilters(prev => ({...prev, [elem]: evt.target.value}))

    const {data: customNews} = useQuery({
        queryKey: ["custom filtered news query"],
        queryFn: () => {
            const params = {country: newsFilters["country"], category: newsFilters["category"], language: newsFilters["language"]}
            return news_data_request_interceptor({url: "/news", params})
        },
        refetchOnWindowFocus: false,
        enabled: searchNow,
        onSuccess: () => {
            setSearchNow(false)
            // console.log(customNews?.data.results, "what what")
            // handleNews(customNews)
        },
        onError: () => setSearchNow(false),
    })

    const handleSearch = () => {
        console.log(newsFilters);
        if(newsFilters["country"] && newsFilters["category"] && newsFilters["language"]) {
            setSearchNow(true)
        } else {
            alert("select all three options first and then click search for POSSIBLE news")
        }
    }
    
    console.log(customNews, "<><>")

    return (
        <div>
            <h1>Select All Three Options And Then Click Search For News</h1>
            <section className='flex gap-4 text-4xl'>
                <RenderListOfAllAvailableCountries handleNewsFilters={handleNewsFilters} />
                <RenderListOfPossibleNewsLanguages handleNewsFilters={handleNewsFilters} />
                <PossibleNewsCategoriesList handleNewsFilters={handleNewsFilters} />
                <button onClick={handleSearch} className='bg-blue-600 p-2 rounded-lg'>Search</button>
            </section>
            <RenderNewsArticles data={customNews?.data.results} />
        </div>
    )
}

const PossibleNewsCategoriesList = ({handleNewsFilters}) => {
    const renderList = () => newsCategories?.map(item => <RenderCategory key={item} name={item} />)
    return (
        <select onChange={e => handleNewsFilters(e, "category")} name="categories" id="news-categories" placeholder='Select Preferred News Categories'>
            <option value={null}>Choose Preferred News Category</option>
            {renderList()}
        </select>
    )
}

const RenderCategory = ({ name }) => {
    return <option value={name}>{name}</option>
}

const RenderListOfPossibleNewsLanguages = ({handleNewsFilters}) => {
    const list = [];

    for (let key in possibleLanguages) {
        const obj = { country: key, code: possibleLanguages[key] }
        list.push(obj)
    }

    const renderList = () => list?.map(item => <RenderOption key={item.code} item={item} />)

    return (
        <select onChange={e => handleNewsFilters(e, "language")} name="languages" id="language-list" placeholder='Select Language For News'>
            <option value={null}>Choose Possible Language For Your News</option>
            {renderList()}
        </select>
    )
}

const RenderListOfAllAvailableCountries = ({handleNewsFilters}) => {
    const restructuredList = [];

    for (let key in countriesCodes) {
        const obj = { code: key.toLocaleLowerCase(), country: countriesCodes[key] }
        restructuredList.push(obj)
    }

    const renderList = () => restructuredList?.map(item => <RenderOption key={item.code} item={item} />)

    return (
        <select onChange={e => handleNewsFilters(e, "country")} name="countries" id="country-list" placeholder='Select Country For News'>
            <option value={null}>Choose Country For News</option>
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
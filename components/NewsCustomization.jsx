import { countriesCodes, newsCategories, possibleLanguages } from '@/forNewsList';
import { news_data_request_interceptor, request_internal } from '@/utils/axios-interceptors';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { RenderNewsArticles } from './RenderNewsArticles';

export const NewsCustomization = ({ handleNews }) => {
    const [newsFilters, setNewsFilters] = useState({})

    const [searchNow, setSearchNow] = useState(false)

    const [sesisonUser, setSessionUser] = useState(null)

    // const [refetchPresaved, setRefetchPresaved] = useState(false);

    // const [presavedData, setPresavedData] = useState(null)

    const extractSessionData = () => {
        getSession().then(data => setSessionUser(data)).catch(err => console.log(err))
    }

    const extractUserPresavedData = () => {
        return request_internal({ url: "customNews", method: "get" })
        // .then(data => setPresavedData(data?.data)).catch(err => console.log(err))
    }

    const { data: presavedData } = useQuery({
        queryKey: ["presaved filters data", `${sesisonUser?.user?.name}`],
        queryFn: extractUserPresavedData,
        // enabled: (sesisonUser?.user || newsFilters) ? true : false,
        // enabled: (newsFilters) ? true : false,
        // enabled: refetchPresaved,
        // enabled: (newsFilters || refetchPresaved) ? true : false,
        refetchOnWindowFocus: false
    })

    const handleNewsFilters = (evt, elem) => setNewsFilters(prev => ({ ...prev, [elem]: evt.target.value }))

    const { data: customNews } = useQuery({
        queryKey: ["custom filtered news query"],
        queryFn: () => {
            const params = { country: newsFilters["country"], category: newsFilters["category"], language: newsFilters["language"] }
            return news_data_request_interceptor({ url: "/news", params })
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
        if (newsFilters["country"] && newsFilters["category"] && newsFilters["language"]) {
            setSearchNow(true)
        } else {
            alert("select all three options first and then click search for POSSIBLE news")
        }
    }

    // const beforeStoringFiltersData = () => {
    //     // if(Object.keys(presavedData?.data)[0] === sesisonUser?.user?.name)
    //     if (presavedData?.data) {
    //         const idx = Object.keys(presavedData?.data).findIndex(item => item === sesisonUser?.user?.name)
    //         console.log(idx, "idx!!", presavedData?.data[sesisonUser?.user?.name], newsFilters)
    //         if (idx !== -1) {
    //             // presavedData?.data[sesisonUser?.user?.name].filter(item => console.log("country", item?.country, newsFilters.country, "langugae", item?.language, newsFilters.language, "category", item?.category, newsFilters.category))
    //             // const filtered = presavedData?.data[sesisonUser?.user?.name].filter(item => item?.country !== newsFilters.country && item?.language !== newsFilters.language && item?.category !== newsFilters.category)
    //             const filtered = presavedData?.data[sesisonUser?.user?.name].filter(item => item?.country !== newsFilters.country || item?.language !== newsFilters.language || item?.category !== newsFilters.category)
    //             console.log(filtered, "!!")
    //             const newData = [...filtered, newsFilters]
    //             console.log(newData, "newDAta!!")
    //             return { [sesisonUser?.user?.name]: newData }
    //             // return newData
    //         } else {
    //             const newData = [presavedData?.data, { [sesisonUser?.user?.name]: [newsFilters] }]
    //             console.log(newData, "NEW USER NEW DATA!!", { [sesisonUser?.user?.name]: [newsFilters] })
    //             // return presavedData.data
    //             return newData

    //             // return {[sesisonUser?.user?.name]: newData}
    //         }
    //     }
    //     // else {
    //     //     return presavedData?.data[sesisonUser?.user?.name]
    //     // }
    // }

    // const { mutate } = useMutation({
    //     mutationKey: ["save search"],
    //     mutationFn: () => {
    //         // console.log({ [sesisonUser?.expires]: [newsFilters]}, "!!<><>!!")
    //         // console.log(presavedData?.data, "<><>!!!!", Object.keys(presavedData?.data)[0], Object.keys(presavedData?.data)[0] === sesisonUser?.user?.name)
    //         // return request_internal({url: "/customNews", data: newsFilters, method: "post"})
    //         const data = beforeStoringFiltersData()
    //         return data ? request_internal({ url: "/customNews", data: data, method: "post" }) : null

    //         // setRefetchPresaved(true)
    //         // return data ? request_internal({ url: "/customNews", data: { [sesisonUser?.user?.name]: beforeStoringFiltersData() }, method: "post" }) : null
    //         // return request_internal({url: "/customNews", data: { [sesisonUser?.user?.name]: [newsFilters]}, method: "post"})
    //     }
    // })

    // const { mutate } = useMutation({
    //     mutationKey: ["add new data into customNews list", `${sesisonUser?.user.name}`],
    //     mutationFn: () => {
    //         const data = Object.values(presavedData?.data);
    //         const idx = data.findIndex(item => Object.keys(item)[0] === sesisonUser?.user.name)
            
    //         console.log(data, idx);
    //         let newData = [];

    //         if (idx === -1) {
    //             newData = [ ...presavedData?.data, { [sesisonUser?.user?.name]: [newsFilters] } ]
    //             console.log(newData, "NEW DATA")
    //         } else {
    //             const userData = presavedData?.data[idx][sesisonUser?.user?.name]
                
    //             const filtered = userData.filter(item => item?.country !== newsFilters.country || item?.language !== newsFilters.language || item?.category !== newsFilters.category)
    //             console.log(filtered, "filtered")
                
    //             const afterFilter = [...filtered, newsFilters]

    //             presavedData.data.forEach(item => {
    //                 if(Object.keys(item)[0] === sesisonUser?.user.name) {
    //                     item[sesisonUser?.user.name] = afterFilter
    //                 }
    //             })

    //             newData = presavedData.data

    //             console.log(newData, "NEW DATA AFTER FILTER")
    //         }

    //         return request_internal({url: "/customNews", data: { [sesisonUser?.user?.name]: [newsFilters]}, method: "post"})

    //         return request_internal({url: "/customNews", data: {newData}, method: "post"})
    //     }
    // })

    // const { mutate } = useMutation({
    //     mutationKey: ["add new data into customNews list", `${sesisonUser?.user.name}`],

    //     mutationFn: () => {
    //         const data = Object.values(presavedData?.data);
    //         const idx = data.findIndex(item => Object.keys(item)[0] === sesisonUser?.user.name)
            
    //         console.log(data, idx, presavedData?.data);
    //         let newData = [];

    //         if (idx === -1) {
    //             // newData = [ ...presavedData?.data, { [sesisonUser?.user?.name]: [newsFilters] } ]
    //             newData = [newsFilters]
    //             console.log(newData, "NEW DATA")
    //         } else {
    //             const userData = presavedData?.data[idx][sesisonUser?.user?.name]
                
    //             const filtered = userData.filter(item => item?.country !== newsFilters.country || item?.language !== newsFilters.language || item?.category !== newsFilters.category)
    //             console.log(filtered, "filtered")
                
    //             const afterFilter = [...filtered, newsFilters]

    //             // presavedData.data.forEach(item => {
    //             //     if(Object.keys(item)[0] === sesisonUser?.user.name) {
    //             //         item[sesisonUser?.user.name] = afterFilter
    //             //     }
    //             // })

    //             newData = afterFilter

    //             console.log(newData, "NEW DATA AFTER FILTER", { [sesisonUser?.user?.name]: newData})
    //         }

    //         // return request_internal({url: "/customNews", data: { [sesisonUser?.user?.name]: newData }, method: "post"})
    //     }
    // })

    // const { mutate } = useMutation({
    //     mutationKey: ["add new data into customNews list", `${sesisonUser?.user.name}`],

    //     mutationFn: () => {
    //         const keys = Object.keys(presavedData.data)
    //         const idx = keys.findIndex(key => key === sesisonUser?.user.name)
            
    //         console.log(presavedData.data, keys, idx)

    //         let newData = []

    //         if(idx !== -1) {
    //             const userData = presavedData.data[sesisonUser?.user.name]
    //             const filtered = userData.filter(item => item?.country !== newsFilters.country || item?.language !== newsFilters.language || item?.category !== newsFilters.category)
    //             newData = [...filtered, newsFilters]
    //             console.log(userData, filtered, newData)
    //         } else {
    //             newData = [newsFilters]
    //             console.log(newData)
    //         }
            
    //         return request_internal({url: "/customNews", data: { [sesisonUser?.user?.name]: newData }, method: "post"})
    //     }
    // })

    const { mutate } = useMutation({
        mutationKey: ["add new data into customNews list", `${sesisonUser?.user.name}`],

        mutationFn: () => {
            const keys = Object.keys(presavedData.data)
            const idx = keys.findIndex(key => key === sesisonUser?.user.name)
            
            console.log(presavedData.data, keys, idx)

            let newData = []

            if(idx !== -1) {
                const userData = presavedData.data[sesisonUser?.user.name]
                const filtered = userData.filter(item => item?.country !== newsFilters.country || item?.language !== newsFilters.language || item?.category !== newsFilters.category)
                const updatedUserData = [...filtered, newsFilters]
                // newData = {[sesisonUser.user.name] : [...filtered, newsFilters]}
                presavedData.data[sesisonUser.user.name] = updatedUserData
                newData = presavedData.data
                // newData = {[sesisonUser.user.name] : [...filtered, newsFilters]}
                // console.log(userData, filtered, newData)
            } else {
                presavedData.data[sesisonUser.user.name] = [newsFilters]
                newData = presavedData.data
                // console.log(newData)
            }
            
            // console.log(newData, presavedData.data, {...newData})
            return request_internal({url: "/customNews", data: newData, method: "post"})
            // return request_internal({url: "/customNews", data: newData, method: "post"})
        }
    })

    const handleSaveCustomNewsFilters = () => {
        // setRefetchPresaved(true)
        console.log(newsFilters, "save custom", sesisonUser, presavedData);
        mutate()
    }

    useEffect(() => {
        extractSessionData()
        // extractUserPresavedData();
    }, [])

    customNews?.data?.results?.length && console.log(customNews, "<><>")

    return (
        <div className='w-full'>
            <h1 style={{letterSpacing: "11px", wordSpacing: "4px"}} className='text-2xl text-center'>Select All Three Options And Then Click Search For News</h1>
            <section className='flex gap-4 text-2xl my-6'>
                <RenderListOfAllAvailableCountries handleNewsFilters={handleNewsFilters} />
                <RenderListOfPossibleNewsLanguages handleNewsFilters={handleNewsFilters} />
                <PossibleNewsCategoriesList handleNewsFilters={handleNewsFilters} />
                <button onClick={handleSearch} className='bg-blue-600 p-2 rounded-lg w-1/4 text-white hover:bg-blue-800'>Search</button>
                <button disabled={sesisonUser?.user?.name ? false : true} onClick={handleSaveCustomNewsFilters} className={`${sesisonUser?.user?.name ? "bg-blue-600 text-yellow-200" : "bg-blue-200 text-yellow-600"}  p-2 rounded-lg w-1/4 hover:${sesisonUser?.user?.name ? "bg-blue-800" : ""}`}>Save Search</button>
            </section>
            <RenderNewsArticles data={customNews?.data.results} />
        </div>
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
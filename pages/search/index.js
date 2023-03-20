import { NewsSearchUI } from '@/components/NewsSearchUI'
import { news_data_request_interceptor } from '@/utils/axios-interceptors'
import { useQuery } from '@tanstack/react-query'
import { RenderNewsArticles } from '../../components/RenderNewsArticles';
import React, { useState } from 'react'
import { RenderSearchedNewsResults } from '@/components/NewsCustomization';
import { useExtractSearcResults } from '@/hooks';

const NewsSearch = () => {
    const [searchNow, setSearchNow] = useState(false)
    const [searchData, setSearchData] = useState(null)
    const handleChanges = (evt, elem) => setSearchData(prev => ({ ...prev, [elem]: evt.target.value }))

    const handleSearch = () => {
        // console.log(searchData, "!!");
        setSearchNow(true);
    }

    // const fetchNews = () => {
    //     const typeSelection = searchData?.type === "Search With Query String" ? "q" : searchData?.type === "Search By News Title" ? "qInTitle" : "q"
        
    //     const ccSpilts = searchData?.countryCode?.split(",");
    //     const countryCodes = ccSpilts?.map(v => v.trim())?.join(",")

    //     // const params = { [typeSelection]: encodeURIComponent(searchData?.searchStr), country: countryCodes }
    //     const params = { [typeSelection]: `${searchData?.searchStr}`, country: countryCodes }

    //     return news_data_request_interceptor({ url: "/news", params })
    // }

    // const { data: searchResults, isLoading, isError, error } = useQuery({
    //     queryKey: ["search news with string"],
    //     queryFn: fetchNews,
    //     onSuccess: () => setSearchNow(false),
    //     onError: () => setSearchNow(false),
    //     refetchOnWindowFocus: false,
    //     enabled: searchNow
    // })

    const fetchNewsOptions = () => {
        const typeSelection = searchData?.type === "Search With Query String" ? "q" : searchData?.type === "Search By News Title" ? "qInTitle" : "q"
        
        const ccSpilts = searchData?.countryCode?.split(",");
        
        const countryCodes = ccSpilts?.map(v => v.trim())?.join(",")

        const params = { [typeSelection]: `${searchData?.searchStr}`, country: countryCodes }

        return params
    }

    const {searchedResults, isError, isLoading, error} = useExtractSearcResults(searchNow, setSearchNow, searchData, fetchNewsOptions(), true)

    // console.log(searchResults, "searchResults!!")

    return (
        <main className='w-full'>
            <NewsSearchUI searchStr={searchData?.searchStr} searchType={searchData?.type} handleChanges={handleChanges} handleSearch={handleSearch} />
            {(searchNow && isLoading) ? <h2 className='bg-slate-600 opacity-90 text-2xl'>Loading News....</h2> : null}
            {isError ? <h2 className='bg-slate-600 opacity-90 text-2xl'>Error Occured....</h2> : error?.message}
            <RenderSearchedNewsResults searchNow={searchNow} newsResults={searchedResults} />
            {/* <RenderSearchedNewsResults searchNow={searchNow} newsResults={searchResults} /> */}
            {/* <RenderNewsArticles data={searchNow ? [] : searchResults?.data.results} /> */}
        </main>
    )
}

export default NewsSearch
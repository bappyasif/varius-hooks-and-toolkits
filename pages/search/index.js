import { NewsSearchUI } from '@/components/NewsSearchUI'
import { news_data_request_interceptor } from '@/utils/axios-interceptors'
import { useQuery } from '@tanstack/react-query'
import { RenderNewsArticles } from '../../components/RenderNewsArticles';
import React, { useState } from 'react'

const NewsSearch = () => {
    const [searchNow, setSearchNow] = useState(false)
    const [searchData, setSearchData] = useState(null)
    const handleChanges = (evt, elem) => setSearchData(prev => ({ ...prev, [elem]: evt.target.value }))

    const handleSearch = () => {
        // console.log(searchData, "!!");
        setSearchNow(true);
    }

    const fetchNews = () => {
        const typeSelection = searchData?.type === "Search With Query String" ? "q" : searchData?.type === "Search By News Title" ? "qInTitle" : "q"
        
        const ccSpilts = searchData?.countryCode?.split(",");
        const countryCodes = ccSpilts?.map(v => v.trim())?.join(",")

        // const params = { [typeSelection]: encodeURIComponent(searchData?.searchStr), country: countryCodes }
        const params = { [typeSelection]: `${searchData?.searchStr}`, country: countryCodes }

        return news_data_request_interceptor({ url: "/news", params })
    }

    const { data: searchResults, isLoading, isError, error } = useQuery({
        queryKey: ["search news with string"],
        queryFn: fetchNews,
        onSuccess: () => setSearchNow(false),
        onError: () => setSearchNow(false),
        refetchOnWindowFocus: false,
        enabled: searchNow
    })

    // console.log(searchResults, "searchResults!!")

    return (
        <main className='w-full'>
            <NewsSearchUI searchType={searchData?.type} handleChanges={handleChanges} handleSearch={handleSearch} />
            {(searchNow && isLoading) ? <h2>Loading News....</h2> : null}
            {isError ? <h2>Error Occured....</h2> : error?.message}
            <RenderNewsArticles data={searchNow ? [] : searchResults?.data.results} />
        </main>
    )
}

export default NewsSearch
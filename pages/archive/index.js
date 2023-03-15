import { NewsArchiveUI } from '@/components/NewsArchiveUI'
import { RenderNewsArticles } from '@/components/RenderNewsArticles'
import { news_data_request_interceptor } from '@/utils/axios-interceptors'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

const NewsArchive = () => {
    const [searchNow, setSearchNow] = useState(false)
    const [searchData, setSearchData] = useState(null)
    const handleChanges = (evt, elem) => setSearchData(prev => ({ ...prev, [elem]: evt.target.value }))

    const handleSearch = () => {
        console.log(searchData, "!!");
        setSearchNow(true);
    }

    const fetchNewsData = () => {
        const typeSelection = searchData?.type === "Search With Query String" ? "q" : searchData?.type === "Search By News Title" ? "qInTitle" : null
        const params = { country: searchData["country"], category: searchData["category"], language: searchData["language"], [typeSelection]: searchData?.searchStr, from_date: searchData?.From, to_date: searchData?.To }
        return news_data_request_interceptor({ url: "/news", params })

        // archive endpoint requires paid subscription
        // return news_data_request_interceptor({ url: "/archive", params })
    }

    const { data: searchResults, isLoading, isError, error } = useQuery({
        queryKey: ["search news with string"],
        queryFn: fetchNewsData,
        onSuccess: () => setSearchNow(false),
        onError: () => setSearchNow(false),
        refetchOnWindowFocus: false,
        enabled: searchNow
    })

    console.log(searchResults?.data?.results, "searchResults?.data?.results", searchResults?.data)

    return (
        <main className='px-2'>
            NewsArchive
            <NewsArchiveUI searchType={searchData?.type} handleChanges={handleChanges} handleSearch={handleSearch} />
            <div>
                {(searchNow && isLoading) ? <h2>Loading News....</h2> : null}
                {isError ? <h2>Error Occured....</h2> : error?.message}
                <RenderNewsArticles data={searchNow ? [] : searchResults?.data?.results} />
            </div>
        </main>
    )
}

export default NewsArchive
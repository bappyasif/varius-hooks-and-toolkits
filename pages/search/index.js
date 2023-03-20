import { NewsSearchUI } from '@/components/NewsSearchUI'
import React, { useState } from 'react'
import { RenderSearchedNewsResults } from '@/components/NewsCustomization';
import { useExtractSearcResults } from '@/hooks';

const NewsSearch = () => {
    const [searchNow, setSearchNow] = useState(false)
    const [searchData, setSearchData] = useState(null)
    const handleChanges = (evt, elem) => setSearchData(prev => ({ ...prev, [elem]: evt.target.value }))

    const handleSearch = () => {
        setSearchNow(true);
    }

    const fetchNewsOptions = () => {
        const typeSelection = searchData?.type === "Search With Query String" ? "q" : searchData?.type === "Search By News Title" ? "qInTitle" : "q"
        
        const ccSpilts = searchData?.countryCode?.split(",");
        
        const countryCodes = ccSpilts?.map(v => v.trim())?.join(",")

        const params = { [typeSelection]: `${searchData?.searchStr}`, country: countryCodes }

        return params
    }

    const {searchedResults, isError, isLoading, error} = useExtractSearcResults(searchNow, setSearchNow, searchData, fetchNewsOptions(), true)

    return (
        <main className='w-full'>
            <NewsSearchUI searchStr={searchData?.searchStr} searchType={searchData?.type} handleChanges={handleChanges} handleSearch={handleSearch} />
            {(searchNow && isLoading) ? <h2 className='bg-slate-600 opacity-90 text-2xl'>Loading News....</h2> : null}
            {isError ? <h2 className='bg-slate-600 opacity-90 text-2xl'>Error Occured....</h2> : error?.message}
            <RenderSearchedNewsResults searchNow={searchNow} newsResults={searchedResults} />
        </main>
    )
}

export default NewsSearch
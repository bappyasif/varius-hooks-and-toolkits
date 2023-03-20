import { NewsArchiveUI } from '@/components/NewsArchiveUI'
import { RenderSearchedNewsResults } from '@/components/NewsCustomization'
import { useExtractSearcResults } from '@/hooks'
import React, { useState } from 'react'

const NewsArchive = () => {
    const [searchNow, setSearchNow] = useState(false)
    const [searchData, setSearchData] = useState(null)
    const handleChanges = (evt, elem) => setSearchData(prev => ({ ...prev, [elem]: evt.target.value }))

    const handleSearch = () => {
        console.log(searchData, "!!");
        setSearchNow(true);
    }

    const fetchNewsDataOptions = () => {
        const typeSelection = searchData?.type === "Search With Query String" ? "q" : searchData?.type === "Search By News Title" ? "qInTitle" : null
        const params = { [typeSelection]: searchData?.searchStr, from_date: searchData?.From, to_date: searchData?.To }
        return params
    }

    const { searchedResults, isError, isLoading, error } = useExtractSearcResults(searchNow, setSearchNow, searchData, fetchNewsDataOptions())

    return (
        <main className='px-2'>
            <NewsArchiveUI searchType={searchData?.type} handleChanges={handleChanges} handleSearch={handleSearch} />
            <div>
                {(searchNow && isLoading) ? <h2>Loading News....</h2> : null}
                {isError ? <h2>Error Occured....</h2> : error?.message}
                <RenderSearchedNewsResults searchNow={searchNow} newsResults={searchedResults} />
            </div>
        </main>
    )
}

export default NewsArchive
import { ButtonElement, InputElement, SelectWhichSearchType } from '@/components/forSearch';
import React, { useState } from 'react'

const SearchThings = () => {
    const [searchFor, setSearchFor] = useState({type: "-1"});
    const handleSearchText = (evt) => setSearchFor(prev => ({ ...prev, query: evt.target.value }))
    const handleWhichSearchType = (val) => setSearchFor(prev => ({ ...prev, type: val }))

    console.log(searchFor, "searchFor!!")

    return (
        <main>
            <div>SearchThings</div>
            <div className='flex gap-4 text-4xl'>
                <SelectWhichSearchType handleWhichSearchType={handleWhichSearchType} />
                <InputElement handleSearchText={handleSearchText} searchType={searchFor?.type} />
                <ButtonElement handleClick={null} query={searchFor?.query} type={searchFor?.type} />
            </div>
        </main>
    )
}

export default SearchThings
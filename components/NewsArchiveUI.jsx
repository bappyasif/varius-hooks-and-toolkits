import React, { useState } from 'react'
import { PossibleNewsCategoriesList, RenderListOfAllAvailableCountries, RenderListOfPossibleNewsLanguages } from './NewsCustomization'
import { AdditionalSearchLogic, ChooseSearchType, SearchForm } from './NewsSearchUI';

export const NewsArchiveUI = ({ searchType, handleChanges, handleSearch }) => {
    // const [newsFilters, setNewsFilters] = useState({});
    // const handleNewsFilters = (evt, elem) => setNewsFilters(p    rev => ({ ...prev, [elem]: evt.target.value }))

    return (
        <section className='text-2xl mb-11'>
            <h1>Choose From These Filters To Extract Searched Query With Most Relevance!!</h1>
            <div className='flex gap-4 text-2xl my-6 h-11 justify-between'>
                <RenderListOfAllAvailableCountries handleNewsFilters={handleChanges} />
                <RenderListOfPossibleNewsLanguages handleNewsFilters={handleChanges} />
                <PossibleNewsCategoriesList handleNewsFilters={handleChanges} />
                <TimeAndDateComponent handleChanges={handleChanges} />
            </div>
            {/* <TimeAndDateComponent handleChanges={handleChanges} /> */}
            <div className='flex gap-4 text-2xl my-6 h-11'>
                <ChooseSearchType handleChanges={handleChanges} />
                <AdditionalSearchLogic searchType={searchType} handleChanges={handleChanges} />
                <SearchForm handleChanges={handleChanges} handleSearch={handleSearch} />
            </div>
        </section>
    )
}

const TimeAndDateComponent = ({ handleChanges }) => {
    // const [stamp, setStamp] = useState("");
    const items = ["From", "To"];
    const renderItems = () => items?.map(item => <RenderStamp key={item} handleChanges={handleChanges} item={item} />)
    return (
        <section className='flex gap-4'>
            {renderItems()}
        </section>
    )
}

const RenderStamp = ({ item, handleChanges }) => {
    return (
        <fieldset>
            <label className='mr-2' htmlFor={item}>{item}: </label>
            <input className='h-11' onChange={e => handleChanges(e, item)} type="date" />
        </fieldset>
    )
}
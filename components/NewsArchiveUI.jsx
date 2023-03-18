import React, { useState } from 'react'
import { PossibleNewsCategoriesList, RenderListOfAllAvailableCountries, RenderListOfPossibleNewsLanguages } from './NewsCustomization'
import { AdditionalSearchLogic, ChooseSearchType, SearchForm } from './NewsSearchUI';

export const NewsArchiveUI = ({ searchType, handleChanges, handleSearch }) => {

    return (
        <section className='text-2xl mb-11 bg-slate-400 opacity-90 lg:pb-1'>
            <h1 style={{letterSpacing: "4px", wordSpacing: "4px"}} className='text-2xl text-center xs:hidden lg:block'>Choose From These Filters To Extract Searched News Query With Most Relevance!!</h1>
            <div className='flex xs:flex-col lg:flex-row gap-4 text-2xl my-6 xs:h-fit lg:h-11 justify-between'>
                <RenderListOfAllAvailableCountries handleNewsFilters={handleChanges} />
                <RenderListOfPossibleNewsLanguages handleNewsFilters={handleChanges} />
                <PossibleNewsCategoriesList handleNewsFilters={handleChanges} />
                <TimeAndDateComponent handleChanges={handleChanges} />
            </div>
            {/* <TimeAndDateComponent handleChanges={handleChanges} /> */}
            <div className='flex xs:flex-col lg:flex-row justify-center gap-4 text-2xl my-6 xs:h-fit lg:h-11 w-full'>
                <ChooseSearchType handleChanges={handleChanges} />
                <AdditionalSearchLogic searchType={searchType} handleChanges={handleChanges} />
                <SearchForm forArchive={true} handleChanges={handleChanges} handleSearch={handleSearch} />
            </div>
        </section>
    )
}

const TimeAndDateComponent = ({ handleChanges }) => {
    // const [stamp, setStamp] = useState("");
    const items = ["From", "To"];
    const renderItems = () => items?.map(item => <RenderStamp key={item} handleChanges={handleChanges} item={item} />)
    return (
        <section className='flex gap-4 xs:flex-col sm:flex-row'>
            {renderItems()}
        </section>
    )
}

const RenderStamp = ({ item, handleChanges }) => {
    return (
        <fieldset>
            <label className='mr-2 text-lg' htmlFor={item}>{item}: </label>
            <input className='h-11' onChange={e => handleChanges(e, item)} type="date" />
        </fieldset>
    )
}
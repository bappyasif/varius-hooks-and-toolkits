import React, { useState } from 'react'

export const NewsSearchUI = ({handleChanges, handleSearch}) => {
    // const [searchData, setSearchData] = useState(null)
    // const handleChanges = (evt, elem) => setSearchData(prev => ({...prev, [elem]: evt.target.value}))
    // const handleSearch = () => console.log(searchData)
  return (
    <section className='flex gap-4 text-2xl my-6'>
        <ChooseSearchType handleChanges={handleChanges} />
        <SearchForm handleChanges={handleChanges} handleSearch={handleSearch} />
    </section>
  )
}

const ChooseSearchType = ({handleChanges}) => {
    const options = ["Search By News Title", "Search With Query String"];
    const renderOptions = () => options.map(name => <RenderOption key={name} name={name} />)

    return (
        <select className='outline-double' onChange={(e) => handleChanges(e, "type")}>
            <option value={-1}>Choose News Search Type</option>
            {renderOptions()}
        </select>
    )
}

const RenderOption = ({name}) => {
    return (
        <option selected={name === "Search With Query String"} value={name}>{name}</option>
    )
}

const SearchForm = ({ handleChanges, handleSearch}) => {
    const handleSubmit = evt => {
        evt.preventDefault();
        handleSearch()
    }
    return (
        <form className='flex items-center gap-6' method='post' onSubmit={handleSubmit}>
            <fieldset>
                <label htmlFor='search'></label>
                <input className='px-2 outline-double' onChange={e => handleChanges(e, "searchStr")} type={"text"} id={"search"} placeholder={`Search News With Query`} />
            </fieldset>
            <button className='outline-double bg-blue-600 px-4 rounded-lg' type='submit'>Search</button>
        </form>
    )
}
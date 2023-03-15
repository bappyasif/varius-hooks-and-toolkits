import React, { useEffect, useState } from 'react'

export const NewsSearchUI = ({ searchType, handleChanges, handleSearch }) => {
    return (
        <section className='flex gap-4 text-2xl my-6 mb-8 h-11'>
            <ChooseSearchType handleChanges={handleChanges} />
            <AdditionalSearchLogic searchType={searchType} handleChanges={handleChanges} />
            <SearchForm handleChanges={handleChanges} handleSearch={handleSearch} />
        </section>
    )
}

export const AdditionalSearchLogic = ({ searchType, handleChanges }) => {
    const [filter, setFilter] = useState();

    const forQ = ["Keyword", "Phrase", "With NOT", "With AND", "With OR", "AND with NOT", "OR with NOT", "Multiple AND", "Multiple OR"]
    const forQInTitle = ["Keyword or Phrase"]

    const options = searchType === "Search By News Title" ? forQInTitle : searchType === "Search With Query String" ? forQ : []

    const renderOptions = () => options?.map(name => <RenderOption key={name} name={name} />)

    const handleChange = (evt) => {
        handleChanges(evt, "additionalFilters")
        setFilter(evt.target.value)
    }

    // className='flex flex-col gap-4 items-center'
    return (
        <div className='relative'>
            <select className='text-2xl outline-double h-11' onChange={handleChange} name="additional search filter" id="additional filters">
                <option value={-1}>Choose Any Additional Filter</option>
                {renderOptions()}
            </select>
            <ShowAdditionalFilterExample filter={filter} />
        </div>
    )
}

const ShowAdditionalFilterExample = ({ filter }) => {
    const [example, setExample] = useState(null)

    const handleExample = text => setExample(text)

    const decideFilterExample = () => {
        if (filter === "Keyword") {
            handleExample("Social")
        } else if (filter === "Phrase") {
            handleExample("Social Media")
        } else if (filter === "With NOT") {
            handleExample("Social -Pizza")
        } else if (filter === "With AND") {
            handleExample("Social AND Pizza")
        } else if (filter === "With OR") {
            handleExample("Social OR Pizza")
        } else if (filter === "AND with NOT") {
            handleExample("Social AND Pizza -Pasta")
        } else if (filter === "OR with NOT") {
            handleExample("Social OR Pizza -Pasta")
        } else if (filter === "Multiple AND") {
            handleExample("Social AND Pizza AND Pasta")
        } else if (filter === "Multiple OR") {
            handleExample("Social OR Pizza OR Pasta")
        } else if (filter === "Keyword or Phrase") {
            handleExample("Social Media Stonks!!")
        }
    }

    useEffect(() => {
        decideFilterExample()
    }, [filter])

    return <h2 className='absolute text-sm'><span>Example: </span><span>"{example}"</span></h2>
}

export const ChooseSearchType = ({ handleChanges }) => {
    const options = ["Search By News Title", "Search With Query String"];
    const renderOptions = () => options.map(name => <RenderOption key={name} name={name} />)

    return (
        <select className='outline-double h-11' onChange={(e) => handleChanges(e, "type")}>
            <option value={-1}>Choose News Search Type</option>
            {renderOptions()}
        </select>
    )
}

const RenderOption = ({ name }) => {
    return (
        <option defaultValue={name === "Search With Query String"} value={name}>{name}</option>
    )
}

export const SearchForm = ({ handleChanges, handleSearch }) => {
    const handleSubmit = evt => {
        evt.preventDefault();
        handleSearch()
    }
    return (
        <form className='flex justify-between items-center w-full gap-4' method='post' onSubmit={handleSubmit}>
            <fieldset>
                <label htmlFor='search'></label>
                <input className='px-2 outline-double h-11' onChange={e => handleChanges(e, "searchStr")} type={"text"} id={"search"} placeholder={`Search News With Query....`} />
            </fieldset>
            <button className='outline-double bg-blue-600 text-white px-4 rounded-lg h-12 w-full' type='submit'>Search</button>
        </form>
    )
}
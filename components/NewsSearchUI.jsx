import React, { useEffect, useState } from 'react'

export const NewsSearchUI = ({ searchStr, searchType, handleChanges, handleSearch }) => {
    return (
        <>
            <section className=' bg-slate-400 opacity-90 flex xs:flex-col xs:h-fit lg:flex-row justify-between text-xl xs:gap-6 lg:gap-4 my-2 mb-3 h-11 lg:pb-8 lg:pt-2 lg:p-2 w-fit m-auto'>
                <ChooseSearchType handleChanges={handleChanges} />
                <AdditionalSearchLogic searchType={searchType} handleChanges={handleChanges} />
                <CountrySpecificSearchOptions handleChanges={handleChanges} />
                <SearchForm handleChanges={handleChanges} handleSearch={handleSearch} />
            </section>
            <div
                style={{
                    pointerEvents: searchStr?.length > 4 ? "auto" : "none"
                }} 
                className='w-full flex justify-center'
            >
                <button onClick={handleSearch} className={`lg:text-4xl xs:text-2xl outline-double ${searchStr?.length >= 4 ? "bg-blue-600 hover:bg-blue-800" : "bg-blue-200 text-yellow-600"} text-white px-4 mb-8 rounded-lg h-12 lg:w-1/4 xs:w-2/4 xl:w-2/4`} type='submit'>Search</button>
            </div>
        </>
    )
}

const CountrySpecificSearchOptions = ({ handleChanges }) => {
    const [text, setText] = useState(null);

    const options = ["Single Country", "Multiple Countries"];

    const renderOptions = () => options?.map(option => <RenderOption key={option} name={option} />)

    const handleOptionChanges = (e) => {
        const selected = e.target.value;

        if (selected === "Single Country") {
            setText("Single")
        } else if (selected === "Multiple Countries") {
            setText("Multiple")
        } else {
            setText(null)
        }
    }

    return (
        <div className='flex gap-4'>
            <select onChange={handleOptionChanges} className='outline-double h-11' name="Country Selection" id="Country Selection">
                <option value="-1">Choose Option</option>
                {renderOptions()}
            </select>
            <CountryUserInputsGrabber handleChanges={handleChanges} text={text} />
        </div>
    )
}

const CountryUserInputsGrabber = ({ text, handleChanges }) => {
    const decidePlaceholder = () => {
        let str = "";
        if (text === "Single") {
            str = 'bd'
        } else if (text === "Multiple") {
            str = 'bd,au'
        }

        return str
    }

    const assitingExampleText = () => {
        let str = "";
        if (text === "Single") {
            str = 'e.g. "bd"'
        } else if (text === "Multiple") {
            str = 'Comma separated e.g. "bd,au"'
        }

        return str
    }
    return (
        <div>
            <fieldset className='h-11'>
                <label htmlFor="country"></label>
                <input
                    className='w-40 h-11 outline-double text-2xl relative'
                    type="text"
                    id='country'
                    placeholder={`eg: ${decidePlaceholder()}`}
                    onChange={e => handleChanges(e, "countryCode")}
                />
            </fieldset>
            <p className='absolute text-xs flex flex-col'>
                <span>Use ISO 3166 country code</span>
                <span>{assitingExampleText()}</span>
            </p>
        </div>
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
        <div className='relative xs:w-full lg:w-fit xl:w-2/4'>
            <select className='outline-double h-11 xs:w-full xl:w-fit' onChange={handleChange} name="additional search filter" id="additional filters">
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

    return <h2 className='absolute text-sm xs:mt-0 lg:mt-0'><span>Example: </span><span>"{example}"</span></h2>
}

export const ChooseSearchType = ({ handleChanges }) => {
    const options = ["Search By News Title", "Search With Query String"];
    const renderOptions = () => options.map(name => <RenderOption key={name} name={name} />)

    return (
        <select className='outline-double h-11 lg:w-fit' onChange={(e) => handleChanges(e, "type")}>
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

export const SearchForm = ({ handleChanges, handleSearch, forArchive }) => {
    const [text, setText] = useState("")

    const handleText = (e) => {
        setText(e.target.value)
        handleChanges(e, "searchStr")
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        handleSearch()
    }
    return (
        <form
            className={`flex xs:mt-4 lg:mt-0 justify-between items-center gap-4 ${forArchive ? "w-full xs:flex-col lg:flex-row" : 'w-full'}`}
            method='post'
            onSubmit={handleSubmit}
        >
            <fieldset className={`xs:w-full`}>
                <label htmlFor='search'></label>
                <input className={`px-2 outline-double ${text?.length < 4 ? "outline-red-900" : ""} h-11 text-xl xs:w-full`} onChange={handleText} type={"text"} id={"search"} placeholder={`Query With Min 4 Characters...Search News With Query....`} />
            </fieldset>
            {forArchive ? <button disabled={text?.length >= 4 ? false : true} className={`text-2xl outline-double ${text?.length >= 4 ? "bg-blue-600 hover:bg-blue-800" : "bg-blue-200 text-yellow-600"} text-white px-4 rounded-lg h-12 w-full`} type='submit'>Search</button> : null}
        </form>
    )
}
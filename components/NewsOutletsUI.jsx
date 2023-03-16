import { countriesCodes } from '@/forNewsList';
import React, { useState } from 'react'

export const NewsOutletsUI = ({handleCountryCode}) => {
    return (
        <main>
            <h1>NewsOutletsUI</h1>
            <RenderCountries handleCountryCode={handleCountryCode} />
        </main>
    )
}

const RenderCountries = ({handleCountryCode}) => {
    const [counts, setCounts] = useState(0);
    const countries = [];
    for (let key in countriesCodes) {
        const obj = { code: [key.toLocaleLowerCase()], name: countriesCodes[key] }
        countries.push(obj)
    }

    // const handleIncrease = () => setCounts(prev => prev + 1)

    // const handleDecrease = () => setCounts(prev => prev - 1)

    // const renderList = () => countries?.map(country => <RenderCountryVersionSingle counts={counts} setCounts={setCounts} handleIncrease={handleIncrease} handleDecrease={handleDecrease} key={country.code} item={country} maxCounts={1} />)

    const renderList = () => countries?.map(country => <RenderCountryVersionSingle counts={counts} setCounts={setCounts} key={country.code} item={country} maxCounts={1} handleCountryCode={handleCountryCode} />)

    return (
        <ul style={{ maxHeight: "420px" }} className='overflow-y-auto scroll-smooth'>
            {renderList()}
        </ul>
    )
}

const RenderCountryVersionSingle = ({ item, counts, setCounts, handleCountryCode, handleIncrease, handleDecrease, maxCounts }) => {
    const [clicked, setClicked] = useState(false);
    // bad setState() usecase example
    // const handleClicked = (e) => {
    //     counts >= 0 && counts <= maxCounts && setClicked(prev => {
    //         if (!prev && counts < maxCounts) {
    //             // setCounts(counts + 1)
    //             handleIncrease()
    //         } else if (prev && counts <= maxCounts) {
    //             // setCounts(counts - 1)
    //             handleDecrease()
    //         } else {
    //             return prev
    //         }
    //         return !prev
    //     });
    // }

    const handleClicked = (e) => setClicked(prev => !prev)
    
    const decideCounts = () => {
        if (!clicked && counts < maxCounts) {
            setCounts(counts + 1)
            // handleIncrease();

            handleCountryCode(item.code)
            handleClicked();
        } else if (clicked && counts <= maxCounts) {
            setCounts(counts - 1)
            // handleDecrease();

            handleClicked();
        }
    }

    return <RenderListItem clicked={clicked} handleClicked={decideCounts} item={item} />
}

const RenderCountryVersionMultiple = ({ item, counts, setCounts }) => {
    const [clicked, setClicked] = useState(false)
    const handleClicked = (e) => {
        console.log(counts, "counts!!")
        counts >= 0 && counts <= 5 && setClicked(prev => {
            console.log(counts, "counts!!", prev)
            if (!prev && counts < 5) {
                setCounts(counts + 1)
                // setCounts(prev => prev + 1)
                return !prev
            } else if (prev && counts <= 5) {
                setCounts(counts - 1)
                // setCounts(prev => prev - 1)
                return !prev
            }
            // return !prev
        });
        console.log(e.target.textContent)
    }

    return <RenderListItem clicked={clicked} handleClicked={handleClicked} item={item} />
}

const RenderListItem = ({ clicked, handleClicked, item }) => {
    return (
        <li
            className={`${clicked ? "bg-cyan-600" : "bg-none"}`}
            onClick={handleClicked}
            value={item.code}
        >
            {item.name}
        </li>
    )
}
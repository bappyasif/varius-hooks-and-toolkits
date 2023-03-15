import { countriesCodes } from '@/forNewsList';
import React, { useState } from 'react'

export const NewsOutletsUI = () => {
    return (
        <main>
            <h1>NewsOutletsUI</h1>
            <RenderCountries />
        </main>
    )
}

const RenderCountries = () => {
    const [counts, setCounts] = useState(0);
    const countries = [];
    for (let key in countriesCodes) {
        const obj = { code: [key.toLocaleLowerCase()], name: countriesCodes[key] }
        countries.push(obj)
    }

    const renderList = () => countries?.map(country => <RenderCountry counts={counts} setCounts={setCounts} key={country.code} item={country} />)

    return (
        <ul style={{ maxHeight: "420px" }} className='overflow-y-auto scroll-smooth'>
            {renderList()}
        </ul>
    )
}

const RenderCountry = ({ item, counts, setCounts }) => {
    const [clicked, setClicked] = useState(false)
    const handleClicked = (e) => {
        console.log(counts, "counts!!")
        counts >= 0 && counts <= 5 && setClicked(prev => {
            console.log(counts, "counts!!", prev)
            if ( !prev && counts < 5 ) {
                setCounts(counts+1)
                // setCounts(prev => prev + 1)
                return !prev
            } else if ( prev && counts <= 5) {
                setCounts(counts-1)
                // setCounts(prev => prev - 1)
                return !prev
            }
            // return !prev
        });
        console.log(e.target.textContent)
    }

    return (
        <li
            className={`${clicked ? "bg-cyan-600" : "bg-none"}`}
            onClick={handleClicked}
            // onClick={counts < 5 ? handleClicked : null}
            value={item.code}
        >
            {item.name}
        </li>
    )
}
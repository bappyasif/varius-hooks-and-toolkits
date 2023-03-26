import { countriesCodes, countriesConversions } from '@/utils/data'
import React from 'react'

export const SelectCountry = ({handleCountryChange}) => {
    const renderCountries = () => countriesConversions()?.map(country => <RenderOption key={country.code} country={country} />)
  return (
    <>
    <div>SelectCountry</div>
    <select onChange={handleCountryChange}>
        <option value="-1">Choose Country</option>
        {renderCountries()}
    </select>
    </>
  )
}

const RenderOption = ({country}) => {
    const {code, name} = country

    return <option value={code}>{name}</option>
}
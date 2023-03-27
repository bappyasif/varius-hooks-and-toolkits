import { countriesCodes, countriesConversions } from '@/utils/data'
import React from 'react'

export const SelectCountry = ({ handleCountryChange }) => {
  const renderCountries = () => countriesConversions()?.map(country => <RenderOption key={country.code} country={country} />)
  return (
    <section>
      <select onChange={handleCountryChange}>
        <option value="-1">Choose Country</option>
        {renderCountries()}
      </select>
    </section>
  )
}

const RenderOption = ({ country }) => {
  const { code, name } = country

  return <option value={code}>{name}</option>
}
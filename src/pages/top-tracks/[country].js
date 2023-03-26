import { countriesCodes, countriesConversions } from '@/utils/data'
import React from 'react'

const TopTracksInCountry = ({country}) => {
  return (
    <div>TopTracksInCountry -- {country}</div>
  )
}

export const getStaticPaths = () => {
  const paths = countriesConversions()?.map(country => ({params: {country: `${country.code}`}}))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async (context) => {
    const {params} = context;
    const {country} = params
    console.log(params, "!!", country)
    // console.log(params, "!!")
    return {
      props: {country: country}
    }
}

export default TopTracksInCountry
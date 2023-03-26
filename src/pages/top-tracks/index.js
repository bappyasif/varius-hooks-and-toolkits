import { SelectCountry } from '@/components/select-country'
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const TopTracks = () => {
  const [country, setCountry] = useState("");
  
  const router = useRouter();

  const handleCountryChange = (e) => {
    // console.log(e.target.value)
    // e.target.value != -1 ? router.push(`/top-tracks?country=${e.target.value}`) : router.push(`/top-tracks?country=bd`)
    e.target.value != -1 ? router.push(`/top-tracks/${e.target.value}`) : router.push(`/top-tracks/bd`)
    setCountry(e.target.value != -1 ? e.target.value : "bd")
  }

  console.log(country, "country!!")


  return (
    <>
    <div>TopTracks</div>
    <SelectCountry handleCountryChange={handleCountryChange} />
    </>
  )
}

export default TopTracks
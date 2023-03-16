import { NewsOutletsUI } from '@/components/NewsOutletsUI'
import { news_data_request_interceptor } from '@/utils/axios-interceptors'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'

const NewsOutlets = () => {
  const [searchNow, setSearchNow] = useState(false);

  const [countryCode, setCountryCode] = useState(null)

  const handleCountryCode = text => {
    setCountryCode(text);
    setSearchNow(true)
  }

  const resetCountryCode = () => {
    setCountryCode(null);
    setSearchNow(false)
  }

  const fetchNewsOutlets = () => {
    const params = { country: `${countryCode}` }
    return news_data_request_interceptor({ url: "/sources", params })

    // return axios("https://newsdata.io/api/1/sources?apikey=pub_........&country=bd")
  }

  const { data: outlets, isError, isLoading, error } = useQuery({
    queryKey: ["news outlets", `${countryCode}`],
    queryFn: fetchNewsOutlets,
    enabled: searchNow,
    refetchOnWindowFocus: false,
    onSuccess: resetCountryCode,
    onError: resetCountryCode
  })

  console.log(outlets?.data, "outlets!!")

  return (
    <main>
      <h1>NewsOutlets</h1>
      <NewsOutletsUI handleCountryCode={handleCountryCode} />
      <div>
        {(searchNow && isLoading) ? <h2>Loading News....</h2> : null}
        {isError ? <h2>Error Occured....</h2> : error?.message}
      </div>
    </main>
  )
}

export default NewsOutlets
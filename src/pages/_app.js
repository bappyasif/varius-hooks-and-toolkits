import { AppContext } from '@/components/appContext';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

export default function App({ Component, pageProps }) {
  const [topTracks, setTopTracks] = useState([]);
  
  const [relatedTracks, setRelatedTracks] = useState([]);

  const [country, setCountry] = useState("");

  const [searchedData, setSearchedData] = useState([]);

  const handleRelatedTracks = (data, trackId) => {
    data?.length ? setRelatedTracks(prev => ([...prev, {data: data, key: trackId}])) : null
    // setRelatedTracks(prev => ([...prev, {[trackId]: data}]))
    console.log(relatedTracks, "relatedTracks!!")
  }

  const handleCountry = name => setCountry(name)

  const handleTopTracks = (data, countryCode) => {
    // setTopTracks(data)
    // setTopTracks({[countryCode]: data})
    // setTopTracks(prev => ([...prev, {[countryCode]: data}]))
    setTopTracks(prev => ([...prev, {data, countryCode}]))
    
    console.log(data, "<<>>")
  }

  const handleSearchData = (type, query, data) => {
    setSearchedData(prev => [...prev, {type, query, data}])
  }

  const clientQuery = new QueryClient()

  return (
    <AppContext.Provider value={{ handleSearchData, searchedData, handleTopTracks, topTracks, handleCountry, country, handleRelatedTracks, relatedTracks }}>
      <QueryClientProvider client={clientQuery}>
        <div className='flex gap-9'>
          <Navbar />
          <Component {...pageProps} />
        </div>
        <Footer />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </AppContext.Provider>
  )
}

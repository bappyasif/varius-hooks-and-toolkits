import { AppContext } from '@/components/appContext';
import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

export default function App({ Component, pageProps }) {
  const [topTracks, setTopTracks] = useState([]);

  const handleTopTracks = data => {
    setTopTracks(data)
    console.log(data, "<<>>")
  }

  const clientQuery = new QueryClient()

  return (
    <AppContext.Provider value={{handleTopTracks, topTracks}}>
      <QueryClientProvider client={clientQuery}>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </AppContext.Provider>
  )
}

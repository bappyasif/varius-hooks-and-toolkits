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

  const [playlists, setPlaylists] = useState([]);

  const handleAddToPlaylist = (userId, playlistName, trackId) => {
    const userPlaylists = playlists.find(item => item.userId == userId)
    const otherLists = userPlaylists?.lists.filter(item => item.name !== playlistName)

    const specificList = userPlaylists?.lists.find(item => item.name === playlistName)
    // const checkIfExistAlready = specificList.lists?.findIndex(item => item?.tracks.includes(trackId))
    // const checkIfExistAlready = specificList.lists?.findIndex(item => console.log(item?.tracks.includes(trackId), item.tracks))
    
    const checkIfExistAlready = specificList?.tracks?.includes(trackId)
    console.log(specificList, "SPECIFIC!!", specificList.tracks, checkIfExistAlready)

    // console.log(userPlaylists, specificList, userId, playlistName, trackId, checkIfExistAlready)

    if(checkIfExistAlready === false) {
      specificList.tracks.push(trackId)
    } else if (checkIfExistAlready === undefined) {
      specificList.tracks = [trackId]
    }

    // if(checkIfExistAlready === -1) {
    //  console.log(userPlaylists, specificList, userId, playlistName, trackId, "not found!!", otherLists)
    //  specificList.tracks.push(trackId)
    // } else if (checkIfExistAlready === undefined) {
    //   specificList.tracks = [trackId];
    //   console.log(userPlaylists, specificList, userId, playlistName, trackId, "undefined", otherLists)
    // } else if (checkIfExistAlready === false) {
    //   specificList.tracks.push(trackId)
    //   // specificList.tracks.push(trackId)
    // }
  }

  const handlePlaylists = (newData, userId) => {
    const userPlaylists = playlists.find(item => item.userId == userId)
    const chk = userPlaylists?.lists.findIndex(item => item.name === newData?.name)
    // const newList = chk === -1 ? [newData] : userPlaylists?.lists.push(newData)
    const newList = chk === -1 ? userPlaylists?.lists.push(newData) : [newData];

    if(userPlaylists === undefined) {
      setPlaylists(prev => [...prev, {userId, lists: [newData]}])
    } else {
      setPlaylists(prev => chk === -1 ? [...prev, {userId: userId, lists: newList}] : [...prev])
    }

    console.log(userPlaylists, chk, newList, newData, userId)

    // setPlaylists(prev => [...prev, newData])
  }

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
    <AppContext.Provider value={{ handleAddToPlaylist, handlePlaylists, playlists, handleSearchData, searchedData, handleTopTracks, topTracks, handleCountry, country, handleRelatedTracks, relatedTracks }}>
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

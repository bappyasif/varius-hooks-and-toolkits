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

  // const handleRemoveFromPlaylist = (userId, playlistName, trackId) => {
  //   const userPlaylists = playlists.find(item => item.userId == userId)
  //   const specificList = userPlaylists?.lists?.find(item => item.name === playlistName)
  //   const othersList = userPlaylists?.lists?.find(item => item.name !== playlistName)
  //   const filteredList = specificList?.tracks?.filter(item => item !== trackId)

  //   const updatedList = {name: playlistName, tracks: filteredList}

  //   const newList = {userId, lists: [updatedList, othersList]}

  //   const restList = playlists.filter(item => item.userId !== userId)

  //   // setPlaylists(prev => [...prev, {userId: userId, lists: newList}])

  //   // setPlaylists(prev => [{...prev, userId: userId, lists: newList}])

  //   // this works but it also changes original index which was used for rendering

  //   setPlaylists([{userId: userId, lists: newList.lists}, restList])

  //   // console.log([{userId: userId, lists: newList.lists}, restList])

  //   // console.log(userPlaylists, specificList, filteredList, othersList, updatedList, newList, restList)
  // }

  // const handleRemoveFromPlaylist = (userId, playlistName, trackId) => {
  //   setPlaylists(prev => {
  //     const userPlaylists = prev.find(item => item.userId == userId);
  //     const specificList = userPlaylists?.lists?.filter(item => item.name === playlistName);
  //     const removeTrack = specificList?.tracks?.filter(item => item != trackId);
  //     const updatedList = {userId: userId, lists: removeTrack?.lists}

  //     const restPlaylist = prev.filter(item => item.userId != userId)

  //     console.log(updatedList, restPlaylist, removeTrack, userPlaylists, specificList)

  //     return prev
  //   })
  // }

  // const handleRemoveFromPlaylist = (userId, playlistName, trackId) => {
  //   setPlaylists(prev => {
  //     return prev.map(item => {
  //       if (item.userId === userId) {
  //         return item.lists?.map(list => {
  //           if (list.name === playlistName) {
  //             const newTracks = list?.tracks.filter(val => val != trackId);
  //             list.tracks = newTracks;
  //           }
  //           return list
  //         })
  //       } else {
  //         return item
  //       }
  //     })
  //   })
  // }

  // const handleRemoveFromPlaylist = (userId, playlistName, trackId) => {
  //   setPlaylists(prev => {
  //     return prev.map(item => {
  //       if (item.userId === userId) {
  //         return item.lists?.map(list => {
  //           if (list.name === playlistName) {
  //             const newTracks = list?.tracks.filter(val => val != trackId);
  //             list.tracks = newTracks;
  //           }
  //           console.log(list, item, "<><>", prev)
  //           return list
  //         })
  //       }
  //       return item
  //     })
  //   })
  // }

  const handleRemoveFromPlaylist = (userId, playlistName, trackId) => {
    setPlaylists(prev => {
      return prev.map(item => {
        if (item.userId === userId) {
          item.lists?.forEach(list => {
            if (list.name === playlistName) {
              const newTracks = list?.tracks.filter(val => val != trackId);
              list.tracks = newTracks;
            }
            console.log(list, item, "<><>", prev)
          })
        }
        console.log(prev, "after")
        return prev[0]
      })
      // console.log(prev, "after")
      // return prev[1]
    })
  }

  const handleAddToPlaylist = (userId, playlistName, trackId) => {
    const userPlaylists = playlists.find(item => item.userId == userId)

    const otherLists = userPlaylists?.lists.filter(item => item.name !== playlistName)

    const specificList = userPlaylists?.lists.find(item => item.name === playlistName)

    const checkIfExistAlready = specificList?.tracks?.includes(trackId)

    console.log(specificList, "SPECIFIC!!", specificList.tracks, checkIfExistAlready)

    if (checkIfExistAlready === false) {
      specificList.tracks.push(trackId)
    } else if (checkIfExistAlready === undefined) {
      specificList.tracks = [trackId]
    }
  }

  const handlePlaylists = (newData, userId) => {
    const userPlaylists = playlists?.find(item => item.userId == userId)
    const chk = userPlaylists?.lists.findIndex(item => item.name === newData?.name)
    const newList = chk === -1 ? userPlaylists?.lists.push(newData) : [newData];

    if (userPlaylists === undefined) {
      setPlaylists(prev => [...prev, { userId, lists: [newData] }])
    } else {
      setPlaylists(prev => (chk === -1 && newList?.length) ? [...prev, { userId: userId, lists: newList }] : [...prev])
      // setPlaylists(prev => chk === -1 ? [...prev, {userId: userId, lists: newList}] : [...prev])
    }

    console.log(userPlaylists, chk, newList, newData, userId)

    // setPlaylists(prev => [...prev, newData])
  }

  const handleRelatedTracks = (data, trackId) => {
    data?.length ? setRelatedTracks(prev => ([...prev, { data: data, key: trackId }])) : null
    // setRelatedTracks(prev => ([...prev, {[trackId]: data}]))
    console.log(relatedTracks, "relatedTracks!!")
  }

  const handleCountry = name => setCountry(name)

  const handleTopTracks = (data, countryCode) => {
    // setTopTracks(data)
    // setTopTracks({[countryCode]: data})
    // setTopTracks(prev => ([...prev, {[countryCode]: data}]))
    setTopTracks(prev => ([...prev, { data, countryCode }]))

    console.log(data, "<<>>")
  }

  const handleSearchData = (type, query, data) => {
    setSearchedData(prev => [...prev, { type, query, data }])
  }

  const clientQuery = new QueryClient()

  return (
    <AppContext.Provider value={{ handleRemoveFromPlaylist, handleAddToPlaylist, handlePlaylists, playlists, handleSearchData, searchedData, handleTopTracks, topTracks, handleCountry, country, handleRelatedTracks, relatedTracks }}>
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

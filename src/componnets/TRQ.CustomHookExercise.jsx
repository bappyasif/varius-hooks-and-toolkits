import React from 'react'
import useSuperHeroesData from '../hooks/useSuperHeroesData'

function TRQCustomHookExercise() {
  const onError = (err) => console.log(err)
  const onSuccess = (data) => console.log(data.data)
  const options = { enabled: false }
  const { isError, isLoading, data, refetch } = useSuperHeroesData(onError, onSuccess, "re-super-heroes", options)
  
  // when i do this i get Only See Loading Data and doesnt show me "Button" element to begin data fetching, i dont know why, can you help me fix that, thanks
  // if (isError) return <h1>Error Occured.....</h1>
  // if (isLoading) return <h1>Loading Data.....</h1>
  
  return (
    <main>
      <h1>TRQCustomHookExercise</h1>
      {isError ? <h1>Error Occured.....</h1> : null}
      {isLoading ? <h1>Loading Data.....</h1> : null}
      <button onClick={refetch}>Fetch Superheroes</button>
      <h2>Super Heros</h2>
      {data?.map(hero => <h3 key={hero}>{hero}</h3>)}
    </main>
  )
}

export default TRQCustomHookExercise
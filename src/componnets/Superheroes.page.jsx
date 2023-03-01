import axios from "axios";
import { useEffect, useState } from "react"

function SuperheroesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([]);
  const [error, setError] = useState("")

  const fetchData = () => {
    axios.get("http://localhost:4000/superheroes")
      .then(res => {
        setData(res.data)
        setIsLoading(false)
      }).catch(err => {
        console.log(err.message, "error occured!!")
        setIsLoading(false)
        setError(err.message)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  if(isLoading) return <h1>Loading....</h1>

  if(error) return <h1>{error}</h1>

  return (
    <main>
      <h1>SuperheroesPage</h1>
      {data?.map(item => <h2 key={item.name}>{item.name}</h2>)}
    </main>
  )
}

export default SuperheroesPage
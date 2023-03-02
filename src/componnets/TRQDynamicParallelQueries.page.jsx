import { useQueries } from "@tanstack/react-query"
import axios from "axios"

const fetchSuperhero = heroId => axios.get(`http://localhost:4000/superheroes/${heroId}`)

export const TRQDynamicParallelQueriesPage = ({heroIds}) => {
  const queryResults = useQueries({
    queries: heroIds.map(id=>({queryKey: ["superhero", id], queryFn: () => fetchSuperhero(id)}))
  })
  console.log({queryResults})
  return (
    <div>TRQDynamicParallelQueriesPage</div>
  )
}

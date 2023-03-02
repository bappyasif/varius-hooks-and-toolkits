import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchFriends = () => axios.get("http://localhost:4000/friends")

const fetchSuperheroes = () => axios.get("http://localhost:4000/superheroes")

export const TRQParallelQueriesPage = () => {
  const { data: friends } = useQuery({ queryKey: ["friends"], queryFn: fetchFriends })
  const { data: superheroes } = useQuery({ queryKey: ["superheroes"], queryFn: fetchSuperheroes })
  return (
    <main>
      <h1>ParallelQueriesPage</h1>
      <h2>All Friends</h2>
      {friends.data.map(frnd => <h3 key={frnd.id}>{frnd.name}</h3>)}
      <br />
      <hr />
      <br />
      <h2>All Superheroes</h2>
      {superheroes.data.map(hero => <h3 key={hero.id}>{hero.name} -- {hero.alterEgo}</h3>)}
    </main>
  )
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import Link from "next/link"

const fetchFavourites = () => axios.get("http://localhost:4000/favourites")

const fetchWishlist = () => axios.get("http://localhost:4000/wishlist")

export const RenderUserActionableItems = ({ data }) => {
  const { data: favourites, isError, isLoading, error } = useQuery({
    queryKey: ["movie", "favourites"],
    queryFn: fetchFavourites
  })

  const renderData = () => favourites?.data.map(item => <RenderFavoriteMovieData key={item.id} item={item} />)

  return (
    <section>
      {/* {data?.length ? renderData() : <h2>No Favorites Movies Found Yet....</h2>} */}
      {isError ? <h2>Error Occured.... {error.message}</h2> : null}
      {isLoading ? <h2>Data Loading....</h2> : null}
      {renderData()}
    </section>
  )
}


const RenderFavoriteMovieData = ({ item }) => {
  const { id, title, poster_path, vote_average, releasedDate } = item
  const clientQuery = useQueryClient()
  const removeMovie = () => axios.delete(`http://localhost:4000/favourites/${id}`)
  const { mutate } = useMutation(removeMovie, {
    onSuccess: () => clientQuery.invalidateQueries(["movie", "favourites"])
  })
  const handleRemove = () => mutate()
  return (
    <article>
      <img src={`https://image.tmdb.org/t/p/original${poster_path}`} width={330} height={220} alt={title} />
      <h2>{title}</h2>
      <h3><span>Votes: {vote_average}</span> -- <span>Released: {releasedDate}</span></h3>
      <h4><button onClick={handleRemove}>Remove From Favourites List</button></h4>
    </article>
  )
}

export const RenderWishlist = ({ data }) => {
  const { data: wishlist, isError, isLoading, error } = useQuery({
    queryKey: ["movie", "wishlist"],
    queryFn: fetchWishlist
  })

  const renderData = () => wishlist?.data.map(item => <RenderWishlistMovieData key={item.id} item={item} />)

  return (
    <section>
      {/* {data?.length ? renderData() : <h2>No Favorites Movies Found Yet....</h2>} */}
      {isError ? <h2>Error Occured.... {error.message}</h2> : null}
      {isLoading ? <h2>Data Loading....</h2> : null}
      {renderData()}
    </section>
  )
}


const RenderWishlistMovieData = ({ item }) => {
  const { id, title, poster_path, vote_average, releasedDate } = item
  const clientQuery = useQueryClient()
  const removeMovie = () => axios.delete(`http://localhost:4000/wishlist/${id}`)
  const { mutate } = useMutation(removeMovie, {
    onSuccess: () => clientQuery.invalidateQueries(["movie", "wishlist"])
  })
  const handleRemove = () => mutate()
  return (
    <article>
      <img src={`https://image.tmdb.org/t/p/original${poster_path}`} width={330} height={220} alt={title} />
      <h2>{title}</h2>
      <h3><span>Votes: {vote_average}</span> -- <span>Released: {releasedDate}</span></h3>
      <h4><button onClick={handleRemove}>Remove This From Wishlist</button></h4>
    </article>
  )
}

export const EmptyMoviesList = ({text}) => {
  return (
    <section>
      <h2>{text}</h2>
      <h4>Consider Looking through available <Link href={"/"}>Movies</Link> and from them</h4>
    </section>
  )
}
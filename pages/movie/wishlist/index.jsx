import { EmptyMoviesList, RenderWishlist } from '@/components/RenderUserActionableItems';
import axios from 'axios'
import React from 'react'

function MoviesWishlist({data}) {
  return (
    <section>
        <h1>Movies Wishlist!!</h1>
        {data?.length ? <RenderWishlist /> : <EmptyMoviesList text={"No Movies In Wishlist!!"} />}
    </section>
  )
}

export const getStaticProps = async () => {
    const response = await axios.get("http://localhost:4000/wishlist");
    const movies = response.data;

    return {
        props: {
            data: movies
        }
    }
} 

export default MoviesWishlist
import { EmptyMoviesList, RenderUserActionableItems } from '@/components/RenderUserActionableItems'
import axios from 'axios'
import React from 'react'

export default function FavouriteMovies ({ favourites }) {
    // console.log(favourites, "favourites!!")

    return (
        <div>
            <h1>FavouriteMovies</h1>
            {
                !favourites?.length ? <EmptyMoviesList text={"No Favourite Movies Found...."} /> : null
            }
            <RenderUserActionableItems data={favourites} />
        </div>
    )
}

export const getStaticProps = async () => {
    const response = await axios.get("http://localhost:4000/favourites")
    const data = response.data

    return {
        props: {
            favourites: data
        }
    }
}

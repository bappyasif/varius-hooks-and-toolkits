import { RenderMovie } from "@/components/ItemsRenderables";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function MovieDetail({ movieId, apiKey }) {
  // const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.MOVIE_DB_API_KEY}`
  // const url = `https://api.themoviedb.org/3/movie/631842?api_key=01e42a1b87f077bd866179fa7f1396d6`
  // const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=01e42a1b87f077bd866179fa7f1396d6`
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
  // "https://api.themoviedb.org/3/movie/631842?api_key=01e42a1b87f077bd866179fa7f1396d6"

  // console.log(movieId)
  const { data: movie } = useQuery({
    queryKey: ["movies", movieId],
    queryFn: () => {
      return axios.get(url).then(resp => resp.data).catch(err => console.log(err))
    }
  })
  console.log(movie, "movie!!", process.env.MOVIE_DB_API_KEY)
  return (
    <main>
      <h1>MovieDetail</h1>
      {
        movie?.id
          ?
          <div style={{ backgroundSize: "cover", backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")` }}>
            <RenderMovie item={movie} forDetail={true} />
          </div>
          : null
      }
    </main>
  )
}

export const getServerSideProps = context => {
  const { params } = context
  const { movieId } = params
  console.log(params, "params@!!!", process.env.MOVIE_DB_API_KEY)
  return {
    props: {
      movieId: `${movieId}`,
      apiKey: process.env.MOVIE_DB_API_KEY
    }
  }
}

// export const getStaticProps = async context => {
//   const { params } = context;
//   const { movieId } = params;

//   console.log(movieId, "!!")
//   return {
//     props: {
//       movieId: movieId
//     }
//   }
// }

// export const getStaticPaths = async context => {
//   const { params } = context;
//   // const {movieId} = params;
//   console.log(params)
//   return {
//     // paths: [{ params: { movieId: 631842 } }],
//     // paths: [
//     //   {
//     //     params: {
//     //       movieId: 631842
//     //     }
//     //   }
//     // ],
//     // paths: { params: [{ movieId: 631842 }] },
//     // paths: [{ params: { movieId: '1' } }, { params: { id: '2' } }],

//     // paths: [{ params: { movieId: `631842` } }],
//     // fallback: false

//     paths: [
//       {
//         params: { movieId: "631842" }
//       }
//     ],
//     fallback: true
//   }
// }

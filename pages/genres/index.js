import { GameGenres } from '@/components/GameGenres'
import { secrets } from '@/secrets'
import { rapid_external_axios_request } from '@/utils/axios-interceptor'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

function ListOfGamesGenres() {
    const {data} = useQuery({
        queryKey: ["games", "genres"],
        queryFn: () => {
            return rapid_external_axios_request({url: `/genres?key=${secrets.RAWG_API_KEY}`})
        }
    })
    console.log(data?.data.results)
  return (
    <main>
        <GameGenres data={data?.data.results} />
    </main>
  )
}

// export const getStaticPaths = async () => {
//     const response = await rapid_external_axios_request({url: `/genres?key=${process.env.RAWG_API_KEY}`})
//     const data = await response.data

//     const paths = data?.results.map(item => ({params: {id: item.id}}))

//     return {
//         props: {
//             // paths: paths,
//             // paths: [{params: {id: "1"}}],
//             paths: [],
//             fallback: false
//         }
//     }
// }

export default ListOfGamesGenres
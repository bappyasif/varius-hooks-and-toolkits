import { GenreDetail } from '@/components/GenreDetail'
import { rapid_external_axios_request } from '@/utils/axios-interceptor'
import React from 'react'

function GameGenre({id}) {
  return (
    <main>
        <GenreDetail id={id} />
    </main>
  )
}

export const getServerSideProps = async context => {
    const {params} = context
    const {id} = params

    return {
        props: {
            id: id[0]
        }
    }
}

// export const getStaticPaths = async () => {
//     const response = await rapid_external_axios_request({url: `/genres?key=${process.env.RAWG_API_KEY}`})
//     const data = await response.data

//     const paths = data?.results.map(item => ({params: {id: item.id}}))

//     return {
//         props: {
//             paths: paths,
//             fallback: false
//         }
//     }
// }

// export const getStaticProps = async (context) => {
//     const {params} = context
//     const {id} = params
//     console.log(id[0])
//     const response = await rapid_external_axios_request({url: `/genres/${id[0]}?key=${process.env.RAWG_API_KEY}`})
//     const data = await response.data

//     console.log(id[0], data)

//     return {
//         props: {
//             id: id[0],
//             data: data
//         }
//     }
// }

export default GameGenre
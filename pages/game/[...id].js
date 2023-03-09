import { GameDetail } from '@/components/GameDetail';
import axios from 'axios';
import { useRouter } from 'next/router'
import React from 'react'

export default function AllAboutGameDetail ({id}) {
    console.log( id )
  return (
    <main>
        <h1>GameDetail</h1>
        <GameDetail id={id} />
    </main>
  )
}

export const getServerSideProps = async (context) => {
    const {params} = context
    const {id} = params
    console.log(params, id)
    // const response = await axios.get({url: `/games/${id[0]}`})
    // const data = response.data
    return {
        props: {
            id: id[0]
        }
    }
}
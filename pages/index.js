import { ListAllFavourites } from '@/components/ListAllFavourites'
import { ListCityTopTracks, ListTopTracks, RenderMenu } from '@/components/ListTopTracks'
import { RecordVoice } from '@/components/RecordVoice'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import ShowPlaylists from './playlists'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ rawg }) {
  const { data: session, status } = useSession()
  const { data: favourites } = useQuery({
    queryKey: ["favourites songs"],
    queryFn: () => {
      return request_internal({ url: "/favourites", method: "get" })
    }
  })

  return (
    <main className='flex flex-col'>
      <h1 className='text-4xl'>Welcome Dear {session?.user.name || "User"}</h1>
      {
        status === "authenticated"
          ?
          <>
            <h2 className='py-2 text-2xl'>Visit your <Link className='bg-blue-400 p-2 rounded-md' href={"/dashboard"}>Dashboard</Link></h2>
            <ShowPlaylists />

            <h2 className='text-4xl py-2 mt-4'>List Of All Favourites Song Tracks</h2>
            <ListAllFavourites data={favourites?.data} />
          </>
          :
          <h2 className='text-3xl'>to visit Your Dashboard please consider loging in from <Link className='bg-blue-400 p-2 rounded-md' href={"/api/auth/signin"}>here</Link> first</h2>
      }

      {/* <ListTopTracks /> */}
      {/* <ListCityTopTracks /> */}
      {/* <RenderMenu /> */}
    </main>
  )
}

export const getStaticProps = () => {
  // console.log(process.env.RAWG_API_KEY, "KEY!!", process.env.RAPID_API_KEY)

  return {
    props: {
      rawg: process.env.RAWG_API_KEY
    }
  }
}

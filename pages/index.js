import { ListAllFavourites } from '@/components/ListAllFavourites'
import { request_internal } from '@/utils/axios-interceptors'
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
      {
        status === "authenticated"
          ?
          <>
            <div className='flex justify-start gap-6 items-center'>
              <h1 className='text-4xl'>Welcome Dear <span className='bg-neutral-600 text-white px-2 rounded-xl'>{session?.user.name || "User"}</span></h1>
              <h2 className='py-2 text-4xl my-6'>Visit your <Link className='bg-blue-400 p-2 rounded-md' href={"/dashboard"}>Dashboard</Link></h2>
            </div>
            <ShowPlaylists />

            <h2 className='text-4xl my-4 bg-zinc-400 text-center'>List Of All Favourites Song Tracks</h2>
            <ListAllFavourites data={favourites?.data} />
          </>
          :
          <h2 className='text-3xl'>to visit Your Dashboard please consider loging in from <Link className='bg-blue-400 p-2 rounded-md' href={"/api/auth/signin"}>here</Link> first</h2>
      }
    </main>
  )
}

export const getStaticProps = (context) => {
  // console.log(process.env.RAWG_API_KEY, "KEY!!", process.env.RAPID_API_KEY)

  const { query, req, res } = context
  console.log(query, req, res)

  return {
    props: {
      rawg: process.env.RAWG_API_KEY
    }
  }
}

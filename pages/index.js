import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useQuery } from '@tanstack/react-query'
import { rapid_external_axios_request } from '@/utils/axios-interceptor'
import { SidebarNavs } from '@/components/Sidebar'
import { GamesList } from '@/components/GamesList'

const inter = Inter({ subsets: ['latin'] })

export default function Home({rawg}) {
  const {data} = useQuery({
    queryKey: ["test"],
    queryFn: () => {
      return rapid_external_axios_request({url: `/games?key=${rawg}`})
      // return rapid_external_axios_request({url: `/games?key=${process.env.RAWG_API_KEY}`})
      // return rapid_external_axios_request(`/games?key=${process.env.RAWG_API_KEY}`)
    }
  })
  console.log(data?.data?.results)
  return (
    // className={styles.main}
    <main>
      <SidebarNavs />
      <GamesList />
      <h1 className='text-4xl text-purple-900'>Haloooooo :)</h1>
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

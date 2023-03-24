import { useSession } from 'next-auth/react'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ rawg }) {
  // const [news, setNews] = useState()
  // const handleNews = data => setNews(data)

  // console.log(news, "!!")

  const {data: session, status} = useSession()

  // const {data: session} = useSession()

  return (
    <>
    <Head>
      <title>Hallo NextJs!!</title>
      {/* <meta name='core concepts' content='learning and solidifying concepts' /> */}
      <meta name='description' content='learning and solidifying concepts' />
    </Head>
      <main className='flex flex-col w-full px-2'>
        <h1>Welcome Dear {status === "authenticated" ? session.user.name : "User"}</h1>
        {/* <h1>(No Flicker Due To useSession and no loading status check) Welcome Dear {session?.user?.name ? session.user.name : "User"}</h1> */}
        <Link href={"/blog"}>Blog</Link>
        halooooooo!!!! {process.env.NEXT_PUBLIC_TEST}
      </main>
    </>
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

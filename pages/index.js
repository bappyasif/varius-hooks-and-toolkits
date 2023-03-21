import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ rawg }) {
  // const [news, setNews] = useState()
  // const handleNews = data => setNews(data)

  // console.log(news, "!!")

  return (
    <main className='flex flex-col w-full px-2'>
      <Link href={"/blog"}>Blog</Link>
      halooooooo!!!!
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

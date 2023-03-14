import { NewsCustomization } from '@/components/NewsCustomization'
import { Inter } from 'next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ rawg }) {
  // const [news, setNews] = useState()
  // const handleNews = data => setNews(data)

  // console.log(news, "!!")

  return (
    <main className='flex flex-col'>
      <h1>News Search</h1>
      <NewsCustomization />
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

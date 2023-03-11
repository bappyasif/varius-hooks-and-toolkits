import { RecordVoice } from '@/components/RecordVoice'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ rawg }) {
  
  return (
    <main className='flex flex-col'>
      <h1>Hallo, lets record your voice and test through shazam :)</h1>
      <RecordVoice />
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

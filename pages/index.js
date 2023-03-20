import { NewsCustomization } from '@/components/NewsCustomization'
import { Inter } from 'next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <main className='flex flex-col w-full px-2'>
      <NewsCustomization />
    </main>
  )
}

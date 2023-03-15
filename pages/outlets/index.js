import { NewsOutletsUI } from '@/components/NewsOutletsUI'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const NewsOutlets = () => {
    // const {} = useQuery({

    // })
  return (
    <main>
        <h1>NewsOutlets</h1>
        <NewsOutletsUI />
    </main>
  )
}

export default NewsOutlets
import NewsArticle from '@/components/article'
import React from 'react'

function NewsArtikel({item}) {
  return (
    <main>
        <h1>NewsArtikel</h1>
        <NewsArticle item={item} />
    </main>
  )
}

export const getServerSideProps = async (context) => {
    const {params, _, __, query} = context
    const {id} = params

    console.log(query)

    const response = await fetch(`http://localhost:4000/news/${id}`)
    const data = await response.json();

    return {
        props: {
            item: data
        }
    }
}

export default NewsArtikel
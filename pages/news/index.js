import NewsArticle from '@/components/article';
import Link from 'next/link';
import React from 'react'

function NewsArticles({ articles }) {
    return (
        <main>
            <h1>NewsArticles</h1>
            {
                // articles.map(item => <NewsArticle key={item.id} item={item} />)
                articles.map(item => {
                    return (
                        <section key={item.id}>
                            <Link href={`http://localhost:3000/news/article/${item.id}`}>
                                <h2>{item.id} -- {item.title}</h2>
                            </Link>
                            {/* <h2>{item.id} -- {item.title}</h2> */}
                            <h3>{item.category}</h3>
                        </section>
                    )
                })
            }
        </main>
    )
}

export const getServerSideProps = async () => {
    const response = await fetch("http://localhost:4000/news")
    const data = await response.json();
    return {
        props: { articles: data }
    }
}

export default NewsArticles
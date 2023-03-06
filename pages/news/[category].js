import Link from 'next/link'
import React from 'react'

function NewsCategory({ category, articles }) {
    return (
        <main>
            <h1>News Article For Category -- {category}</h1>
            {
                articles?.map(item => {
                    return (
                        <section key={item.id}>
                            <br />
                            {/* <h2>{item.id} -- {item.title}</h2> */}
                            <Link href={`http://localhost:3000/news/article/${item.id}`}>
                                <h2>{item.id} -- {item.title}</h2>
                            </Link>
                            {/* <h2>{item.id} -- {item.title}</h2> */}
                            <h3>{item.category}</h3>
                            <hr />
                            <br />
                        </section>
                    )
                })
            }
        </main>
    )
}

export const getServerSideProps = async (context) => {
    const { params, req, res, query } = context
    const { category } = params

    // context also gives us access to req and res parameter, which will help us do a wide range of server side work, such as read or write cookie for instance
    console.log(req.headers.cookie, query)
    res.setHeader("Set-Cookie", ["test", "ab"])

    const response = await fetch(`http://localhost:4000/news?category=${category}`)
    const data = await response.json();

    return {
        props: {
            articles: data,
            category: category
        }
    }
}

export default NewsCategory
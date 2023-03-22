import React from 'react'

const ArticlesListByCategory = ({ articles, category }) => {
    return (
        <>
            <div>ArticlesListByCategory -- {category}</div>
            {
                articles?.map(article => {
                    return (
                        <div key={article.id}>
                            <h2>{article.id} -- {article.title} | {article.category}</h2>
                            <p>{article.description}</p>
                            <hr />
                        </div>
                    )
                })
            }
        </>
    )
}

export const getServerSideProps = async (context) => {
    const { params, req, res, query } = context;
    const { category } = params;

    console.log(`pre-rendering new articles for category: ${category}`)

    // we also have access to standard html req and res object for intecepting incoming request user id and cookies and as such
    console.log(req.headers.cookie, "cookies!!");
    res.setHeader("Set-Cookie", ["name=a.b."]);
    console.log(query, "queries")

    const response = await fetch(`http://localhost:4000/news?category=${category}`);
    const data = await response.json();

    return {
        props: {
            articles: data,
            category
        }
    }
}

export default ArticlesListByCategory
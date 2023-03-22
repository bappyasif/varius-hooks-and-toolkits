import React from 'react'

const NewsList = ({articles}) => {
    return (
        <>
            <div>NewsList</div>
            {
                articles?.map(article => {
                    return (
                        <div key={article.id}>
                            <h2>{article.id} -- {article.title} | {article.category}</h2>
                        </div>
                    )
                })
            }
        </>
    )
}

/**
 * 
 * some key notes
 * getServerSideProps runs only on server side and never on client side, also code inside it wont even be bundled into js for browsers
 * we can write server side code, such as fs or db realted codes, directly into it also including api keys as it wont be sent with js bundle for browsers
 * getServerSideProps is only allowed in a page file and not in any other components file, and is used only for pre-rendering and not client side data fetching 
 * getServerSideProps should return a object with key called "props" and in it an object containing data for pre-rendering
 * getServerSideProps will run at a request time and is bit slower than SSG / ISG
 */

export const getServerSideProps = async () => {
    console.log("pre-rendering for new articles")
    const response = await fetch("http://localhost:4000/news");
    const data = await response.json()

    return {
        props: { articles: data }
    }
}

export default NewsList
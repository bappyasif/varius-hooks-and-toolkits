import React from 'react'

function NewsArticle({item}) {
  return (
    <section>
        <h1>NewsArticle</h1>
        <h2>{item.id} -- {item.title}</h2>
        <h3>{item.category}</h3>
        <h4>{item.description}</h4>
    </section>
  )
}

export default NewsArticle
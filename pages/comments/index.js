import React, { useState } from 'react'

function CommentsPage() {
    let [comments, setComments] = useState([]);
    let [comment, setComment] = useState("");

    const fetchComments = () => {
        fetch("http://localhost:3001/api/comments")
            .then(resp => resp.json())
            .catch(err => console.log("request error", err))
            .then(data => {
                // console.log("running", data)
                data && setComments(data)
            })
            .catch(err => console.log("response error", err))
    }
    const handleSubmit = () => {
        fetch("http://localhost:3001/api/comments", {
            method: "POST",
            body: JSON.stringify({comment}),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(resp => resp.json())
        .catch(err => console.log("request error", err))
        .then(data => console.log(data))
        .catch(err => console.log("response error", err))
    }
    const handleDelete = id => {
        fetch(`/api/comments/${id}`, {
            method: "DELETE"
        }).then(resp => resp.json())
        .catch(err => console.log("request error", err))
        .then(data => {
            console.log(data)
            fetchComments()
        })
        .catch(err => console.log("response error", err))
    }
    return (
        <main>
            <h1>CommentsPage</h1>
            <fieldset>
                <legend>add comment</legend>
                <input 
                    type={"text"}
                    value={comment}
                    onChange={ e => setComment(e.target.value) }
                />
            </fieldset>
            <button onClick={handleSubmit}>Submit Comment</button>
            <button onClick={fetchComments}>Load Comments</button>
            {
                comments?.map(item => {
                    return (
                        <section key={item.id}>
                            <h2>{item.id} -- {item.text}</h2>
                            <button onClick={() => handleDelete(item.id)}>X</button>
                        </section>
                    )
                })
            }
        </main>
    )
}

export default CommentsPage
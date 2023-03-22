import React, { useState } from 'react'

const CommentsPage = () => {
    const [commData, setCommData] = useState([]);
    const [comment, setComment] = useState("");

    const loadComments = async () => {
        const response = await fetch("http://localhost:3000/api/comments");
        const data = await response.json();
        console.log(data.comments)
        setCommData(data.comments)
    }

    const handleAdd = async () => {
        const response = await fetch("/api/comments", {
            method: "post",
            body: JSON.stringify({comment}),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json()

        setCommData(prev => [...prev, data.comment])

        console.log(data, "Data!!")
    }

    const handleDelete = async commentId => {
        const response = await fetch(`http://localhost:3000/api/comments/${commentId}`, {method: "DELETE"})
        const data = await response.json();

        console.log(data, "delete!!")
        // load comments after deletion
        loadComments()
    }

    const handleUpdate = async commentId => {
        const response = await fetch(`http://localhost:3000/api/comments/${commentId}`, {method: "PUT", body: JSON.stringify({comment}), headers: {
            "Content-Type": "application/json"
        }})
        const data = await response.json()
        console.log(data, "update!!", comment)
        // load comments after deletion
        loadComments()
    }
    
    return (
        <>
            <div>CommentsPage</div>
            <input 
                type={"text"}
                value={comment}
                onChange={e => setComment(e.target.value)}
            />
            <button onClick={handleAdd}>Add Comment</button>
            <br />
            <button onClick={loadComments}>Load Comments</button>
            {
                commData?.map(comment  => {
                    return (
                        <div key={comment.id} className={`flex gap-2`}>
                            <h2>{comment.id} -- {comment.text}</h2>
                            <button onClick={() => handleDelete(comment.id)}> Delete [X] </button>
                            <button onClick={() => handleUpdate(comment.id)}> Update [/\] </button>
                        </div>
                    )
                })
            }
        </>
    )
}

export default CommentsPage
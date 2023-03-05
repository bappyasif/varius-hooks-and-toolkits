import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { axios_request } from "../utils/another-axios-interceptor"

const addNewPost = data => axios_request.post("/posts", data)

export const TRQPostCreatePage = () => {
    const [postData, setPostData] = useState({})

    const navigate = useNavigate("")

    const handleChange = (evt, elem) => setPostData(prev => ({ ...prev, [elem]: evt.target.value }))

    const { mutate: newData, isLoading, isError, error } = useMutation(() => addNewPost(postData), {
        onSuccess: (responseData) => {
            console.log(responseData, "!!")
            navigate("/posts")
        }
    })

    const addPost = (e) => {
        e.preventDefault();
        if (postData.title && postData.body) {
            newData()
        } else {
            alert("no new post created, both title and body should be present")
        }
    }

    if (isError) return <h2>Error Occured {error.message}</h2>

    if (isLoading) return <h2>Data Adding In Progress....</h2>

    return (
        <main>
            <h1>TRQPostCreatePage</h1>
            <form method="post" onSubmit={addPost}>
                <h1>PostsCreatePage</h1>
                <fieldset>
                    <label htmlFor="title">Post Title</label>
                    <input id="title" value={postData["title"] || ""} type={"text"} placeholder={"Posts Title Goes Here"} onChange={e => handleChange(e, "title")} />
                </fieldset>
                <fieldset>
                    <label htmlFor="body">Post Body</label>
                    <textarea id="body" type={"text"} value={postData["body"] || ""} placeholder={"Posts Body Goes Here"} onChange={e => handleChange(e, "body")} />
                </fieldset>
                <button type="submit">create blog</button>
            </form>
        </main>
    )
}

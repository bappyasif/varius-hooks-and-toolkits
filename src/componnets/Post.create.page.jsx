import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { axios_request } from "../utils/another-axios-interceptor"

export const PostCreatePage = () => {
    const [posts, setPosts] = useState()
    const [postData, setPostData] = useState({})
    const navigate = useNavigate()

    const fetchPosts = async () => {
        const response = await axios_request.get("/posts")
        const data = response.data;
        setPosts(data);
    }

    const handleChange = (evt, elem) => setPostData(prev => ({ ...prev, [elem]: evt.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(postData)
        try {
            let allPosts = null;

            if (postData.title && postData.body) {
                const response = await axios_request.post("/posts", postData)
                allPosts = [...posts, response.data]
                // allPosts = [...posts, postData]
                setPostData({})
                navigate("/posts")
            } else {
                alert("no new post created, both title and body should be present")
                allPosts = [...posts]
            }

            // setPostData({})
            setPosts(allPosts)

        } catch (err) {
            console.log(err.message, ":: ERROR ::")
        }
    }

    console.log(posts, "allPosts")

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <main>
            <form method="post" onSubmit={handleSubmit}>
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

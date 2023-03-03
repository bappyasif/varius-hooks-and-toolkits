import { useEffect, useState } from "react"
import { axios_request } from "../utils/another-axios-interceptor"

export const PostsPage = () => {
    const [posts, setPosts] = useState([])
    const fetchPosts = async () => {
        try {
            const response = await axios_request.get("/posts")
            const data = response.data;
            setPosts(data);
        } catch (err) {
            if (err.response) {
                // not in 200 reponse
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            } else {
                // when no response is sent back from server
                console.log("Something's wrong....", err.message)
            }
        }
    }
    useEffect(() => {
        fetchPosts()
    }, [])
    return (
        <main>
            <h1>PostsPage</h1>
            {
                posts?.map(post => {
                    return (
                        <article key={post.id}>
                            <h2>{post.id} -- {post.title}</h2>
                            <h4>{post.body}</h4>
                        </article>
                    )
                })
            }
        </main>
    )
}

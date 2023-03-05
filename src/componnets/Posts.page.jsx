import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
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
    const handleDelete = async (e) => {
        try {
            const response = await axios_request.delete(`/posts/${e.target.parentNode.id}`)
            fetchPosts();
        } catch (err) {
            console.log("Something's wrong....", err.message)
        }

    }
    useEffect(() => {
        setPosts([])
        fetchPosts()
        console.log("IM RUNNING!!")
        // setEditToggle(false)
    }, [])
    return (
        <main>
            <h1>PostsPage</h1>
            {
                posts?.map(post => {
                    return (
                        <Link key={post.id} to={`/posts/${post.id}`}>
                            <article key={post.id} id={post.id}>
                                <h2>{post.id} -- {post.title}</h2>
                                <h4>{post.body}</h4>
                                <h6 onClick={handleDelete}>X</h6>
                                {/* <h6 onClick={() => setEditToggle(prev => !prev)}>Edit</h6> */}
                            </article>
                        </Link>
                    )
                })
            }
        </main>
    )
}

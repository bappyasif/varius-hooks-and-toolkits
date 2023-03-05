import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { axios_request } from "../utils/another-axios-interceptor";

export const PostDetailPage = () => {
  const [post, setPost] = useState();
  const [editToggle, setEditToggle] = useState(false);

  const navigate = useNavigate()
  const params = useParams()

  const { postId } = params
  console.log(params, postId, "!!!!")

  const fetchPostData = async () => {
    try {
      const response = await axios_request.get(`/posts/${postId}`)
      const data = response.data
      setPost(data)
    } catch (err) {
      console.log(`Error occured: ${err.message}`)
    }
  }

  const handleDelete = async () => {
    try {
      const response = await axios_request.delete(`/posts/${postId}`)
      navigate("/posts")
    } catch (err) {
      console.log("Something's wrong....", err.message)
    }

  }

  useEffect(() => {
    fetchPostData()
  }, [])

  return (
    <main>
      <h1>PostDetailPage</h1>
      {
        post?.id && !editToggle
          ?
          <article key={post.id} id={post.id}>
            <h2>{post.id} -- {post.title}</h2>
            <h4>{post.body}</h4>
            <h6 onClick={handleDelete}>X</h6>
            <h6 onClick={() => setEditToggle(prev => !prev)}>Edit</h6>
          </article>
          :
          !post?.id && !editToggle
            ?
            <>
              <h2>Post is not Found!!</h2>
              <p>Visit out posts <Link to={"/posts"}>page</Link> to choose from there</p>
            </>
            :
            <EditPost post={post} />
      }
    </main>
  )
}

const EditPost = ({ post }) => {
  const [postData, setPostData] = useState({})
  const navigate = useNavigate()

  const handleChange = (evt, elem) => setPostData(prev => ({ ...prev, [elem]: evt.target.value }))

  const handleUpdatePost = async () => {
    await axios_request.put(`/posts/${postData.id}`, postData)
    // const updatedPosts = posts.map(post => post.id === e.target.id ? { ...response.data } : post)
    // setPosts(updatedPosts)
    setPostData({})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(postData)
    try {
      if (postData.title && postData.body) {
        handleUpdatePost()
        navigate("/posts")
      } else {
        alert("no new post created, both title and body should be present")
      }
    } catch (err) {
      console.log(err.message, ":: ERROR ::")
    }
  }

  useEffect(() => {
    setPostData(post)
  }, [])
  return (
    post
      ?
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
          <button type="submit">update blog</button>
        </form>
      </main>
      : null
  )
}

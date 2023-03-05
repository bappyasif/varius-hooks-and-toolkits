import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { axios_request } from "../utils/another-axios-interceptor"

export const TRQPostDetailPage = () => {
    const [editToggle, setEditToggle] = useState(false);

    const params = useParams()
    const { postId } = params

    const navigate = useNavigate()

    const fetchPost = async () => axios_request.get(`/posts/${postId}`)

    const { isLoading, isError, data: post, error } = useQuery({
        queryKey: ["post", postId],
        queryFn: fetchPost
    })

    const deletePost = async () => axios_request.delete(`/posts/${postId}`)

    const { mutate, isError: forDelError, isLoading: forDelLoading } = useMutation(deletePost, {
        onSuccess: () => {
            navigate("/posts")
        }
    })

    const handleDelete = () => mutate()

    return (
        <main>
            <h1>TRQPostDetailPage</h1>
            {(isError || forDelError) ? <h2>Error Occured {error.message}</h2> : null}
            {(isLoading || forDelLoading) ? <h2>Data Loading....</h2> : null}

            {
                post?.data.id && !editToggle
                    ?
                    <article key={post.data.id} id={post.data.id}>
                        <h2>{post.data.id} -- {post.data.title}</h2>
                        <h4>{post.data.body}</h4>
                        <h6 onClick={handleDelete}>X</h6>
                        <h6 onClick={() => setEditToggle(prev => !prev)}>Edit</h6>
                    </article>
                    : !post?.data.id && !editToggle
                        ?
                        <>
                            <h2>Post is not Found!!</h2>
                            <p>Visit out posts <Link to={"/posts"}>page</Link> to choose from there</p>
                        </>
                        :
                        post?.data.id && editToggle
                            ?
                            <EditPost post={post.data} toggleEdit={() => setEditToggle(prev => !prev)} />
                            : null
            }
        </main>
    )
}

const EditPost = ({ post, toggleEdit }) => {
    const [postData, setPostData] = useState({})
    // const navigate = useNavigate()

    const clientQuery = useQueryClient()

    const handleChange = (evt, elem) => setPostData(prev => ({ ...prev, [elem]: evt.target.value }))

    const updatePost = async () => await axios_request.put(`/posts/${post.id}`, postData)

    const { mutate } = useMutation(updatePost, {
        onSuccess: (responseData) => {
            // even though this would work but we can rather improve upon this by updating its dataset in query and stay in this route instead
            navigate("/posts")

            // clientQuery.invalidateQueries(["post", post.id])
            // toggleEdit()

            // clientQuery.setQueryData(["post", post.id], () => {
            //     // console.log(oldData, "!!")

            //     console.log(responseData.data, post)
            //     toggleEdit()
            //     return {
            //         // data: [{...post, ...responseData["data"]}]
            //         data: [responseData.data]
            //     }
            // })
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(postData)
        try {
            if (postData.title && postData.body) {
                mutate()
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
        post.id
            ?
            <main>
                <form method="post" onSubmit={handleSubmit}>
                    <h1>PostUpdatePage</h1>
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
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks";
import { downVoted, upVoted } from "../posts/postsSlice";

export const ViewUserPosts = () => {
    const { userId } = useParams();

    const posts = useAppSelector(state => state.posts.posts);

    const users = useAppSelector(state => state.postsUsers.users);

    const userPostsOnly = posts.filter(item => item.userId === Number(userId))

    console.log(userPostsOnly, posts, "!!")

    const getUserName = users.find(item => item.id === Number(userId))?.name

    const dispatch = useAppDispatch()

    const handleUpvote = (postId:number) => {
        dispatch(upVoted(postId))
    }

    const handleDownvote = (postId:number) => {
        dispatch(downVoted(postId))
    }

    const renderPosts = userPostsOnly.map(item => {
        const { body, id, title, userId, down, up } = item

        return (
            <article key={userId + id}>
                <p>Post Number : {id}</p>
                <h2>{title}</h2>
                <p>{body.substring(0, 69)} ....</p>
                <div>
                    <button onClick={() => handleUpvote(item.id)}>up vote -- {up}</button>
                    <button onClick={() => handleDownvote(item.id)}>down vote -- {down}</button>
                </div>
            </article>
        )
    })

    return (
        <div>
            <h2>ViewUserPosts -- {userId} -- {userPostsOnly.length}</h2>
            <h1>Posts From {getUserName}</h1>
            <div className="flex flex-col gap-4">
                {renderPosts}
            </div>
        </div>
    )
}

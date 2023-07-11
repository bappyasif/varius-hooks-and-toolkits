import { useParams } from "react-router-dom"
import { useAppSelector } from "../../hooks";

export const ViewUserPosts = () => {
    const {userId} = useParams();
    
    const posts = useAppSelector(state => state.posts.posts);
    
    const users = useAppSelector(state => state.postsUsers.users);

    const userPostsOnly = posts.filter(item => item.userId === Number(userId))
    
    console.log(userPostsOnly, posts, "!!")

    const getUserName = users.find(item => item.id === Number(userId))?.name

    const renderPosts = userPostsOnly.map(item => {
        const {body, id, title, userId} = item
        
        return (
            <article key={userId + id}>
                <p>Post Number : {id}</p>
                <h2>{title}</h2>
                <p>{body.substring(0,69)} ....</p>
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

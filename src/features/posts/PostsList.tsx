import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks"
import { fetchPosts } from "./fetchRequests";
import { PostType } from "./postsSlice";

export const PostsList = () => {
    const begin = useAppSelector(state => state.posts.fetchNow);
    const posts = useAppSelector(state => state.posts.posts);
    const dispatch = useAppDispatch()

    useEffect(() => {
        // begin && fetchPosts()
        // begin && dispatch(loadPosts(fetchPosts()))
        begin && dispatch(fetchPosts())
    }, [begin])

    // console.log(posts.sort((a:PostType, b:PostType) => a.userId < b.userId ? 1 : a.userId > b.userId ? -1 : 0))

    const renderPosts = (
        <div>
            {posts.map(item => (
                <article key={item.id + item.userId}>
                    <p>User ID: {item.userId}</p>
                    <h2>{item.title}</h2>
                    <p>{item.body.substring(0, 69)}....</p>
                </article>
            ))}
        </div>
    )

    return (
        <div>
            <h2>PostsList -- {posts.length}</h2>
            {renderPosts}
        </div>
    )
}

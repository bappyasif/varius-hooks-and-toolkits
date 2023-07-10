import { BeginFetching } from "../features/posts/BeginFetching"
import { PostsList } from "../features/posts/PostsList"

export const Posts = () => {
  return (
    <div>
        <h2>Posts</h2>
        <BeginFetching />
        <PostsList />
    </div>
  )
}

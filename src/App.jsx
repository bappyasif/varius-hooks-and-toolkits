import { Counter } from "./features/counter"
import { PostsList } from "./features/posts"
import { AddPostForm } from "./features/posts/AddPostForm"

function App() {
  return (
    <>
      <Counter />
      <AddPostForm />
      <PostsList />
    </>
  )
}

export default App

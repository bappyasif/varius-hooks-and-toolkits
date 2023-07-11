import { Users } from "./components/Users"
import { Counter } from "./components/Counter"
import { Posts } from "./components/Posts"
import { Routes, Route } from "react-router-dom"
import { AllUsersList } from "./features/postsUsers/AllUsersList"
import { ViewUserPosts } from "./features/postsUsers/ViewUserPosts"
import { Header } from "./components/Header"
import { AddNewPost } from "./features/posts/AddNewPost"

function App() {
  const initElem = (
    <>
      <Counter />
      <Users />
    </>
  )
  return (
    <>
      {/* <Counter />
      <Users /> */}
      {/* <Posts /> */}
      <Header />
      <Routes>
        <Route index element={initElem} />
        {/* <Route path="/newPost" element={<AddNewPost />} /> */}
        <Route path="/posts">
          <Route index element={<Posts />} />
          <Route  path="newPost" element={<AddNewPost />} />
          <Route path=":postId" element={"view post"} />
        </Route>
        <Route path="/users">
          <Route index element={<AllUsersList />} />
          <Route path=":userId" element={<ViewUserPosts />} />
        </Route>
      </Routes>
    </>
  )
}

export default App

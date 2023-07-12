import { Route, Routes } from "react-router-dom"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { HomePage } from "./pages/HomePage"

function App() {
  return (
    <>
      <div className="flex flex-col gap-11 items-center min-h-full">
        <Header />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/categories">
            <Route index element={"categories view"} />
            <Route path=":categoryId" element={"category view"} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App

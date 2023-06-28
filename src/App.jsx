// import Counter from "./app/features/counter/Counter"

import { ChatbotTryout } from "./chatbot"
import { Counter } from "./components/Counter"
import { Tryout } from "./tryout"

function App() {
  return (
    <>
      {/* <Counter /> */}
      <Counter />
      <Tryout />
      <ChatbotTryout />
    </>
  )
}

export default App

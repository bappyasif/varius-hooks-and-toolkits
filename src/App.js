import { Provider } from "react-redux";
// import { StudentInfoSysChatbot } from "./components/Chatbot";
import store from "./store";
import { MakeSystemReady } from "./routes/BeginChatbot";
import { StudentInfoSysChatbot } from "./routes/Chatbot";
// import { MakeSystemReady } from "./components/BeginChatbot";

function App() {

  return (
    <div>
      <Provider store={store}>
        <MakeSystemReady />
        <StudentInfoSysChatbot />
      </Provider>
    </div>
  );
}

export default App;

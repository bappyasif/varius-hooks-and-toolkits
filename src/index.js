import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import { StudentInfoSysChatbot } from './components/Chatbot';
import { Provider } from 'react-redux';
import store from './store';
// import { MakeSystemReady } from './components/BeginChatbot';
import { ConfirmationPage } from './routes/Confirmation';
import { MakeSystemReady } from './routes/BeginChatbot';
import { StudentInfoSysChatbot } from './routes/Chatbot';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MakeSystemReady />
  },
  {
    path: "/chatbot",
    element: <StudentInfoSysChatbot />
  },
  {
    path: "/confirmation",
    element: <ConfirmationPage />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    {/* <App /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

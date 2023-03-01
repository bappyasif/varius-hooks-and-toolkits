import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import App from './App'
import './index.css'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <BrowserRouter>
      <App />
    </BrowserRouter> */}
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <ReactQueryDevtools initialIsOpen={false} position={"top-right"} />
      </BrowserRouter>
      {/* <App /> */}
      {/* so that we can see in what states are our react query is */}
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  </React.StrictMode>,
)

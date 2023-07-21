import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Provider } from "react-redux"
import store from './app/store.ts'
import { fetchCategories, fetchCuisines, fetchIngredients } from './data_fetching/index.ts'

store.dispatch(fetchCuisines())
store.dispatch(fetchCategories())
store.dispatch(fetchIngredients())
// store.dispatch(fetchOneRandomMeal())

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)

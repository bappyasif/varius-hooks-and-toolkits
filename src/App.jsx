import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import HomePage from './componnets/Home.page'
import SuperheroesPage from './componnets/Superheroes.page'
import TRQSuperheroesPage from './componnets/TRQ.Superheroes.page';
function App() {
  return (

    <div className="App">
      {/* <h1>Hello Tanstack React Query!!</h1> */}
      <nav>
        <ul>
          <li><Link to={"/"}>Home</Link></li>
          <li><Link to={"/super-heroes"}>Superheroes - Traditional Fetching</Link></li>
          <li><Link to={"/super-heroes-trq"}>Superheroes - Tanstack React Query Fetching</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/super-heroes' element={<SuperheroesPage />} />
        <Route path='/super-heroes-trq' element={<TRQSuperheroesPage />} />
      </Routes>
    </div>

  )
}

export default App

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
import TRQCustomHookExercise from './componnets/TRQ.CustomHookExercise';
import { TRQSuperheroDetailPage } from './componnets/TRQ.SuperheroDetail.page';
import { TRQParallelQueriesPage } from './componnets/TRQParallelQueries.page';
import { TRQDynamicParallelQueriesPage } from './componnets/TRQDynamicParallelQueries.page';
import { TRQDependentQueriesPage } from './componnets/TRQDependentQueries.page';
import { TRQPaginatedQueriesPgae } from './componnets/TRQPaginatedQueries.pgae';
import TRQInfinitePaginationQueriesPage from './componnets/TRQInfinitePaginationQueries.page';
import { PostsPage } from './componnets/Posts.page';
import { PostCreatePage } from './componnets/Post.create.page';
import { PostDetailPage } from './componnets/Post.detail.page';
import { TRQPostsPage } from './componnets/TRQ.Posts.Page';
import { TRQPostCreatePage } from './componnets/TRQ.Post.Create.Page';
import { TRQPostDetailPage } from './componnets/TRQ.Post.Detail.page';
function App() {
  return (

    <div className="App">
      {/* <h1>Hello Tanstack React Query!!</h1> */}
      <nav>
        <ul>
          <li><Link to={"/"}>Home</Link></li>
          <li><Link to={"/super-heroes"}>Superheroes - Traditional Fetching</Link></li>
          <li><Link to={"/super-heroes-trq"}>Superheroes - Tanstack React Query Fetching</Link></li>
          {/* <li><Link to={"/custom-hook-exercise-trq"}>Superheroes - Custom Hook Usage Exercise</Link></li> */}
        </ul>
      </nav>

      <Routes>
        {/* <Route path='/posts' element={<PostsPage />} />
        <Route path='/posts/:postId' element={<PostDetailPage />} />
        <Route path='/post-create' element={<PostCreatePage />} /> */}

        <Route path='/posts' element={<TRQPostsPage />} />
        <Route path='/posts/:postId' element={<TRQPostDetailPage />} />
        <Route path='/post-create' element={<TRQPostCreatePage />} />


        <Route path='/' element={<HomePage />} />
        <Route path='/trq-infinite' element={<TRQInfinitePaginationQueriesPage />} />
        <Route path='/trq-paginated' element={<TRQPaginatedQueriesPgae />} />
        <Route path='/trq-dependent' element={<TRQDependentQueriesPage emailAddr={"ab@cdef.ghi"} />} />
        <Route path='/trq-parallel' element={<TRQParallelQueriesPage />} />
        <Route path='/trq-dynamic-parallel' element={<TRQDynamicParallelQueriesPage heroIds={[1, 4]} />} />
        <Route path='/super-heroes-trq/:heroId' element={<TRQSuperheroDetailPage />} />
        <Route path='/super-heroes' element={<SuperheroesPage />} />
        <Route path='/super-heroes-trq' element={<TRQSuperheroesPage />} />
        {/* <Route path='/custom-hook-exercise-trq' element={<TRQCustomHookExercise />} /> */}
      </Routes>
    </div>

  )
}

export default App

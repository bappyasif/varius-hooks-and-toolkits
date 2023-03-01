import './App.css'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const POSTS = [
  { id: 1, title: "Texst Een" },
  { id: 2, title: "Texst Twee" },
]

function App() {
  const queryClient = useQueryClient();

  // understanding queryKey
  /**
   * 
   * 
   /posts => ["posts"]
   /posts/id => ["posts", id]
   /posts?authorId=1 => ["posts", {authorId: 1}]
   /posts/2/comments => ["posts", post.id, "comments"]
   */

  const postsQuery = useQuery({
    // give a unique identifier
    queryKey: ["posts"],
    // give a function to get data
    // this function always takes in a promise, be that a resolve or a reject
    // usually this going to be a fetch type of requests internally or externally
    // queryFn: () => wait(2000).then(() => [...POSTS])
    // queryFn also takes in a parameter which has many things in it, but our current take on this only requires to look at which "queryKey" its currently fetching and thus rendering on page
    queryFn: ({queryKey}) => {
      console.log(queryKey, "queryKey")
      return wait(2000).then(() => [...POSTS])
    }
    // a demo to show error message
    // queryFn: () => Promise.reject("Error Message!!")
  })

  const newPostMutation = useMutation({
    // just like query function, this mutation functional also deals with promise
    // even though its updating our underlying data, react query still considering our "initial" posts data as valid and not taking in this "new mutation" right away
    // to mitigate this we will have to make use of useReactQuery hook and simply invalidate our pre-existing "posts" data from useQuery function
    mutationFn: title => wait(2000).then(() => POSTS.push({ id: crypto.randomUUID(), title: title })),
    // by invalidating old posts we can tell useQuery to refetch data, and thus after adding or mutating our underlying dataset, we want our data to be refetched
    onSuccess: () => queryClient.invalidateQueries("posts")
  })

  if (postsQuery.isLoading) return <h1>Loading....</h1>

  if (postsQuery.isError) return <h1>Error Occured: <pre>{JSON.stringify(postsQuery.error)}</pre></h1>

  return (
    <div className="App">
      <h1>Hello Tanstack React Query!!</h1>
      {
        postsQuery.data.map(item => <h2 key={item.id}>{item.id} -- {item.title}</h2>)
      }
      <button
        disabled={newPostMutation.isLoading}
        onClick={() => newPostMutation.mutate("New Post")}
      >
        Add New
      </button>
    </div>
  )
}

// const wait = (time) => Promise.resolve(resolve => setTimeout(resolve, time))

const wait = (time) => new Promise(resolve => setTimeout(resolve, time))

export default App

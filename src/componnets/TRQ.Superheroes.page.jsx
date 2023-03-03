import { useState } from "react"
import { Link } from "react-router-dom"
// import { useAddNewSuperhero } from "../hooks/useSuperHeroData";
import useSuperHeroesData, { useAddNewSuperhero } from "../hooks/useSuperHeroesData"

// will be using tanstack react query for same data fetching and rendering as we did in traditional way in "/super-heroes" page
function TRQSuperheroesPage() {
    const [name, setName] = useState("");
    const [alterEgo, setAlterEgo] = useState("");

    const onSuccess = (data) => {
        console.log("successfull fetching", data)
    }

    const onError = (error) => {
        console.log("error while data fetching", error)
    }

    // using reusable custom hook, so that when needed same kind of usecase of query we can simply use that instead of code duplication
    const { isLoading, data, isError, error, isFetching, refetch } = useSuperHeroesData(onError, onSuccess, "super-heroes")

    const { mutate: addNew, isLoading: heroAdding, isError: addingError, error: addErr } = useAddNewSuperhero()

    if (isLoading || isFetching || heroAdding) return <h2>Loading....</h2>

    if (isError) return <h2>{error?.message}</h2>
    // {(isError || addingError) ? <h2>{error?.message || addErr?.message}</h2> : null}

    // console.log(isLoading, isFetching, "loading <=> fetching")

    // if custom hooks are below any renderable component it would cause an error saying hooks are rendered more than it was initially rendered
    // const { mutate: addNew } = useAddNewSuperhero()

    const handleAddSuperhero = () => {
        // console.log("Add this new superhero!!", name, alterEgo, { name, alterEgo })
        const hero = { name, alterEgo }
        // mutate(hero)
        addNew(hero)
        setName("")
        setAlterEgo("")
    }

    return (
        <main>
            <h1>TRQSuperheroesPage</h1>
            {(addingError) ? <h2>{addErr?.message}</h2> : null}
            <section>
                <input type={"text"} placeholder="superhero name" value={name} onChange={e => setName(e.target.value)} />
                <input type={"text"} placeholder="superhero alter ego name" value={alterEgo} onChange={e => setAlterEgo(e.target.value)} />
                <h2><button onClick={handleAddSuperhero}>Add Superhero</button></h2>
            </section>
            {/* {(isLoading || isFetching) ? <h4>Loading Data....</h4> : null} */}
            {isFetching ? <h4>Fetching Data....</h4> : null}
            <h2><button onClick={refetch}>Fetch Heroes</button></h2>
            {
                data?.data.map(item => <h2 key={item.id}><Link to={`/super-heroes-trq/${item.id}`}>{item.name}</Link></h2>)
                // data?.map(item => <h2 key={item}>{item}</h2>)
            }
        </main>
    )
}

export default TRQSuperheroesPage
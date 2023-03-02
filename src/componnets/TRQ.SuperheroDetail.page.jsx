import { useParams } from "react-router-dom"
import { useSuperHeroData } from "../hooks/useSuperHeroData"

export const TRQSuperheroDetailPage = () => {
    const { heroId } = useParams()

    const { isLoading, isError, data } = useSuperHeroData(heroId)

    return (
        <main>
            <h1>TRQ.SuperheroDetail.page</h1>
            {isLoading ? <h2>Loading Data....</h2> : null}
            {isError ? <h2>Error Occured....</h2> : null}
            {
                data?.data
                    ?
                    <>
                        <h3>Name: {data.data.name}</h3>
                        <h4>Alter Ego: {data.data.alterEgo}</h4>
                    </>
                    : null
            }
        </main>
    )
}

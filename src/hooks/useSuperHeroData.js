import { useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

const fetchSuperhero = ({queryKey}) => {
    // this queryKey mimick how we defined it in our querykey definition, so we can make use of that to get hold of heroID from it, which is in index number 1
    const heroId = queryKey[1];
    return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

export const useSuperHeroData = (heroId) => {
    const queryClient = useQueryClient()

    return useQuery({
        queryKey: ["super-hero", heroId],
        // TQR by default sends heroId alike and other information to fetching function, so we can make use of that alternatively and safely
        queryFn: fetchSuperhero,
        // we will now be passing in initial data to query client so that we come back to this route again, we can immediate show in already cached data while refetching is happening in background
        initialData: () => {
            const hero = queryClient.getQueryData(["super-heroes"])
            ?.data.find(hero => hero.id === parseInt(heroId))
            if(hero) {
                return {data: hero}
            } else {
                return undefined
            }
        }
    })
}
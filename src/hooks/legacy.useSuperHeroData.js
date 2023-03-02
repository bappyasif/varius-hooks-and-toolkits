import { useQuery } from "@tanstack/react-query"
import axios from "axios"

// const fetchSuperhero = (heroId) => {
//     return axios.get(`http://localhost:4000/superheroes/${heroId}`)
// }

const fetchSuperhero = ({queryKey}) => {
    // this queryKey mimick how we defined it in our querykey definition, so we can make use of that to get hold of heroID from it, which is in index number 1
    const heroId = queryKey[1];
    return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

export const useSuperHeroData = (heroId) => {
    return useQuery({
        queryKey: ["super-heroes", heroId],
        // TQR by default sends heroId alike and other information to fetching function, so we can make use of that alternatively and safely
        queryFn: fetchSuperhero
        // queryFn: () => fetchSuperhero(heroId),
    })
}
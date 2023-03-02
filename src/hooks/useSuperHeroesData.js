import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchSuperheroes = () => axios.get("http://localhost:4000/superheroes")

function useSuperHeroesData(onError, onSuccess, queryName, options) {
    console.log(options?.enabled !== undefined ? options.enabled : true, "CHECK!!", options?.enabled !== undefined, options?.enabled)
    return useQuery({
        // queryKey: ["super-heroes"],
        queryKey: [queryName],
        queryFn: fetchSuperheroes,
        onSuccess: onSuccess,
        onError: onError,
        enabled: options?.enabled !== undefined ? options.enabled : true,
        // select: data => data.data.map(item => item.name)
    })
}

export default useSuperHeroesData
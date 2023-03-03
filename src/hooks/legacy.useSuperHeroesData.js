import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
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

const addSuperhero = data => {
    return axios.post("http://localhost:4000/superheroes", data)
}

export const useAddNewSuperhero = () => {
    // return useMutation(addSuperhero)

    // unless we invalidate existing super-heroes query data, our newly added superhero name wont be rendered on page unless we manually invoke refetch that same query for updated hero list
    // to mitigate that useMutations proivdes a way to invalidating a query so that react query has top refetch data automaticall upon a successfull mutation, in this case its after successfuylly adding a superhero into our db
    const clientQuery = useQueryClient();
    return useMutation(addSuperhero, {
        // we can even optimize this by using OptimisticQuery and for that we will be using onMutate, onError, and onSettled
        // onSuccess: (responseData) => {
        //     // even this is nice and does our produce intended output, but there is room for improvement
        //     // we can reduce an addition network call by using alreday returning data after successful POST request so that we can add this to oldQueryData
        //     // clientQuery.invalidateQueries("super-heroes")

        //     clientQuery.setQueryData(["super-heroes"], (oldData) => {
        //         // console.log(oldData.data, "old data", responseData.data, "newData")
        //         return {
        //             ...oldData,
        //             data: [...oldData.data, responseData.data]
        //         }
        //     })
        // }

        // onMutate: gets called before making any mutation, we here considering that data is pretty much error free and thus giving user an impression that data is updating intantaneously
        onMutate: async (newHero) => {
            await clientQuery.cancelQueries(["super-heroes"]);
            const previousData = clientQuery.getQueryData(["super-heroes"]);
            clientQuery.setQueryData(["super-heroes"], oldData => {
                return {
                    ...oldData,
                    data: [...oldData.data, {id: oldData?.data?.length + 1, ...newHero}]
                }
            })
            // for safety we are returning oldData, if there is any error occuring we can roll back to earlier dataset
            return previousData
        },

        // onError: runs when there is a error in useMutations hook, we will only need its 3rd parameter so tht we can send back its previousData back to browser for rendering with old data
        onError: (_error, _newHero, context) => {
            // we will be setting query with previously helpd data before mutatioin took place
            clientQuery.setQueryData(["super-heroes"], context.previousData)
        },

        // onSettled: runs once our mutations was successfull or error we will be fetching data from db to sync up properly
        onSettled: () => {
            clientQuery.invalidateQueries(["super-heroes"])
        }
    })
}

export default useSuperHeroesData
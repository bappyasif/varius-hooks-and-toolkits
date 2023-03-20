import { news_data_request_interceptor, request_internal } from "@/utils/axios-interceptors";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useExtractSearcResults(searchNow, setSearchNow, newsFilters, options, fsrOnly) {
    const { data: searchedResults, isError, isLoading, error } = useQuery({
        queryKey: ["news query"],
        queryFn: () => {
            const params = fsrOnly ? { ...options } : { country: newsFilters["country"], category: newsFilters["category"], language: newsFilters["language"], ...options }

            return news_data_request_interceptor({ url: "/news", params })
        },
        refetchOnWindowFocus: false,
        enabled: searchNow,
        onSuccess: () => {
            setSearchNow(false)
        },
        onError: () => setSearchNow(false),
    })

    return { searchedResults, isError, isLoading, error }
}

export function useExtractPresavedFiltersForUser(userName) {
    const extractUserPresavedData = () => {
        return request_internal({ url: "customNews", method: "get" })
    }

    const { data: presavedData } = useQuery({
        queryKey: ["presaved filters data", `${userName}`],
        queryFn: extractUserPresavedData,
        refetchOnWindowFocus: false
    })

    return {presavedData}
}

export function useToAddPresavedFilters (userName, newsFilters, presavedData) {
    const { mutate } = useMutation({
        mutationKey: ["add new data into customNews list", `${userName}`],

        mutationFn: () => {
            const keys = Object.keys(presavedData.data)
            
            const idx = keys.findIndex(key => key === userName)

            let newData = []

            if (idx !== -1) {
                const userData = presavedData.data[userName]
                
                const filtered = userData.filter(item => item?.country !== newsFilters.country || item?.language !== newsFilters.language || item?.category !== newsFilters.category)

                const updatedUserData = [...filtered, newsFilters]

                presavedData.data[userName] = updatedUserData

                newData = presavedData.data
            } else {
                presavedData.data[userName] = [newsFilters]
                
                newData = presavedData.data
            }

            return request_internal({ url: "/customNews", data: newData, method: "post" })
        }
    })

    return {mutate}
}

export function useToDeletePresavedFilters (data, options, handleFilters, entireDataset, user) {
    const removedData = () => {
        const filtered = data.filter(item => !(item.country === options.country && item.category === options.category && item.language === options.language) ? item : null).filter(item => item)
        return filtered
    }

    const { mutate } = useMutation({
        mutationKey: ["remove from filters"],
        mutationFn: () => {
            const filtered = removedData()

            handleFilters(filtered)

            entireDataset[user] = filtered

            return request_internal({ url: "/customNews", method: "post", data: entireDataset })
        }
    })

    return {mutate}
}
import { news_data_request_interceptor } from "@/utils/axios-interceptors";
import { useQuery } from "@tanstack/react-query";

export function useExtractSearcResults (searchNow, setSearchNow, newsFilters, options, fsrOnly) {
    const {data: searchedResults, isError, isLoading, error} = useQuery({
        queryKey: ["news query"],
        queryFn: () => {
            // const params = { country: newsFilters["country"], category: newsFilters["category"], language: newsFilters["language"], ...options }
            const params = fsrOnly ? {...options} : { country: newsFilters["country"], category: newsFilters["category"], language: newsFilters["language"], ...options }
            console.log(params)
            // return true
            return news_data_request_interceptor({ url: "/news", params })
        },
        refetchOnWindowFocus: false,
        enabled: searchNow,
        onSuccess: () => {
            setSearchNow(false)
        },
        onError: () => setSearchNow(false),
    })

    return {searchedResults, isError, isLoading, error}
}
import { RenderNewsArticles } from '@/components/RenderNewsArticles';
import { news_data_request_interceptor } from '@/utils/axios-interceptors';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router'
import React from 'react'

const DynamicNewsFilter = () => {
    const router = useRouter()
    const { query } = router;
    const { params } = query

    console.log(query, "router", params)

    const { data: newsData } = useQuery({
        queryKey: ["render presaved filtered news"],
        queryFn: () => {
            const params2 = { country: params[0], category: params[1], language: params[2] }
            return news_data_request_interceptor({ url: "/news", params: params2 })
        },
        enabled: params?.length ? true : false,
        refetchOnWindowFocus: false
    })

    console.log(newsData?.data)

    return (
        <main>
            <h1 className='my-2 text-2xl mb-4'>Filter In Use:____ {`country: ${params[0]}, category: ${params[1]}, language: ${params[2]}`}</h1>
            {
                newsData?.data?.results?.length
                    ?
                    <RenderNewsArticles data={newsData?.data?.results} />
                    : null
            }
        </main>
    )
}

export default DynamicNewsFilter
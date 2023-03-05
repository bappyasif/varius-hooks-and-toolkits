import { useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { Link } from 'react-router-dom'
import { axios_request } from '../utils/another-axios-interceptor'

export const TRQPostsPage = () => {
    const clientQuery = useQueryClient()

    const fetchPosts = () => {
        return axios_request.get("/posts")
    }
    
    const { isError, isLoading, data, error } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts
    })

    const handleDelete = async (e) => {
        try {
            // const response = await axios_request.delete(`/posts/${e.target.parentNode.id}`)
            await axios_request.delete(`/posts/${e.target.parentNode.id}`)
            // this would make TRQ to fetch again causing current dataset to be invalid
            clientQuery.invalidateQueries(["posts"])

            // but we can do better and simply remove this from post from current dataset, thus reducing a network call
            // clientQuery.setQueryData(["posts"], oldData => {
            //     const filteredData = oldData.data.filter(post => post.id !== response.data.id)
            //     return {
            //         ...oldData,
            //         data: [...filteredData]
            //     }
            // })
        } catch (err) {
            console.log("Something's wrong....", err.message)
        }
    }

    return (
        <main>
            <h1>TRQPostsPage</h1>
            {isError ? <h2>Error Occured {error.message}</h2> : null}
            {isLoading ? <h2>Data Loading....</h2> : null}
            {
                data?.data.map(post => {
                    return (
                        <article key={post.id} id={post.id}>
                            <Link key={post.id} to={`/posts/${post.id}`}>
                                <h2>{post.id} -- {post.title}</h2>
                                <h4>{post.body}</h4>
                            </Link>
                            <h6 onClick={handleDelete}>X</h6>
                            {/* <h6 onClick={() => setEditToggle(prev => !prev)}>Edit</h6> */}
                        </article>
                    )
                })
            }
        </main>
    )
}

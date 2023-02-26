import { comments } from '@/data/comments'
import React from 'react'

function CommentDetail({ comment }) {
    return (
        <main>
            <h1>CommentDetail</h1>
            <h2>{comment?.id} -- {comment?.text}</h2>
        </main>
    )
}

export const getStaticProps = async context => {
    const {params} = context;
    const {commId} = params;

    const comment = comments.find(item => item.id === parseInt(commId))

    // calling own pai endpoint is not recommended
    // calling external api is okay

    return {
        props: {comment: comment}
        // props: {comment: commId}
    }
}

// this is how patrhs could be hard coded, feasible only when you know there's not going to be any more entries after that
// export const getStaticPaths = async () => {
//     return {
//         paths: [
//             {params: {commId: "1"}},
//             {params: {commId: "2"}},
//             {params: {commId: "3"}},
//             {params: {commId: "4"}}
//         ],
//         fallback: false
//     }
// }

// this can be done but using api end point from within app  or self made endpoints is not recommended
// but using any external api is okay
// export const getStaticPaths = async () => {
//     const response = await fetch("http://localhost:3001/api/comments");
//     const data = await response.json()
//     console.log(data, "!!")
//     const paths = data.map(item => ({params: {commId: `${item.id}`}}))
//     return {
//         // paths: [
//         //     {params: {commId: "1"}},
//         //     {params: {commId: "2"}},
//         //     {params: {commId: "3"}},
//         //     {params: {commId: "4"}}
//         // ],
//         paths: paths,
//         fallback: false
//     }
// }

// this on other hand is completely fine and recommended, as we are using resources that is used by "comments" endpoints already
// we are using that same data file as we ould have gotten it after a fetch request to out api, instead using data directly for our requirements in this function to define paths params dynamically
export const getStaticPaths = async () =>{
    const paths = comments.map(item => ({params: {commId: `${item.id}`}}))
    // console.log(test, "test!!")

    return {
        paths: paths,
        fallback: false
    }
}


// thats not how you do this either, a note to self!!
// export const getStaticPaths = async () => {
//     const dynoPaths = []
//     comments.forEach(item => {
//         const data = {params: {commId: item.id}}
//         dynoPaths.push(data)
//     })
//     console.log(dynoPaths)
//     return {
//         paths: [...dynoPaths],
//         fallback: false
//     }

//     // return {
//     //     paths: comments.map(item => {params: {commId: item.id}}),
//     //     fallback: false
//     // }
// }

// thats not how you do this bit, a reminder to self!!
// export const getStaticPaths = async (context) => {
//     const {params} = context;
//     const {commId} = params;

//     return {
//         paths: [
//             {
//                 params: {
//                     commId: commId
//                 }
//             }
//         ]
//     }
// }

export default CommentDetail



// this is not how you do this bit, a reminder to self!!

// import { useRouter } from 'next/router'
// import React, { useEffect, useState } from 'react'

// function CommentDetail() {
//     let [data, setData] = useState()
//     const router = useRouter();
//     const {commId} = router.query
//     console.log(router.query, commId)

//     // const fetchComment = () => {
//     //     console.log("HERE!!")
//     //     // fetch(`http://localhost:3001/comments/${commId}`)
//     //     fetch(`http://localhost:3001/comments`)
//     //     .then(resp => {
//     //         console.log(resp.json())
//     //         return resp.json()
//     //     }).catch(err=>console.log("request error", err))
//     //     .then(data => {
//     //         console.log(data, "<><>")
//     //         data && setData(data)
//     //     }).catch(err=>console.log("response error", err))
//     // }

//     useEffect(() => {
//         // fetchComment()
//         // fetch(`http://localhost:3001/comments/${commId}`).then(resp=>resp.json()).then(d=>console.log(d))
//         fetch(`http://localhost:3001/comments/`).then(resp=>resp.json()).then(d=>console.log(d))
//     }, [])

//     console.log(data, "data!!")

//         // const response = await fetch(`http://localhost:3001/comments/${commId}`)
//     // const data = await response.json()
//   return (
//     <div>CommentDetail</div>
//   )
// }


// // export const getServerSideProps = async (context) => {
// //     const {params} = context
// //     const {commId} = params

// //     console.log(commId)

// //     // const response = await fetch(`http://localhost:3001/comments/${commId}`)
// //     const response = await fetch(`http://localhost:3001/comments`)

// //     console.log(response, "response!!")

// //     return {
// //         props: {data: ""}
// //     }
// // }

// export default CommentDetail
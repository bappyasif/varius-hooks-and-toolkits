import { comments } from "@/data/comments";

export default function handler (req, res) {
    const {commentId} = req.query;

    if(req.method === "GET") {
        const foundComment = comments.find(item => item.id === parseInt(commentId))
    
        return res.status(200).json({comment: foundComment})
    } else if (req.method === "DELETE") {
        const filteredComments = comments.filter(item => item.id !== parseInt(commentId))
        // console.log(filteredComments, "filtered!!")
        const foundComment = comments.find(item => item.id === parseInt(commentId))

        // update comments with filtered dtaa after delete
        const idx = comments.findIndex(item => item.id === parseInt(commentId))
        comments.splice(idx, 1)
    
        return res.status(200).json({comments: filteredComments, deletedComment: foundComment})
        // res.status(200).json({comments: filteredComments})
    }

    // console.log(commentId)
}

// export default function handler (req, res) {
//     const {commentId} = req.query;

//     console.log(commentId)

//     const foundComment = comments.find(item => item.id === parseInt(commentId))
    
//     res.status(200).json({comment: foundComment})
// }
import { comments } from "@/data-demo/comments"

export default function handler(req, res) {
    const { commId } = req.query

    // const comment = comments.find(item => item.id === parseInt(commId))
    const commentFound = comments.find(item => item.id === parseInt(commId))
    
    if (req.method === "GET") {
        return res.status(200).json({ msg: "comment data", comment: commentFound })
    } else if (req.method === "PUT") {
        const newCommentText = req.body.comment;
        // const {comment} = req.body
        // const comment = req.body.comment;

        const idx = comments.findIndex(item => item.id === parseInt(commId))
        
        comments[idx].text = newCommentText || "f o"

        console.log(comments, "updated!!", newCommentText, req.body, req.body.comment, req.body["comment"], JSON.stringify({comment: req.body}))

        return res.status(200).json({ msg: "updated comment", comment: commentFound })

    } else if (req.method === "DELETE") {
        const idx = comments.findIndex(item => item.id === parseInt(commId))
        comments.splice(idx, 1)
        return res.status(200).json({ msg: "deleted comment", comment: commentFound })
    }
}
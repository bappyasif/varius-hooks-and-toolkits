import { comments } from "@/data-demo/comments";

export default function handler(req, res) {
    if(req.method === "GET") {
        return res.status(200).json({msg: "all comments", comments: comments})
    } else if(req.method === "POST") {
        const comment = req.body.comment;

        console.log(comment, req.body)
        
        const newComment = {
            id: Date.now(),
            text: comment
        }
        
        comments.push(newComment);

        return res.status(201).json({msg: "added comment", comment: newComment})
    }  
}
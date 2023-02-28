import { getSession } from "next-auth/react"

const handler = (req, res) => {
    // to secure a api route we will use make use of getSession function and based on authorization we will send back appropriate response back to client
    // this function will require "request" as its parameter just as it would in server side pages (i.e. context)
    getSession({req: req})
    .then(session => {
        if(!session) {
            return res.status(400).json({msg: "authorization failed!! unauthenticated user!!"})
        } else {
            // we can also make use of authorization after authentication, such as if user has access to this resource or not
            // we can do further authorization by looking into session data and check agains ouyr requirement for any further authorization that we might need here
            return res.status(200).json({msg: "Successfull Authentication", session: session})
        }
    }).catch(err => res.status(500).json({msg: "something's wrong!!", error: err}))
}

export default handler
/**
 * 
 * nextjs is a full stack framework
 * we can write FE code in react and write API that can be called by FE code
 * API routes allow you to create RESTful endpoints as part of our nextJS app folder structure
 * within pages folder we need to create a folder called "api"
 * within "api" folder we can define all our api routes for our app
 * we can add business logic without needing to write any additional custom server code and without having to configure any API routes
 * nextJS gives us evrything we need to write full stack React + nodeJS app
 */

export default function handler(req, res) {
    return res.status(200).json({msg: "hello from nextJS api"})
}
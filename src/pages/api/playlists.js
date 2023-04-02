import client from "../../lib/mongodb"

// export default function handler (req, res) {
//     client.then(value => {
//         // console.log(value.db("user"))
//         const collection = value.db("users")
//         const docs = collection?.find({});
//         console.log(docs)
//     }).catch(err => console.log(err))
//     res.status(200).json({msg: "'t is levend"})
// }

export default async function handler (req, res) {
    const dbClient = await client;
    const db = await dbClient.db("nextjsTryout")
    const collection = db.collection("users")
    const docs = await collection?.find({name: "a.b."});
    const data = await docs.data
    // docs.then(value => console.log(value))
    // console.log(docs)
    res.status(200).json({msg: "'t is levend"})
}
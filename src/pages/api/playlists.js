import "@/lib/mongodb";
import playlist from "@/model/playlist"

export default async function handler (req, res) {

    if(req.method === "POST") {
        
        const test = new playlist({
            name: req.body.name,
            // tracks: ["1", "2"]
        });
    
        test.save()

        return res.status(200).json({test})
    }

    // console.log(req.method, req.body, "!!WHTA!!", req.body?.name)

    res.status(200).json({msg: "'t is levend"})
}

// export default async function handler (req, res) {
//     // const test = new Playlist({
//     //     name: "test",
//     //     tracks: ["1", "2"]
//     // });

//     console.log(req.method, req.body, "!!WHTA!!", req.body?.name)

//     const test = new playlist({
//         name: "test22",
//         tracks: ["1", "2"]
//     });

//     test.save()

//     // const test = Playlist.create({
//     //     name: "test",
//     //     tracks: ["1", "2"]
//     // });

//     // ClientPromise.then(() => {
//     //     console.log("Database connected!")
//     //     // test.save().then((value) => console.log("item saved", value)).catch(err=>console.log(err))
//     // })
//     // .catch(err => console.log(err));

//     res.status(200).json({msg: "'t is levend", test})
// }

// export default async function handler (req, res) {
//     const test = new Playlist({
//         name: "test",
//         tracks: ["1", "2"]
//     });

//     ClientPromise.then(() => {
//         console.log("Database connected!")
//         // test.save().then((value) => console.log("item saved", value)).catch(err=>console.log(err))
//     })
//     .catch(err => console.log(err));

//     // test.save().then((value) => console.log("item saved", value)).catch(err=>console.log(err))
//     // docs.then(value => console.log(value))
//     // console.log(docs)
//     res.status(200).json({msg: "'t is levend"})
// }

// export default function handler (req, res) {
//     client.then(value => {
//         // console.log(value.db("user"))
//         const collection = value.db("users")
//         const docs = collection?.find({});
//         console.log(docs)
//     }).catch(err => console.log(err))
//     res.status(200).json({msg: "'t is levend"})
// }

// export default async function handler (req, res) {
//     const dbClient = await client;
//     const db = await dbClient.db("nextjsTryout")
//     const collection = db.collection("users")
//     const docs = await collection?.find({name: "a.b."});
//     const data = await docs.data
//     // docs.then(value => console.log(value))
//     // console.log(docs)
//     res.status(200).json({msg: "'t is levend"})
// }
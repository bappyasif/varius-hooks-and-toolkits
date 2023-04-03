import "@/lib/mongodb";
import playlist from "@/model/playlist"
import userPlaylist from "@/model/userPlaylist";

export default async function handler (req, res) {

    if(req.method === "POST") {
        console.log(req.body, "req.body")
        const {name, userId} = req.body;

        const test = new userPlaylist({
            name: name, 
            userId: userId
        })

        // const test = new playlist({
        //     name: req.body.name,
        //     userId: req.body.userId
        //     // tracks: ["1", "2"]
        // });

        // const test = new playlist({
        //     name: name,
        //     userId: userId
        // })
    
        test.save()

        return res.status(200).json({test})

    } else if (req.method === "PUT") {
        // const { userId, name, trackId} = req.body
        // const userPlaylist = await userPlaylist.find({name: name})
        
        // if(userPlaylist?.tracks?.length === 0) {
        //     userPlaylist.tracks.push(trackId)
        // }

        const { userId, name, trackId} = req.body
        const userPlaylists = await userPlaylist.findOne({name: name, userId: userId})
        
        if(userPlaylists?.tracks?.length === undefined || userPlaylists?.tracks?.length === 0) {
            // userPlaylists.tracks.push(trackId)
            userPlaylists.tracks = [trackId]
        } else if (userPlaylists?.tracks?.length) {
            const chk = userPlaylists.tracks.findIndex(val => val == trackId)
            if(chk === -1) {
                userPlaylists.tracks.push(trackId)
            }
        }

        userPlaylist.findByIdAndUpdate(userPlaylists._id, userPlaylists, {}).then(() => console.log("updated!!")).catch(err=>console.log(err))

        console.log(name, trackId, "PUTPTI", userPlaylists, userPlaylists?.tracks)
    }

    // console.log(req.method, req.body, "!!WHTA!!", req.body?.name)

    res.status(200).json({msg: "'t is levend"})
}

// export default async function handler (req, res) {

//     if(req.method === "POST") {
        
//         const test = new playlist({
//             name: req.body.name,
//             // tracks: ["1", "2"]
//         });
    
//         test.save()

//         return res.status(200).json({test})
//     }

//     // console.log(req.method, req.body, "!!WHTA!!", req.body?.name)

//     res.status(200).json({msg: "'t is levend"})
// }

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
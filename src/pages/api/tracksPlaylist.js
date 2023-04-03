import Playlist from "@/model/tracksPlaylist";
import connectMongo from "@/utils/connectMongo";

export default async function handler (req, res) {
    try {
        console.log("Connecting DB")
        await connectMongo();
        console.log("Connectd DB")

        console.log("Creating DB")
        // const test = Playlist.create({
        //     name: "test",
        //     tracks: ["1", "2"]
        // })

        const test2 = new Playlist({
            name: "test",
            tracks: ["1", "2"]
        })

        test2.save()
        console.log("Created DB")
        res.json({test2})
    } catch (err) {
        console.log(err);
        res.json({err})
    }
}
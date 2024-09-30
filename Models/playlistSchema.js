import mongoose from "mongoose"

const playlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "User"
    },
    playlistName: String,
    playlist: [
        {
            name: { type: String, required: true },
            desc: String,
            img: String,
            songUrl: { type: String, required: true },
            catagory: String,
        }
    ]
})

const PlayList = mongoose.model("Playlist", playlistSchema)

export default PlayList
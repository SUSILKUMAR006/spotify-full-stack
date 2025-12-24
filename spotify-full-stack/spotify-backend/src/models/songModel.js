import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String, required: false },
    album: { type: mongoose.Schema.Types.ObjectId, ref: 'album', required: false },
    image: { type: String, required: false },
    file: { type: String, required: true },
    duration: { type: String, required: true }
})

const songModel = mongoose.models.song || mongoose.model("song",songSchema);

export default songModel;
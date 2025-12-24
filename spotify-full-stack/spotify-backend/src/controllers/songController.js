import { v2 as cloudinary } from 'cloudinary'
import songModel from '../models/songModel.js';
const addSong = async (req, res) => {
    try {
        console.log("Adding song with data:", req.body);
        console.log("Files received:", req.files);
        
        const name = req.body.name;
        const desc = req.body.desc;
        const album = req.body.album;
        
        // Validation
        if (!name || !name.trim()) {
            return res.json({ success: false, message: "Song name is required" });
        }
        
        if (!req.files || !req.files.audio || !req.files.audio[0]) {
            return res.json({ success: false, message: "Audio file is required" });
        }
        
        const audioFile = req.files.audio[0];
        let imageUpload = null;
        
        // Upload audio to Cloudinary
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, { 
            resource_type: "video",
            folder: "spotify-songs"
        });
        
        // Upload image if provided
        if (req.files.image && req.files.image[0]) {
            const imageFile = req.files.image[0];
            imageUpload = await cloudinary.uploader.upload(imageFile.path, { 
                resource_type: "image",
                folder: "spotify-images"
            });
        }

        // Defensive duration calculation
        let duration = "0:00";
        if (audioUpload.duration) {
            duration = `${Math.floor(audioUpload.duration/60)}:${String(Math.floor(audioUpload.duration%60)).padStart(2, '0')}`;
        }

        const songData = {
            name: name.trim(),
            desc: desc.trim(),
            album: album === "none" || album === "null" || !album ? null : album,
            image: imageUpload ? imageUpload.secure_url : "",
            file: audioUpload.secure_url,
            duration
        }

        console.log("Song data to save:", songData);
        const song = new songModel(songData);
        await song.save();
        console.log("Song saved successfully:", song);

        res.json({ success: true, message: "Song added successfully" });

    } catch (error) {
        console.error("Error adding song:", error);
        res.json({ success: false, message: error.message || "Failed to add song" });
    }
}

const listSong = async (req, res) => {

    try {
        console.log("Fetching songs from database...");
        const allSongs = await songModel.find({}).populate('album', 'name desc bgColor image');
        console.log("Raw songs from DB:", allSongs);
        
        // Transform the data to handle null albums properly
        const transformedSongs = allSongs.map(song => {
            const songObj = song.toObject();
            return {
                ...songObj,
                album: song.album ? {
                    _id: song.album._id,
                    name: song.album.name,
                    desc: song.album.desc,
                    bgColor: song.album.bgColor,
                    image: song.album.image
                } : null
            };
        });
        
        console.log("Transformed songs:", transformedSongs);
        res.json({ success: true, songs: transformedSongs });
    } catch (error) {
        console.error("Error listing songs:", error);
        res.json({success:false, message: error.message});
    }

}

const removeSong = async (req,res)=>{
    try {
        await songModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Song Removed"})
    } catch (error) {
        res.json({success:false});
    }
}

export { addSong, listSong ,removeSong};
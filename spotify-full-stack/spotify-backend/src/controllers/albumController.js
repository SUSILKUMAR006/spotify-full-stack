import { v2 as cloudinary } from 'cloudinary'
import albumModel from '../models/albumModel.js'

const addAlbum = async (req, res) => {
    try {
        console.log("Adding album with data:", req.body);
        console.log("Files received:", req.file);

        const name = req.body.name;
        const desc = req.body.desc;
        const bgColor = req.body.bgColor;
        
        // Validation
        if (!name || !name.trim()) {
            return res.json({ success: false, message: "Album name is required" });
        }
        
        if (!desc || !desc.trim()) {
            return res.json({ success: false, message: "Album description is required" });
        }
        
        if (!req.file) {
            return res.json({ success: false, message: "Image file is required" });
        }

        const imageFile = req.file;
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { 
            resource_type: 'image',
            folder: "spotify-albums"
        });

        const albumData = {
            name: name.trim(),
            desc: desc.trim(),
            bgColor: bgColor || "#121212",
            image: imageUpload.secure_url
        }

        const album = new albumModel(albumData);
        await album.save();
        console.log("Album saved successfully:", album);
        res.json({ success: true, message: "Album Added Successfully" })
    } catch (error) {
        console.error("Error adding album:", error);
        res.json({ success: false, message: error.message || "Failed to add album" });
    }
}

const listAlbum = async (req, res) => {

    try {
        console.log("Fetching albums from database...");
        const allAlbum = await albumModel.find({});
        console.log("Albums found:", allAlbum);
        res.json({success:true, albums:allAlbum})
    } catch (error) {
        console.error("Error listing albums:", error);
        res.json({success:false, message: error.message});
    }
}

const deleteAlbum = async (req, res) => {
    
    try {
        await albumModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Delete Album" });
    } catch (error) {
        res.json({success:false});
    }
}

export { addAlbum, listAlbum, deleteAlbum }
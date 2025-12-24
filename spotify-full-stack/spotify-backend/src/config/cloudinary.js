import {v2 as cloudinary} from 'cloudinary'

const connectCloudinary = async ()=>{
    try {
        await cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME || process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET_KEY || process.env.CLOUDINARY_API_SECRET
        })
        console.log("Cloudinary configured successfully");
    } catch (error) {
        console.error("Failed to configure Cloudinary:", error);
        // Don't exit process as Cloudinary is optional for listing songs
    }
}

export default connectCloudinary;
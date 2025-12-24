import mongoose from "mongoose";
const connectDB = async () =>{
    try {
        mongoose.connection.on('connected',()=>{
            console.log("MongoDB Connection success");
        })
        
        mongoose.connection.on('error',(err)=>{
            console.error("MongoDB Connection error:", err);
        })
        
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
        await mongoose.connect(`${mongoURI}/spotify`);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1);
    }
}

export default connectDB;
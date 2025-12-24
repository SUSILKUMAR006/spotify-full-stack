import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import songRouter from './src/routes/songRoute.js';
import connectDB from './src/config/mongodb.js';
import connectCloudinary from './src/config/cloudinary.js';
import albumRouter from './src/routes/albumRoute.js';


//app config

const app = express();
const port = process.env.PORT || 4000;

// Initialize database and cloudinary
(async () => {
    try {
        await connectDB();
        await connectCloudinary();
    } catch (error) {
        console.error("Failed to initialize services:", error);
    }
})();

//middleware

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'],
  credentials: true
}));

//routes
app.use("/api/song",songRouter);
app.use("/api/album",albumRouter);
app.get('/',(req,res)=> res.send("API Working"))

app.listen(port,()=> console.log(`Server started on ${port}`))
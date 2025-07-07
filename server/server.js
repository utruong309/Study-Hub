import express from "express"; 
import mongoose from "mongoose"; 
import cors from "cors"; 
import dotenv from "dotenv";
import noteRoutes from "./routes/notes"; //stores whatver is exported from notes.js

dotenv.config(); 

const app = express(); 
app.use(cors()); 
app.use(express.json()); 

app.use("/api/notes", noteRoutes); //define name of routes

//Connect to MongoDB
mongoose    
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => 
            console.log(`Server running on port ${process.env.PORT}`)
        ); 
    })
    .catch((err) => console.error("MongoDB connection error:", err)); 
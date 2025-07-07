import mongoose from "mongoose"; 

const noteSchema = new mongoose.Schema({
    title: String, 
    content: String, 
    createdAt: {
        type: Date, 
        default: Date.now
    }, 
    userId: String //Firebase UID
}); 
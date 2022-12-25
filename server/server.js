import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const PORT = 4000
const app = express()
app.use(cors())
await mongoose.connect('mongodb+srv://mohit321:mohit321@cluster0.iwsnmym.mongodb.net/?retryWrites=true&w=majority')
console.log("MongoDB Connected")
app.get('/', (req, res) => {
    res.send("Hello World")
});
app.listen(PORT, () => { 
    console.log("server is running at http://localhost:4000");
})
import mongoose from "mongoose";
const database=async()=>{
    await mongoose.connect('mongodb+srv://mohit321:mohit321@cluster0.iwsnmym.mongodb.net/?retryWrites=true&w=majority')
    console.log("MongoDB Connected")
}

export default database
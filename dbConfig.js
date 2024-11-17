import mongoose from 'mongoose';

const url="mongodb://127.0.0.1:27017/shopping-app";


const dbConnect=async()=>{
    try {
        await mongoose.connect(url)
        console.log("Connected to database");
    } catch (error) {
        console.error("error in connecting to database",error)
    }
}

export default dbConnect;
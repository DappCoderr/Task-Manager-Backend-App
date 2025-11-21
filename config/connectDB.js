import mongoose from "mongoose";
import { DB_URL } from "./config";

const connectDB = async() => {
    try {
        await mongoose.connect(DB_URL)
    } catch (error) {
        console.log("Error while connecting with DB: ", error)
    }
}

export default connectDB
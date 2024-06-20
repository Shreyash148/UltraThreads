import mongoose from "mongoose"
let isConnected=false;

export default async function connectToDB(){
    // mongoose.set('strictQuery',true);
    if(!process.env.MONGO_URL)return console.log("mongodb url not found")
    if(isConnected)return console.log("Already connected");
    try {
        await mongoose.connect(process.env.MONGO_URL);
        isConnected=true;
        return console.log("MongoDB is connnected")
    } catch (error) {
        return console.log(error);
    }
}
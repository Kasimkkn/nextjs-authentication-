import mongoose from "mongoose";

export async function connect(){
    try {
        
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on("connected", ()=>{
            console.log("mongodb is connected");
        })
        
        connection.on("error",(err)=>{
            console.log("mongo db connection error : " + err);
            process.exit();
        })
    } catch (error) {
        console.log("something went wrong");
        console.log(error)
    }
}
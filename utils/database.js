import mongoose from "mongoose";

let isConnected =false; //track connection

export const connectDB= async()=>{
    mongoose.set('strictQuery',true);

    if(isConnected){
        console.log("Already Connected to MongoDB");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName:'share_prompts',
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        isConnected=true;
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
}


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
            useUnifiedTopology:true,
            useNewUrlParser: true,
          
        })
        console.log("MongoDB connected");
        isConnected=true;
    } catch (error) {
        console.error(`Error while connecting to db: ${error} `)
        process.exit(1)
    }
}

import { connectDB } from "@utils/database"
import Prompt from "@models/prompt"
// localhost:3000/api/prompt  -> gets all the prompts

export const GET=async (request)=>{
    try {
        await connectDB();
        //find all documents, then populate them with creator
        const prompts=await Prompt.find({}).populate('creator');

        return new Response(JSON.stringify(prompts), {
            status:200
        })
    } catch (error) {
        return new Response("Failed to fetch all prompts", {status: 500})
    }
   
}
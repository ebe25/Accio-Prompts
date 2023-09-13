//api for editing and updating

// localhost:3000/api/prompt/[id] 

import { connectDB } from "@utils/database";
import Prompt from "@models/prompt";


//GET (read user)
export const GET=async (request, {params})=>{
    try {
        await connectDB();
        //find the the id specific prompt
        const prompt=await Prompt.findById(params.id).populate('creator');
        if(!prompt){
            return new Response("Prompt not found", {status:404});
        }
        return new Response(JSON.stringify(prompt), {
            status:200
        })
    } catch (error) {
        return new Response("Failed to fetch all prompts", {status: 500})
    }
   
}

//Update users
export const PATCH =async (req, {params})=>{
    const {prompt,tag} = await req.json();

    try {
        await connectDB();
        const existingPrompt = await Prompt.findById(params.id);
        if(!existingPrompt){
            return new Response("Prompt not found", {status:404})
        }

        existingPrompt.prompt = prompt; //req payload ke santh aya hua jisko upr destuct kiya h
        existingPrompt.tag =tag;

        //save the updated prompt to db
        await existingPrompt.save();
    } catch (error) {
        console.log(error.message)
        return new Response("Failed to update the prompt", {status:500});
    }
}

//Delete Users
export const DELETE= async(req,{params})=>{
    try {
        await connectDB()
        await Prompt.findByIdAndRemove(params.id);
        return new Response("Deleted prompt successfully ", {status:200})
         
    } catch (error) {
        console.log(error.message)
        return new Response("Failed to delete the prompt", {status:500});
    }
}
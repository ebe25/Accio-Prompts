// api/users/:id/posts endpoint api
import {connectDB} from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";

//localhost:3000/api/users/[id]/posts  -> gets user specific post 
export const GET = async (req, {params}) => {
  try {
    await connectDB();
    const prompts = await Prompt.find({creator: params.id}).populate("creator");
    return new Response(JSON.stringify(prompts), {status: 200});
  } catch (error) {
    console.log(error.message);
    return new Response("Failed to fetch user-related prompts", {status: 500});
  }
};



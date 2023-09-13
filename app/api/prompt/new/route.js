import {connectDB} from "@utils/database";
import Prompt from "@models/prompt";

// localhost:3000/api/prompt/new -> create a new prompt 

//how to make a api  in next.js
export const POST = async (req, res) => {
  //grab details passed by the frontend
  const {prompt, userId, tag} = await req.json(); //need to convert req obj => json to destruct
  // console.log(prompt, userId, tag);
  try {
    await connectDB(); //next step-> connect to DB(lambda function)
    const newPrompt = new Prompt({
      //create a new prompt
      creator: userId,
      prompt,
      tag,
    });

    await newPrompt.save(); //now save newprompt to db
    return new Response(JSON.stringify(newPrompt), {status: 201});
  } catch (error) {
    console.log(error.message);
    return new Response("Failed to create a new prompt", {status: 500});
  }
};

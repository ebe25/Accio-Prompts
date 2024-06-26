import {connectDB} from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";
// localhost:3000/api/prompt  -> gets all the prompts

export const GET = async (request) => {
  try {
    await connectDB();

    //find all documents, then populate them with creator
    const prompts = await Prompt.find().populate({
      path: "creator",
    });

    const response = new Response(JSON.stringify(prompts), {
      status: 200,
    });

      // Add a unique identifier to the URL to force a cache-busting reload
      const url = new URL(request.url);
      url.searchParams.set("t", Date.now());
      response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
      response.headers.set("Pragma", "no-cache");
      response.headers.set("Expires", "0");
      response.headers.set("Location", url.toString());

      return response;
  } catch (error) {
    return new Response("Failed to fetch all prompts", {status: 500});
  }
};

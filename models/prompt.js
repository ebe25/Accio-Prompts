import {Schema, models, model} from "mongoose";

const PromptSchema = new Schema({
  creator: {
    //this is like saying creator of the prompt
    //would document in database itself
    type: Schema.Types.ObjectId,
    //relationship -> User model, would be one-to-many
    //a user can create n number of prompts
    ref: 'User',
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required"],
  },
});

//check for prompt in models obj,
// if exists || create a new one
const Prompt = models.Prompt || model("Prompt", PromptSchema);
export default Prompt;

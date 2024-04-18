import  {Schema, model, models} from "mongoose";
//schema -> new schema instance
//model method->new model
//models -> store, has all the registered models
const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
});

//to use this model, will use the models obj from mongoose lib
//stores all the registered models

//we need to ensure if the user model is already registered
//then we reuse it , if not model fun will create a new model

//nedd to do this , since this route ->called everytime
// ->connetion established everytime

const User = models.User || model("User", UserSchema);
export default User;

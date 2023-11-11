import { Schema, Types, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tasks:[
    {   type: Types.ObjectId,
        ref: "Task",
    }
  ],
});

 const UserModel = model("User", userSchema);
 export{UserModel}
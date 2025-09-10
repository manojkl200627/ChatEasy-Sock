import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    friends: { type: [String], default: ["Adminmanu@g.com"] },
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);

export default userModel;

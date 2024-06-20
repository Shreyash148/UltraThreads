import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  image: {
    type: String,
  },
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    }
  ],
  collections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    }
  ],
  onboarded: {
    type: Boolean,
    default: false,
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  following:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ]
});

const User =mongoose.models.User || mongoose.model("User",userSchema);
export default User;
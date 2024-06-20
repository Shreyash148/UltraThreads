import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  status:{
    type:String,
    enum:['Like','Comment','Follow'],
    default:'Like'
  },
  thread:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Thread",
    default:null
  },
  performer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
  },
  createdAt:{
    type: Date,
		default: Date.now()
  } 
})

const Activity =mongoose.models.Activity || mongoose.model("Activity",activitySchema);
export default Activity;
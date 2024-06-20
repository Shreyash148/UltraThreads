import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
	threadContent: {
		type: String,
		required: true,
	},
	author: {
		type: mongoose.Types.ObjectId,
		ref: "User",
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	parent: {
		type: String,
		default: null,
	},
	childrenId: [
		{
			type: mongoose.Types.ObjectId,
			ref: "Thread",
		}
	],
	likedBy: [
		{
			type: mongoose.Types.ObjectId,
			ref: "User",
		}
	]
});

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);
export default Thread;

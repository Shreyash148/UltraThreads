"use server";

import { revalidatePath } from "next/cache";
import connectToDB from "../db";
import Thread from "../models/threads.model";
import User from "../models/user.model";
import { addActivity } from "./activity.action";

interface params {
	threadContent: String;
	author: String;
	path: string;
}
export async function postThread({
	threadContent,
	author,
	path,
}: params) {
	connectToDB();

	try {
		const createdThread = await Thread.create({
			threadContent: threadContent,
			author: author,
		});

		await User.findByIdAndUpdate(author, {
			$push: { threads: createdThread._id },
		});

		revalidatePath(path);
	} catch (error) {
		console.log(error);
	}
}

export async function fetchAllPosts() {
	connectToDB();
	try {
		const allposts = await Thread.find({parent:{$in:[null,undefined]}})
			.populate("author")
			.populate({
				path: "childrenId",
				model: "Thread",
				populate: {
					path: "author",
					model: "User",
				},
				// options:{sort:{"createdAt":-1}}
			})
			.sort("-createdAt");
		return { allposts };
	} catch (error) {
		return console.log(error);
	}
}

export async function fetchThreadById(threadId: String) {
	connectToDB();
	try {
		const thread = await Thread.findById(threadId)
			.populate("author")
			.populate({
				path: "childrenId",
				model: "Thread",
				populate: {
					path: "author",
					model: "User",
				},
			});
      // console.log(thread);
		return thread;
	} catch (error) {
		return console.log(error);
	}
}

export async function fetchThreadByUsers(userId: String) {
	connectToDB();
	try {
		let allThreads = await Thread.find({
			author: userId,
			parent: {
				$in: [null, undefined],
			}
		}).select("_id threadContent author");
    allThreads=allThreads?.map((reply=>{
      return {
        _id:reply._id.toString(),
        author:reply.author.toString(),
        threadContent:reply.threadContent
      }
    }))
		return allThreads;
	} catch (error) {
		return console.log(error);
	}
}

export async function fetchAllReplies(userId: String) {
	connectToDB();
	try {
		let allReplies = await Thread.find({
			author: userId,
			parent: {
				$nin: [null, undefined],
			},
		}).select("_id threadContent author");
    allReplies=allReplies.map((reply=>{
      return {
        _id:reply._id.toString(),
        author:reply.author.toString(),
        threadContent:reply.threadContent
      }
    }))
    return allReplies;
	} catch (error) {
		return console.log(error);
	}
}

export async function postComment(
  threadContent:String,
  parentId:String,
  userId:String,
  parentAuthor:String
) {
  connectToDB();
  try {
    const comment = await Thread.create({
      threadContent,
      parent:parentId,
      author:userId
    });
    await Thread.findByIdAndUpdate(parentId,{
      $push:{
        childrenId:comment._id
      }
    })
    const status='Comment';
    await addActivity(parentAuthor,status,userId,parentId);

  } catch (error) {
    console.log(error);
  }
}

export async function updateLikes(threadId:String,like:boolean,userId:String,authorId:String) {
  connectToDB();
  try {
    if(like){
      await Thread.findByIdAndUpdate(
        threadId,
        {
          $push:{
            likedBy : userId
          }
        }
      )
      const status='Like'
      await addActivity(authorId,status,userId,threadId);
    }else{
      await Thread.findByIdAndUpdate(
        threadId,
        {
          $pull:{
            likedBy : userId
          }
        }
      )
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getLikedBy(threadId:String) {
  connectToDB();
  try {
    const allLikedUsers = await Thread.findById(threadId)
    .populate("likedBy").select("likedBy")
    const allUsers = allLikedUsers?.likedBy.map((user:any)=>{
      return {
        name:user?.name,
        username:user?.username,
        userId:user?._id.toString(),
        image:user?.image
      }
  })
    return allUsers;
  } catch (error) {
    return console.log(error);
  }
}

export async function isLiked(threadId:String,userId:String){
  connectToDB();
  try {
    const liked = await Thread.findById(threadId).select("likedBy");
    let present=false
    liked.likedBy.length>0?
      liked.likedBy.map((user:any)=>
        (user._id.toString()===userId)?present=true:"")
    :""
    if(!present)return false;
    return true;
  } catch (error) {
    return console.log(error)
  }
}

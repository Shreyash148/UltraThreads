"use server";

import connectToDB from "../db";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";
import { addActivity } from "./activity.action";
import { FilterQuery } from "mongoose";

interface Params {
	userId: String;
	username: String;
	name: String;
	bio: String;
	image: String;
	pathname: string;
}
export async function updateUser({
	userId,
	username,
	name,
	bio,
	image,
	pathname,
}: Params) {
	connectToDB();
	try {
		await User.findOneAndUpdate(
			{ userId },
			{
				username,
				name,
				bio,
				image,
				onboarded: true,
			},
			{ upsert: true }
		);
		if (pathname === "/profile/edit") {
			revalidatePath(pathname);
		}
	} catch (error: any) {
		console.log("updateUser error:", error);
	}
}

export async function getUser(userId: String, type:String) {
	connectToDB();
	try {
    if(type==="clerkId"){
		const userInfo = await User.findOne({ userId });
		return userInfo;
    }else{
      const userInfo = await User.findById(userId);
      return userInfo;
    }
	} catch (error) {
		return console.log(error);
	}
}

export async function getAllUsers({userId,searchString=""}:{userId:String,searchString?:string}) {
	connectToDB();
	try {
    const regex = new RegExp(searchString, "i");
    const query: FilterQuery<typeof User> = {
      _id: { $ne: userId },
    }
    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }
		const allUsers = await User.find(query).sort("-createdAt");
		return allUsers;
	} catch (error) {
		return console.log(error);
	}
}

export async function getFollowers(userId: String) {
	connectToDB();
	try {
		const users = await User.findById(userId).populate("followers").select("followers");
    // console.log(allFollowers.followers);
    const allFollowers = users?.followers.map((user:any)=>{
      return {
        name:user?.name,
        username:user?.username,
        userId:user?._id.toString(),
        image:user?.image
      }
  })
		return allFollowers;
	} catch (error) {
		return console.log(error);
	}
}

export async function getFollowings(userId: String) {
	connectToDB();
	try {
		const users = await User.findById(userId).populate("following");
    const allFollowings = users?.following.map((user:any)=>{
      return {
        name:user?.name,
        username:user?.username,
        userId:user?._id.toString(),
        image:user?.image
      }
  })
		return allFollowings;
	} catch (error) {
		return console.log(error);
	}
}

export async function followUser(followerId: String, followedToId: String) {
	connectToDB();
	try {
		await User.findByIdAndUpdate(followerId, {
			$push: {
				following: followedToId,
			},
		});
		await User.findByIdAndUpdate(followedToId, {
			$push: {
				followers: followerId,
			},
		});
    const status='Follow'
    const threadId=""
    await addActivity(followedToId,status,followerId,threadId.toString())
	} catch (error) {
		console.log(error);
	}
}

export async function unFollowUser(followerId: String, followedToId: String) {
	connectToDB();
	try {
		await User.findByIdAndUpdate(followerId, {
			$pull : {
				following: followedToId,
			},
		});
		await User.findByIdAndUpdate(followedToId, {
			$pull: {
				followers: followerId,
			},
		});
	} catch (error) {
		console.log(error);
	}
}

export async function doesFollow(currUserId: String, userId: String){
  connectToDB();
	try {
		const person = await User.findOne({
      _id:currUserId,
      followers:{
        $in:userId
      }
    });
    if(person?.followers)return true;
    return false;
	} catch (error) {
		console.log(error);
	}
}

export async function updateCollections(threadId:String,userId:String,isSaved:boolean) {
  connectToDB();
  try {
    if(!isSaved){
      await User.findByIdAndUpdate(userId,{
        $push:{
          collections:threadId
        }
      })
    }else{
      await User.findByIdAndUpdate(userId,{
        $pull:{
          collections:threadId
        }
      })
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getAllCollections(userId:String){
  connectToDB();
  try {
    const user=await User.findById(userId).populate("collections").select("collections");
    const allCollections = user.collections;
    return allCollections;
  } catch (error) {
    console.log(error);
  }
}

export async function isAddedToCollection(userId:String,threadId:String){
  connectToDB();
  try {
    const user=await User.findOne({
      _id:userId,
      collections:{
        $in:threadId
      }
    });
    // console.log(user);
    if(user?.collections)return true;
    return false;
  } catch (error) {
    console.log(error);
  }
}


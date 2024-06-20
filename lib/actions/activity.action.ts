"use server"

import connectToDB from "../db"
import Activity from "../models/activity.model";

export async function addActivity(user:String,status:String,performer:String,thread:String) {
  connectToDB();
  try {
    let alreadyExists
    if(status==='Follow')alreadyExists = await Activity.findOne({user,status,performer})
    else alreadyExists = await Activity.findOne({user,status,performer,thread})
    if(!alreadyExists){
      if(status==='Follow')
      await Activity.create({
        user,
        status,
        performer
      })
      else{
        await Activity.create({
          user,
          status,
          performer,
          thread
        })
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getAllActivities(userId:String){
  connectToDB();
  try {
    const activities = await Activity.find({user:userId})
    .populate("performer")
    .populate("thread")
    .sort("-createdAt")
    return activities;
  } catch (error) {
    console.log(error);
  }
}
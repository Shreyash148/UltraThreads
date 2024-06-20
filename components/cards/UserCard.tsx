"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { followUser, unFollowUser } from '@/lib/actions/user.actions'
import Link from 'next/link'

interface Props{
  currUser : String,
  user : {
    name:String,
    username:String,
    image:string,
    userId:String
  },
  follows:boolean,
  listType:String,
}
const UserCard = ({currUser,user,follows,listType}:Props) => {
  const [isFollowing,setIsFollowing]=useState(follows)
  const handleFollow = async ()=>{
    await followUser(currUser,user.userId);
    setIsFollowing(true);
  }
  const handleUnfollow = async ()=>{
    await unFollowUser(currUser,user.userId);
    setIsFollowing(false);
  }
  return (
    <>
     <div className={`flex flex-row justify-between items-center 
      ${listType==="searchList"?`shadow-sm shadow-gray-400`:``}
      ${listType==="suggestList"?`px-0 py-3`:`p-5`}`}>
      <Link href={`/profile/${user.userId}`} className='flex flex-row items-center justify-start gap-3'>
      <div className='h-8 w-8'>
        <Image src={user.image} alt="" height={32} width={32} style={{"borderRadius":"100%","height":"32px"}}/>
      </div>
      <div className={`text-body-bold ${listType==="suggestList"?`text-small-medium`:``}`}>
        {user.username}
      </div>
      </Link>
      <div>
        {
          isFollowing?
          listType==="suggestList"?
          <Button onClick={handleUnfollow} className="text-subtle-medium p-3 bg-glassmorphism">Following</Button>
          :
          <Button onClick={handleUnfollow} className="bg-white text-primary-500 border-2 border-primary-500">Following</Button>
          :
          <Button onClick={handleFollow} className={`${listType==="suggestList"?`text-subtle-medium p-3 bg-glassmorphism`:`bg-primary-500`}`}>Follow</Button>
        }
        
      </div>
     </div>
    </>
  )
}

export default UserCard
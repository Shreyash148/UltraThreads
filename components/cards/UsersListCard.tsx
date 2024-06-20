import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from 'next/image'
import Link from 'next/link'
import UserCard from './UserCard'
import { isFollowing } from '@/lib/utils'

interface Props {
  listType: String,
  users: [{
    name: String,
    username: String,
    image: string,
    userId: String
  }],
  allFollowings: [{
    name: String,
    username: String,
    image: string,
    userId: String
  }],
  currUser:String
}
const UsersListCard = ({ users, listType, allFollowings,currUser }: Props) => {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='cursor-pointer'>{listType}</div>
      </DialogTrigger>
      <DialogContent className="sm:w-[450px] sm:max-h-5/6 max-h-full">
        <DialogHeader className=''>
          <DialogTitle className='text-heading3-bold text-center text-primary-500 p-2'>{listType}</DialogTitle>
          <hr className=' border-violet-400'/>
        </DialogHeader>
          <ScrollArea className='sm:h-80 max-h-[70vh]'>
            {
              users ? users.length > 0 ?
                users?.map((user) =>
                  <div key={user?.userId.toString()} >
                      <UserCard user={user} currUser={currUser} follows={isFollowing(user.userId,allFollowings)} listType="other"/>
                    <hr />
                  </div>
                )
                : <p className='flex justify-center align-center text-violet-300'>No {listType} Yet</p>
                : <p className='flex justify-center align-center text-violet-300'>No {listType} Yet</p>
            }
          </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default UsersListCard



"use client"
import Image from 'next/image'
import React, { ReactNode, useState } from 'react'
import { Button } from '../ui/button'
import { followUser, unFollowUser } from '@/lib/actions/user.actions'
import UsersListCard from '../cards/UsersListCard'
import Link from 'next/link'

interface Props {
  user: {
    username: string,
    name: string,
    userId: string,
    bio: string,
    image: string
  },
  children: ReactNode,
  currUser: String,
  userType: String,
  follows: boolean,
  allFollowers: [{
    name: String,
    username: String,
    image: string,
    userId: String
  }],
  allFollowing: [{
    name: String,
    username: String,
    image: string,
    userId: String
  }]
}

const UserProfile = ({ user, children, currUser, userType, follows, allFollowers, allFollowing }: Props) => {


  const [state, setState] = useState(1);
  const [isFollowing, setIsFollowing] = useState(follows)
  const handleFollow = async () => {
    await followUser(currUser, user.userId);
    setIsFollowing(true);
  }
  const handleUnfollow = async () => {
    await unFollowUser(currUser, user.userId);
    setIsFollowing(false);
  }
  const handleState = (num: number) => {
    setState(num);
  }
  const childArray = React.Children.toArray(children);
  const threads = childArray[0];
  const replies = childArray[1];
  const collections = childArray[2];
  const noOfFollowers = allFollowers ? allFollowers.length : 0;
  const noOfFollowing = allFollowing ? allFollowing.length : 0;


  return (
    <>
      <div className='flex flex-col'>
        <div className='flex flex-row justify-between items-center '>
          <div>
            <div className='text-heading2-bold'>
              {user.name}
            </div>
            <div className='text-heading4-medium'>
              {user.username}
            </div>
          </div>
          <Image
            src={user.image}
            height={100} width={100}
            alt="profileImg"
            style={{ "borderRadius": "100%", "height": "100px" }}
          />
        </div>
        <div className='text-body-medium py-4'>
          {user.bio}
        </div>
        <div className='text-small-medium text-gray-400 flex flex-row gap-3 py-4'>
          <div className='flex flex-row gap-1'>
            {noOfFollowers}
            <UsersListCard listType="Followers" users={allFollowers} allFollowings={allFollowing} currUser={currUser} />
          </div>
          <div className='flex flex-row gap-1'>
            {noOfFollowing}
            <UsersListCard listType="Following" users={allFollowing} allFollowings={allFollowing} currUser={currUser} />
          </div>
        </div>
        <div>
          {
            userType === "other" ?
              isFollowing ?
                <Button onClick={handleUnfollow} className='bg-white text-primary-500 border-2 border-primary-500 min-w-full hover:bg-primary-500 hover:text-white'>Following</Button>
                :
                <Button onClick={handleFollow} className='bg-primary-500 min-w-full'>Follow</Button>
              :
              <Link href="/profile/edit">
                <Button className='bg-white text-primary-500 border-2 border-primary-500 min-w-full hover:bg-primary-500 hover:text-white'>
                  Edit Profile
                </Button>
              </Link>
          }
        </div>
        <div className='flex flex-row text-gray-400 text-base-medium'>
          <div className={`userThreads ${state === 1 ? "border-primary-500 text-primary-500" : "border-gray-400"}`}
            onClick={() => handleState(1)}>
            Threads
          </div>
          <div className={`userThreads ${state === 2 ? "border-primary-500 text-primary-500" : "border-gray-400"}`}
            onClick={() => handleState(2)}>
            Replies
          </div>
          <div className={`userThreads ${state === 3 ? "border-primary-500 text-primary-500" : "border-gray-400"}`}
            onClick={() => handleState(3)}>
            Collections
          </div>
        </div>
        {
          state === 1 ? threads
            : state === 2 ? replies
              : collections
        }
      </div>
    </>
  )
}

export default UserProfile

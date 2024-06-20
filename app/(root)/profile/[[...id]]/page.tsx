import ThreadCardCollection from '@/components/sections/ThreadCardCollection'
import UserProfile from '@/components/sections/UserProfile'
import {ProfileSkeleton} from '@/components/skeletons/ProfileSkeleton'
import { fetchAllReplies, fetchThreadByUsers } from '@/lib/actions/threads.actions'
import { doesFollow, getAllCollections, getFollowers, getFollowings, getUser } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async ({ params }: { params: { id : string } }) => {

  const authUser= await currentUser();
  if(!authUser)return null;
  const currUser=authUser?await getUser(authUser?.id.toString(),"clerkId"):null;
  if(!currUser?.onboarded)redirect("/onboarding");
  let fetchedUser;
  let userType;
  if(params.id){
    const str=params?.id[0]
    fetchedUser= str?await getUser(str,"userId"):null;
    userType="other"
  }else{
    fetchedUser= currUser;
    userType="current"
  }
  const user={
    username:fetchedUser?.username,
    name:fetchedUser?.name,
    bio:fetchedUser?.bio,
    userId:fetchedUser?._id?.toString(),
    image:fetchedUser?.image
  }
  const activeUser=currUser?._id?.toString();
  const replies=fetchedUser?await fetchAllReplies(user.userId):null;
  const threads= fetchedUser? await fetchThreadByUsers(user.userId):null;
  const collections = fetchedUser? await getAllCollections(user.userId):null;
  const follows = await doesFollow(currUser,user.userId) || false;
  const allFollowers = fetchedUser?await getFollowers(user.userId):null
  const allFollowing = fetchedUser?await getFollowings(user.userId):null
    return (
        <>
          <React.Suspense fallback={<ProfileSkeleton/>}>
            <div className='md:px-20 '>
                <UserProfile user={user} currUser={activeUser} userType={userType} follows={follows} allFollowers={allFollowers} allFollowing={allFollowing}>
                  <ThreadCardCollection displayThreads={threads} userId={user.userId}/>
                  <ThreadCardCollection displayThreads={replies} userId={user.userId}/>
                  <ThreadCardCollection displayThreads={collections} userId={user.userId}/>
                </UserProfile>
            </div>
            </React.Suspense>
        </>
    )
}

export default page
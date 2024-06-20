
import PostThreads from '@/components/forms/PostThreads'
import { PostSkeleton } from '@/components/skeletons/PostSkeleton';
import { getUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'


const page = async () => {
  const user =  await currentUser();
  if(!user)return null;
  const userInfo= user?await getUser(user.id,"clerkId"):null;
  if(!userInfo?.onboarded)redirect("/onboarding");
  const Id= userInfo?._id
  const userId=Id?.toString();
  return (
    <>
    <React.Suspense fallback={<PostSkeleton/>}>
      <div className='md:px-14'>
        <div>
          <PostThreads user={userId}/>
        </div>
      </div>
        </React.Suspense>
    </>
  )
}

export default page
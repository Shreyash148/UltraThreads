import { PageSkeleton } from '@/components/skeletons/PageSkeleton';
import { getAllActivities } from '@/lib/actions/activity.action'
import { getUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {
  const user = await currentUser();
  if(!user)return null;
  const userInfo = user ? await getUser(user.id, "clerkId") : null;
  if(!userInfo?.onboarded)redirect("/onboarding");
  const activities = userInfo ? await getAllActivities(userInfo?._id.toString()) : null;

  return (
    <>
    <React.Suspense fallback={<PageSkeleton/>}>
      <div className='md:px-14'>
        {
          activities ? activities.length > 0 ?
            activities?.map((activity) =>
              <div key={activity._id.toString()} className='p-4 shadow-sm shadow-gray-400 rounded-lg'>
                <div className='flex flex-row gap-1 justify-start items-center text-gray-700'>
                  <Image src={activity.performer.image} alt="photo" height={40} width={40} style={{"borderRadius":"100%","height":"40px"}}/>
                  <Link href={`/profile/${activity.performer._id.toString()}`} className='text-primary-500 pl-2 hover:underline'>@{activity.performer.username}</Link>
                  {
                    activity.status === 'Follow' ?
                      <Link href={`/profile/${activity.performer._id.toString()}`}>
                        started following you
                      </Link>
                      :
                      <Link href={`/thread/${activity.thread._id.toString()}`}>
                        {
                          activity.status === 'Like' ?
                            activity.thread.parent ? "liked your comment" : "liked your thread"
                            :
                            activity.thread.parent ? "replied on your comment" : "commented on your thread"
                        }
                      </Link>
                  }
                </div>
              </div>
            )
            : <p>No Actvites Found</p>
            : <p>No Actvites Found</p>
        }
      </div></React.Suspense>
    </>
  )
}

export default page
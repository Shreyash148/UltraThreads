import ProfileInfo from '@/components/forms/ProfileInfo';
import { ProfileSkeleton } from '@/components/skeletons/ProfileSkeleton';
import { getUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async() => {
  const user= await currentUser();
  if(!user)return null;
  const userInfo= user?await getUser(user.id,"clerkId"):"";
  if(!userInfo?.onboarded)redirect("/onboarding");
  const userData={
    id:user?.id.toString() ||"",
    objectId:userInfo?._id.toString(),
    username:userInfo?.username || user?.username,
    name:userInfo?.name || user?.firstName,
    bio:userInfo?.bio ||"",
    profilePhoto:userInfo?userInfo.image:user?.imageUrl
  }
  return (
    <>
    <React.Suspense fallback={<ProfileSkeleton/>}>
      <div>
        <ProfileInfo user={userData} btnTitle='Update'/>
      </div>
      </React.Suspense>
    </>
  )
}

export default page
import ProfileInfo from '@/components/forms/ProfileInfo'
import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
import { getUser } from '@/lib/actions/user.actions';

const Onboarding = async () => {

  const user = await currentUser();
  const userInfo = user ? await getUser(user.id, "clerkId") : "";
  const userData = {
    id: user?.id.toString() || "",
    objectId: userInfo?._id.toString(),
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName,
    bio: userInfo?.bio || "",
    profilePhoto: userInfo?.image || ""
  }

  return (
    <>
      <section className='onboard'>
        <div className='flex flex-col justify-start'>
          <div className='head-text'>
            Onboarding
          </div>
          <div>
            Please complete your profile before start app.
          </div>
        </div>
        <div className='my-10 max-w-2xl'>
          <ProfileInfo user={userData} btnTitle="Continue" />
        </div>
      </section>
    </>
  )
}

export default Onboarding
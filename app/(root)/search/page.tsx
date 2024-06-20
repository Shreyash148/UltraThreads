import UserCard from '@/components/cards/UserCard'
import SearchBar from '@/components/forms/SearchBar';
import { PageSkeleton } from '@/components/skeletons/PageSkeleton';
import { getAllUsers, getFollowings, getUser } from '@/lib/actions/user.actions';
import { isFollowing } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = user ? await getUser(user.id, "clerkId") : null;
  if (!userInfo?.onboarded) redirect("/onboarding");
  const currUser = userInfo?._id.toString();
  const allUsers = await getAllUsers({ userId: userInfo?._id.toString(), searchString: searchParams.q }) || null;
  const allFollowings = await getFollowings(currUser) || null;

  return (
    <>
      <React.Suspense fallback={<PageSkeleton />}>
        <div className='flex flex-col md:px-14 gap-6'>
          <SearchBar routeType='search' />
          <div>
            {
              allUsers ? allUsers.length > 0 ?
                allUsers.map((user) =>
                  <div key={user._id}>
                    <UserCard
                      currUser={currUser}
                      user={
                        {
                          name: user?.fullName,
                          username: user?.username,
                          image: user?.image,
                          userId: user?._id.toString()
                        }
                      }
                      follows={isFollowing(user?._id?.toString(), allFollowings)}
                      listType="searchList"
                    />
                  </div>
                )
                : <p>No Users Found</p>
                : <p>No Users Found</p>
            }
          </div>
        </div></React.Suspense>
    </>
  )
}

export default page
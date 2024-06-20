import { getAllUsers, getFollowings, getUser } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import UserCard from '../cards/UserCard';
import { isFollowing } from '@/lib/utils';

const SuggestionBar = async() => {
  const user =  await currentUser();
  if(!user)return null;
  const userInfo= user?await getUser(user.id,"clerkId"):null;
  if(!userInfo?.onboarded)redirect("/onboarding");
  const allUsers = await getAllUsers({userId:userInfo?._id.toString(),searchString:""}) || null;
  const allFollowings = await getFollowings(userInfo?._id.toString()) || null;
  return (
    <>
      <section className='custom-scrollbar rightbar min-w-80'>
        <div className='flex flex-1 flex-col justify-start'>
          <h3 className='text-heading4-medium'>
            Similar Minds
          </h3>
          <hr className='my-4'/>
          {
            allUsers ? allUsers.length > 0 ?
            allUsers.map((user) =>
              <div key={user._id}>
                <UserCard
                  currUser={userInfo?._id?.toString()}
                  user={
                    {
                      name: user?.fullName,
                      username: user?.username,
                      image: user?.image,
                      userId: user?._id.toString()
                    }
                  }
                  follows={isFollowing(user?._id?.toString(),allFollowings)}
                  listType="suggestList"
                />
              </div>
            )
            : <p>No Users Found</p>
            : <p>No Users Found</p>
          }
        </div>
      </section>
    </>
  )
}

export default SuggestionBar
import ThreadCard from '@/components/cards/ThreadCard';
import ThreadComment from '@/components/forms/ThreadComment';
import { PageSkeleton } from '@/components/skeletons/PageSkeleton';
import { fetchThreadById } from '@/lib/actions/threads.actions';
import { getUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async ({ params }: { params: { id: string } }) => {

  const user = await currentUser();
  if(!user)return null;
  const userInfo = user ? await getUser(user.id,"clerkId") : null;
  if(!userInfo?.onboarded)redirect("/onboarding");
  const Id = userInfo?._id?.toString();
  const threadDetails = await fetchThreadById(params.id);
  const threadComments = threadDetails?.childrenId;

  return (
    <>
    <React.Suspense fallback={<PageSkeleton/>}>
      <div className=''>
        <div>
          <ThreadCard
            id={params.id}
            hasComment={false}
            currUser={Id}
          />
        </div>
        <div className='py-4'>
          <ThreadComment
            parentId={params.id}
            userId={Id}
            parentAuthor={threadDetails?.author?._id.toString()}
          />
        </div>
        <div>
          {threadComments?.map((thread: any) =>
            <div key={thread._id}>
              <ThreadCard
                id={thread._id}
                hasComment={true}
                currUser={Id}
              />
            </div>
          )
          }
        </div>
      </div></React.Suspense>
    </>
  )
}

export default page;
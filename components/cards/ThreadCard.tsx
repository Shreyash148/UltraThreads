"use server"
import React from 'react'
import DetailCard from './DetailCard'
import { fetchThreadById, getLikedBy, isLiked } from '@/lib/actions/threads.actions'
import { getFollowings, isAddedToCollection } from '@/lib/actions/user.actions'

interface props {
  id: String,
  hasComment: boolean,
  currUser:String
}
const ThreadCard = async ({ id, hasComment ,currUser}: props) => {
  
  const thread = await fetchThreadById(id);
  const commentThreads = thread?.childrenId;
  const noOfComments = commentThreads?commentThreads.length:0
  const commentDetails = commentThreads ? commentThreads[0] : null;
  const liked = await isLiked(id,currUser) || false;
  const isSaved = await isAddedToCollection(currUser,id)|| false;
  const author = {
    name:thread?.author.username,
    content:thread?.threadContent,
    image:thread?.author.image,
    userId:thread?.author?._id?.toString()
  }
  const likedUsers = await getLikedBy(id);
  const allFollowings = await getFollowings(currUser) || null;

  return (
    <>
      <div className='md:px-16 sm:px-6 px-4 flex flex-col'>
        <DetailCard
          author={author}
          id={id?.toString()}
          isliked={liked}
          isSaved={isSaved}
          noOfComments={noOfComments}
          likedUsers={likedUsers}
          currUser={currUser}
          allFollowings={allFollowings}
        />
        {
          (!hasComment || !commentDetails) ?
            <hr className=' border-slate-400 my-4' />
            : ""
        }
      </div>
      {(hasComment && commentDetails) ?
        <ThreadCard
          id={commentDetails?._id?.toString()}
          hasComment={true}
          currUser={currUser}
        />
        :""
      }
    </>
  )
}

export default ThreadCard
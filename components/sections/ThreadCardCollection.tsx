import React from 'react'
import ThreadCard from '../cards/ThreadCard'

interface Props{
  displayThreads: any[] | null | void,
  userId: string
}
const ThreadCardCollection = ({displayThreads, userId}:Props) => {
  return (
    <div className='flex flex-col w-full py-4'>
      {
        displayThreads ? displayThreads.length > 0 ?
          <>
            {displayThreads?.map((thread: any) =>
              <div key={thread._id.toString()} className='flex flex-col'>
                <ThreadCard
                  id={thread._id.toString()}
                  hasComment={false}
                  currUser={userId.toString()}
                />
              </div>
            )}
          </> : "" : ""
      }
    </div>
  )
}

export default ThreadCardCollection
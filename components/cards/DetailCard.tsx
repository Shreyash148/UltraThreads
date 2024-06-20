"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { updateLikes } from '@/lib/actions/threads.actions'
import { updateCollections } from '@/lib/actions/user.actions'
import UsersListCard from './UsersListCard'

interface Props {
  author: {
    name: String,
    content: String,
    image: string,
    userId: String
  },
  likedUsers: [{
    name: String,
    username: String,
    image: string,
    userId: String
  }],
  allFollowings: [{
    name: String,
    username: String,
    image: string,
    userId: String
  }],
  id: String,
  isliked: boolean,
  isSaved: boolean,
  noOfComments: number,
  currUser: String
}

const DetailCard = ({
  author,
  id,
  isliked,
  isSaved,
  noOfComments,
  likedUsers,
  currUser,
  allFollowings
}: Props) => {

  const [liked, setLiked] = useState(isliked);
  const [saved, setSaved] = useState(isSaved);
  const noOfLikes = likedUsers ? likedUsers.length : 0
  const handleLike = async () => {
    await updateLikes(id, !liked, currUser, author.userId);
    setLiked(!liked);
  }
  const handleCollection = async () => {
    await updateCollections(id, currUser, saved);
    setSaved(!saved);
  }

  return (
    <>
      <div className='flex flex-row pb-3'>
        <div className='flex flex-col justify-start items-center gap-1'>
          <div className='h-9 w-9'>
            <Image src={author.image}
              alt="fs"
              height={36} width={36}
              style={{ "borderRadius": "100%", height: "36px" }}
            />
          </div>
          <div className='border-l border-l-slate-400 h-full'></div>
        </div>
        <div className='flex flex-col justify-start gap-1 px-3'>
          <div className='text-small-semibold text-purple-900'>
            {author.name}
          </div>
          <div className=' text-small-regular'>
            <Link href={`/thread/${id}`}>
              {author.content}
            </Link>
          </div>
          <div className='flex flex-row gap-3 pb-2'>
            {!liked ?
              <Image src="/assets/like.svg"
                alt="fs"
                height={20} width={20}
                onClick={handleLike}
              />
              :
              <Image src="/assets/liked.svg"
                alt="fs"
                height={20} width={20}
                onClick={handleLike} />}
            <Link href={`/thread/${id}`}>
              <Image src="/assets/comment.svg"
                alt="fs"
                height={20} width={20}
              />
            </Link>
            {!saved ?
              <Image src="/assets/bookmark.svg"
                alt="fs"
                height={20} width={20}
                onClick={handleCollection}
                className='cursor-pointer' />
              :
              <Image src="/assets/bookmark-saved.svg"
                alt="fs"
                height={20} width={20}
                onClick={handleCollection}
                className='cursor-pointer'
              />
            }
            <Image src="/assets/share.svg"
              alt="fs"
              height={20} width={20}
              className='cursor-pointer' />
          </div>
          <div className='text-tiny-medium text-gray-400 flex flex-row gap-2'>
            <div className='flex flex-row gap-1'>
              {noOfLikes}
              <UsersListCard
                listType="Likes"
                users={likedUsers}
                currUser={currUser}
                allFollowings={allFollowings}
              />
            </div>
            <Link href={`/thread/${id}`}>
              {noOfComments} comments
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailCard
"use client"
import { Skeleton } from "../ui/skeleton"
import { PageSkeleton } from "./PageSkeleton"

export function ProfileSkeleton(){
  return (
  <>
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col space-y-4">
        <Skeleton className="h-5 w-[200px] bg-gray-400" />
        <Skeleton className="h-5 w-[200px] bg-gray-400" />
        </div>
        <Skeleton className="h-20 w-20 rounded-full bg-gray-400" />
      </div>
      <Skeleton className="h-5 w-[250px] bg-gray-400" />
      <Skeleton className="h-5 w-[250px] bg-gray-400" />
      <Skeleton className="h-7 w-[400px] bg-gray-400" />
      <div className="flex flex-row justify-evenly">
      <Skeleton className="h-5 w-[50px] bg-gray-400" />
      <Skeleton className="h-5 w-[50px] bg-gray-400" />
      <Skeleton className="h-5 w-[50px] bg-gray-400" />
      </div>
      <PageSkeleton/>
    </div>
  </>
  )
}
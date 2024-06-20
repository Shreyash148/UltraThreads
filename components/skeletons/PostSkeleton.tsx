"use client"
import { Skeleton } from "@/components/ui/skeleton"

export function PostSkeleton() {
  return (
    <>
      <div className="md:px-16 flex flex-col justify-center items-center space-y-4">
        <Skeleton className="h-5 w-[100px] bg-gray-400"/>
        <Skeleton className="h-24 w-full bg-gray-400"/>
        <Skeleton className="h-5 w-full bg-gray-400"/>
      </div>
    </>
  )
}

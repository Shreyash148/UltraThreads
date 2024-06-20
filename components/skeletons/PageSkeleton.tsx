"use client"
import { Skeleton } from "@/components/ui/skeleton"

export function PageSkeleton() {
  return (
    <div className="flex flex-col sm:px-20">
    <div className="flex flex-col py-8 space-y-2">
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full bg-gray-400" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-[200px] bg-gray-400" />
        <Skeleton className="h-5 w-[400px] bg-gray-400" />
      </div>  
    </div>
    <Skeleton className="h-5 w-[422px] bg-gray-400" />
    </div>
    <div className="flex flex-col py-8 space-y-2">
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full bg-gray-400" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-[200px] bg-gray-400" />
        <Skeleton className="h-5 w-[400px] bg-gray-400" />
      </div>  
    </div>
    <Skeleton className="h-5 w-[422px] bg-gray-400" />
    </div>
    <div className="flex flex-col py-8 space-y-2">
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full bg-gray-400" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-[200px] bg-gray-400" />
        <Skeleton className="h-5 w-[400px] bg-gray-400" />
      </div>  
    </div>
    <Skeleton className="h-5 w-[422px] bg-gray-400" />
    </div>
    <div className="flex flex-col py-8 space-y-2">
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full bg-gray-400" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-[200px] bg-gray-400" />
        <Skeleton className="h-5 w-[400px] bg-gray-400" />
      </div>  
    </div>
    <Skeleton className="h-5 w-[422px] bg-gray-400" />
    </div>
    
    </div>
  )
}

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

export function isFollowing(userId: String,allFollowings:any[]){
  let check = false;
  if (allFollowings?.length > 0) {
    allFollowings.map((follower: any) => {
      if (follower?.userId?.toString() === userId) {
        check = true;
        return check;
      }
    })
  }
  return check;
}
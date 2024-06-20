import ThreadCard from "@/components/cards/ThreadCard";
import UsersListCard from "@/components/cards/UsersListCard";
import { PageSkeleton } from "@/components/skeletons/PageSkeleton";
import { fetchAllPosts } from "@/lib/actions/threads.actions";
import { getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function Home() {
  const user = await currentUser();
  if(!user)return null;
  const userInfo = user ? await getUser(user.id,"clerkId") : null;
  if(!userInfo?.onboarded)redirect("/onboarding");
  const Id = userInfo?._id?.toString();
  const threads = await fetchAllPosts();
  return (
    <>
    <React.Suspense fallback={<PageSkeleton/>}>
    <section className="flex min-h-screen flex-col p-auto">
      {threads ? threads.allposts.length > 0 ?
        <>
          {threads.allposts.map(thread =>
            <div key={thread._id}>
              <ThreadCard
                id={thread._id?.toString()}
                hasComment={false}
                currUser={Id}
              />
            </div>
          )}
          {/* <UsersListCard/> */}
        </> :
        <p>no threads found</p> :
        <p>no threads found</p>
      }
    </section>
    </React.Suspense>
    </>
  );
}

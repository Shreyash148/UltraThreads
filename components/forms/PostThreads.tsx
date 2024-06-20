"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { threadSchema } from '@/lib/validations/threadSchema'
import { z } from 'zod'
import { postThread } from '@/lib/actions/threads.actions'
import { useRouter, usePathname } from 'next/navigation'

interface Props{
  user:String
};
const PostThreads = ({ user }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
    const form = useForm({
        resolver:zodResolver(threadSchema),
        defaultValues:{
            threadContent:""
        }
    })
    async function onSubmit(values:z.infer<typeof threadSchema>) {
        console.log(values);
        await postThread(
          {
            threadContent:values.threadContent,
            author:user,
            path:pathname
          }
        );
        router.replace("/");
    }
  return (
    <>
      <div>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
            control={form.control}
            name="threadContent"
            render={({ field }) => (
              <FormItem className='flex flex-col gap-4 justify-center items-center text-primary-500'>
                <FormLabel className=' text-heading3-bold'> Create Thread</FormLabel>
                <FormControl className="text-black focus">
                  <Textarea
                    placeholder="Write your thread here"
                    {...field}
                    rows={5}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-primary-500 min-w-full">
            Post Threads
          </Button>
        </form>
        </Form>
        </div>
    </>
  )
}

export default PostThreads
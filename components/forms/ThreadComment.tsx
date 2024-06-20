"use client"

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { postComment } from '@/lib/actions/threads.actions';
import { commentSchema } from '@/lib/validations/threadSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface Props {
  parentId: String,
  userId: String,
  parentAuthor:String
};

const ThreadComment = ({ parentId, userId ,parentAuthor}: Props) => {
  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      threadContent: ""
    }
  });
  async function onSubmit(values: z.infer<typeof commentSchema>) {
    console.log(values);
    await postComment(
      values.threadContent,
      parentId,
      userId,
      parentAuthor
    )
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-row items-center gap-3">
          <FormField
            control={form.control}
            name="threadContent"
            render={({ field }) => (
              <FormItem className='flex flex-row items-center w-full gap-3'>
                <FormLabel className='h-10 w-10'>
                  <Image src="/assets/profile-active.svg" height={40} width={40} alt="pro" style={{ "borderRadius": "100%", height: "40px" }} />
                </FormLabel>
                <FormControl className='border-none'>
                  <Input placeholder="comment here" {...field} className="no-focus text-black outline-none" style={{ "marginTop": "0px" }} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-primary-500">
            Post
          </Button>
        </form>
      </Form>
    </>
  )
}

export default ThreadComment
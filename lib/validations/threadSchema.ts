"use client"

import { z } from "zod"

export const threadSchema = z.object({
  threadContent: z.string().min(3),
})
export const commentSchema = z.object({
    threadContent: z.string().min(3),
  })

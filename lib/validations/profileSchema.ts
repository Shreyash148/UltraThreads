"use client"

import { z } from "zod"

export const profileSchema = z.object({
  username: z.string().min(2).max(50),
  name : z.string().min(3).max(30),
  bio:z.string().min(3).max(300),
  profilePhoto:z.string().url()
})

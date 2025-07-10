import { User } from "@/types/user"

export type Post = {
  id: string
  title: string
  content: string
  topImage: string | null
  published: boolean
  createdAt: Date
  updatedAt: Date
  author: {
    name: string
  }
}

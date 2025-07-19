import { auth } from "@/auth";
import { getOwnPost } from "@/lib/ownPost";
import { Post } from "@/types/post"
import { notFound } from "next/navigation"
import EditPostForm from "./EditPostForm";

type Params = {
  params: Promise<{
    id: string
  }>
}

export default async function Page(params: Params) {
  const { id } = await params.params

  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("不正なリクエストです");
  }

  const post = await getOwnPost(userId, id) as Post
  if (!post) {
    notFound()
  }

  return (
    <EditPostForm post={post} />
  )
}

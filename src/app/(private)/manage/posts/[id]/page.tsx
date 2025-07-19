import { auth } from "@/auth";
import { getOwnPost } from "@/lib/ownPost";
import { Post } from "@/types/post"
import { notFound } from "next/navigation"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { ja } from "date-fns/locale"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github.css"

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
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto py-0">
        {post.topImage && (
          <div className="relative w-full h-64 lg:h-96">
            <Image
              src={post.topImage}
              alt={post.title}
              fill
              sizes="100vw"
              className="rounded-t-md object-cover"
              priority
            />
          </div>
        )}
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">
              投稿者: {post.author.name}
            </p>
            <time>
              {formatDistanceToNow(post.createdAt, {
                addSuffix: true,
                locale: ja,
              })}
            </time>
          </div>
          <CardTitle className="text-3xl font-bold">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="prose max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              skipHtml={false}
              unwrapDisallowed={true}
            >{post.content}</ReactMarkdown>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

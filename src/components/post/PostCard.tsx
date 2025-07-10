import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { Post } from "@/types/post"
import { formatDistanceToNow } from "date-fns"
import { ja } from "date-fns/locale"
import Image from "next/image"

type Params = {
  post: Post
}

export default function PostCard(params: Params) {
  const { post } = params

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 py-0">
      <Link href={`/posts/${post.id}`} className="block">
        {post.topImage && (
          <div className="relative w-full h-48">
            <Image
              src={post.topImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-t-md object-cover"
              priority
            />
          </div>
        )}
        <CardHeader className="p-2">
          <CardTitle className="line-clamp-2">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <p className="text-sm text-gray-500 mb-2 line-clamp-2">
            Post Content
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span className="font-bold">
              {post.author.name}
            </span>
            <time>
              {formatDistanceToNow(post.createdAt, {
                addSuffix: true,
                locale: ja,
              })}
            </time>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}

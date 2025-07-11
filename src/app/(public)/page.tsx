import { getPosts, searchPosts } from "@/lib/post"
import PostCard from "@/components/post/PostCard"
import { Post } from "@/types/post"

type Props = {
  searchParams: Promise<{
    query?: string
  }>
}

export default async function Page(props: Props) {
  const searchParams = await props.searchParams
  const query = searchParams.query || ""

  const posts = query
    ? await searchPosts(query) as Post[]
    : await getPosts() as Post[]

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
            />
          ))}
        </div>
      </div>
    </>
  )
}

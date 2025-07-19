import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import PostDropdownMenu from "@/components/post/PostDropdownMenu";
import { getOwnPosts } from "@/lib/ownPost";
import Link from "next/link";

export default async function Page() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("不正なリクエストです");
  }

  const posts = await getOwnPosts(userId);
  
  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">
          記事一覧
        </h1>
        <Button asChild variant="outline">
          <Link href="/manage/posts/create">
            新規作成
          </Link>
        </Button>
      </div>
      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">タイトル</th>
            <th className="border border-gray-300 p-2">表示 / 非表示</th>
            <th className="border border-gray-300 p-2">更新日時</th>
            <th className="border border-gray-300 p-2">操作</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="border border-gray-300 p-2">
                {post.title}
              </td>
              <td className="border border-gray-300 p-2">
                {post.published ? "表示" : "非表示"}
              </td>
              <td className="border border-gray-300 p-2">
                {post.updatedAt.toLocaleString()}
              </td>
              <td className="border border-gray-300 p-2">
                <PostDropdownMenu postId={post.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

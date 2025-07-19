import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

type Props = {
  postId: string;
}

export default function PostDropdownMenu(props: Props) {
  const { postId } = props;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="px-2 py-1 border rounded-md">
          ...
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
          <DropdownMenuItem asChild>
            <Link href={`/manage/posts/${postId}`} className="cursor-pointer">
              詳細
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/manage/posts/${postId}/edit`} className="cursor-pointer">
              編集
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/posts/${postId}/delete`} className="text-red-500 cursor-pointer">
              削除
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

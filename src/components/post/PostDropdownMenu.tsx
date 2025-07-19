"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useState } from "react";
import DeletePostDialog from "./DeletePostDialog";

type Props = {
  postId: string;
}

export default function PostDropdownMenu(props: Props) {
  const { postId } = props;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleDeleteDialogChange = (open: boolean) => {
    setIsDeleteDialogOpen(open)
    if (!open) {
      setIsDropdownOpen(false)
    }
  }

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
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
          <DropdownMenuItem
            className="text-red-500 cursor-pointer"
            onClick={() => {
              setIsDropdownOpen(false)
              setIsDeleteDialogOpen(true)
            }}
          >削除</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isDeleteDialogOpen && (
        <DeletePostDialog
          postId={postId}
          isOpen={isDeleteDialogOpen}
          onOpenChange={handleDeleteDialogChange}
        />
      )}
    </>
  )
}

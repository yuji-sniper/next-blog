'use server'
import { postSchema } from "@/validations/post"
import { z } from "zod"
import { saveImage } from "@/utils/image"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"

type ActionState = {
  success: boolean
  errors: Record<string, string[]>
}

export async function updatePost(
  _: ActionState,
  formData: FormData
): Promise<ActionState> {
  // フォームデータ取得
  const postId = formData.get("postId") as string
  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const oldTopImage = formData.get("oldTopImage") as string
  const topImage = formData.get("topImage") as File | null
  const published = formData.get("published") === "true"

  // バリデーション
  const validationResult = postSchema.safeParse({
    title,
    content,
    topImage,
  })
  if (!validationResult.success) {
    const { fieldErrors } = z.flattenError(validationResult.error)
    return {
      success: false,
      errors: {
        title: fieldErrors.title || [],
        content: fieldErrors.content || [],
        topImage: fieldErrors.topImage || [],
      },
    }
  }

  // 画像保存
  let imageUrl = oldTopImage
  if (topImage instanceof File && topImage.size > 0 && topImage.name !== "undefined") {
    const newImageUrl = await saveImage(topImage)
    if (!newImageUrl) {
      return {
        success: false,
        errors: {
          topImage: ["画像の保存に失敗しました"],
        },
      }
    }
    imageUrl = newImageUrl
  }

  // DB保存
  await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      title,
      content,
      topImage: imageUrl,
      published,
    },
  })

  redirect("/dashboard")
}

'use server'
import { postSchema } from "@/validations/post"
import { z } from "zod"
import { saveImage } from "@/utils/image"
import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"

type ActionState = {
  success: boolean
  errors: Record<string, string[]>
}

export async function createPost(
  _: ActionState,
  formData: FormData
): Promise<ActionState> {
  // フォームデータ取得
  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const topImage = formData.get("topImage") as File | null

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
  const imageUrl = topImage ? await saveImage(topImage) : null
  if (topImage && !imageUrl) {
    return {
      success: false,
      errors: {
        topImage: ["画像の保存に失敗しました"],
      },
    }
  }

  // DB保存
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) {
    throw new Error("不正なリクエストです")
  }
  await prisma.post.create({
    data: {
      title,
      content,
      topImage: imageUrl,
      published: true,
      authorId: userId,
    },
  })

  redirect("/dashboard")
}

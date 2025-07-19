import { z } from "zod"

export const postSchema = z.object({
  title: z
    .string()
    .min(1, { message: "タイトルを入力してください" })
    .max(32, { message: "タイトルは100文字以内にしてください" }),
  content: z
    .string()
    .min(1, { message: "内容を入力してください" }),
  topImage: z
    .instanceof(File)
    .nullable()
    .optional()
    .refine((file) => (file?.size && file.size <= 5 * 1024 * 1024), {
      message: "トップ画像は5MB以内にしてください",
    }),
})

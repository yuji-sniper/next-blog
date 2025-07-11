import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, { message: "名前を入力してください" }),
  email: z
    .email({ message: "メールアドレスを入力してください" }),
  password: z
    .string({ message: "パスワードを入力してください" })
    .min(8, { message: "パスワードを入力してください" }),
  confirmPassword: z
    .string({ message: "パスワードを入力してください" })
    .min(8, { message: "パスワードを入力してください" })
}).refine((data) => data.password === data.confirmPassword, {
  message: "パスワードが一致しません",
  path: ["confirmPassword"],
});

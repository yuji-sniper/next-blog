'use server';

import { signIn } from "@/auth";
import prisma from "@/lib/prisma";
import { registerSchema } from "@/validations/user";
import bcryptjs from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";

type ActionState = {
  success: boolean;
  errors: Record<string, string[]>;
}

function handleValidationError(error: z.ZodError): ActionState {
  const { fieldErrors, formErrors } = z.flattenError(error);

  if (formErrors.length > 0) {
    return {
      success: false,
      errors: {
        ...fieldErrors,
        comparePassword: formErrors,
      },
    };
  }

  return {
    success: false,
    errors: fieldErrors,
  };
}

function handleError(customErrors: Record<string, string[]>): ActionState {
  return {
    success: false,
    errors: customErrors,
  };
}

export async function createUser(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // フォームデータを取得
  const rawFormData = Object.fromEntries(
    ["name", "email", "password", "confirmPassword"].map((key) => [
      key,
      formData.get(key),
    ])
  );


  // バリデーション
  const validatedResult = registerSchema.safeParse(rawFormData);

  if (!validatedResult.success) {
    return handleValidationError(validatedResult.error);
  }


  // DBにメールアドレスが存在するか確認
  const existingUser = await prisma.user.findUnique({
    where: {
      email: validatedResult.data.email,
    },
  });

  if (existingUser) {
    return handleError({
      email: ["メールアドレスはすでに使用されています"],
    });
  }


  // ユーザーを作成
  const hashedPassword = await bcryptjs.hash(validatedResult.data.password, 12);

  await prisma.user.create({
    data: {
      name: validatedResult.data.name,
      email: validatedResult.data.email,
      password: hashedPassword,
    },
  });


  // ダッシュボードにリダイレクト
  await signIn('credentials', {
    ...Object.fromEntries(formData.entries()),
    redirect: false,
  });

  redirect('/dashboard');
}

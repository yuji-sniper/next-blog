'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions/authenticate'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export default function LoginForm() {
  const [errorMessage, formAction] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>ログイン</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input type="email" name="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">パスワード</Label>
            <Input type="password" name="password" required />
          </div>
          <Button type="submit" className="w-full">ログイン</Button>
        </form>
        <div className="mt-4">
          {errorMessage && (
            <div>
              <p className="text-sm text-red-500">{errorMessage}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

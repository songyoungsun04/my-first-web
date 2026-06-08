"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { getErrorMessage } from "@/lib/error-message";
import MoleCharacter from "@/components/MoleCharacter";

type LoginForm = {
  email: string;
  password: string;
};

type FocusField = "email" | "password" | "name" | null;

export default function LoginPage() {
  const router = useRouter();
  const { signInWithEmail } = useAuth();
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusField, setFocusField] = useState<FocusField>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const { error: authError } = await signInWithEmail(form.email, form.password);

    if (authError) {
      console.error("Login failed", authError);
      setError(getErrorMessage(authError));
      setIsSubmitting(false);
      return;
    }

    router.push("/posts");
    setIsSubmitting(false);
  };

  return (
    <section className="flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:justify-center lg:gap-16">
      {/* 두더지 캐릭터 영역 */}
      <div className="flex flex-col items-center gap-3 lg:order-first">
        <div className="flex items-end gap-2">
          <MoleCharacter color="blue" focusField={focusField} size={160} />
          <MoleCharacter color="red" focusField={focusField} size={120} />
        </div>
        <p className="text-sm text-muted-foreground animate-pulse">
          우리가 지켜보고 있어요! 👀
        </p>
      </div>

      {/* 로그인 폼 카드 */}
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader className="px-6 pt-6">
          <CardTitle>로그인</CardTitle>
          <CardDescription>
            계정을 입력해 계속 진행하세요.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} className="space-y-0">
          <CardContent className="space-y-4 px-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                이메일
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onFocus={() => setFocusField("email")}
                onBlur={() => setFocusField(null)}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, email: event.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                비밀번호
              </label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="비밀번호를 입력하세요"
                value={form.password}
                onFocus={() => setFocusField("password")}
                onBlur={() => setFocusField(null)}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, password: event.target.value }))
                }
              />
            </div>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
          </CardContent>
          <CardFooter className="flex flex-col gap-2 px-6">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              로그인
            </Button>
            <Button variant="link" asChild className="h-auto p-0 text-sm">
              <Link href="/signup">회원가입으로 이동</Link>
            </Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}

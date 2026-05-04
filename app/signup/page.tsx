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
import { useAuth } from "@/components/AuthProvider";

type SignupForm = {
  name: string;
  email: string;
  password: string;
};

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [form, setForm] = useState<SignupForm>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const result = signup(form.name, form.email, form.password);

    if (!result.ok) {
      setError(result.message ?? "회원가입에 실패했습니다.");
      return;
    }

    router.push("/posts");
  };

  return (
    <section className="mx-auto max-w-md">
      <Card className="shadow-sm">
        <CardHeader className="px-6 pt-6">
          <CardTitle>회원가입</CardTitle>
          <CardDescription>
            간단한 정보만 입력하면 바로 시작할 수 있어요.
            <span className="mt-2 block text-xs">
              이 회원가입은 화면 내 데모로, 새로고침하면 초기화됩니다.
            </span>
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} className="space-y-0">
          <CardContent className="space-y-4 px-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                이름
              </label>
              <Input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="이름을 입력하세요"
                value={form.name}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, name: event.target.value }))
                }
              />
            </div>
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
                autoComplete="new-password"
                placeholder="비밀번호를 입력하세요"
                value={form.password}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, password: event.target.value }))
                }
              />
            </div>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
          </CardContent>
          <CardFooter className="flex flex-col gap-2 px-6">
            <Button type="submit" className="w-full">
              회원가입
            </Button>
            <Button variant="link" asChild className="h-auto p-0 text-sm">
              <Link href="/login">로그인으로 이동</Link>
            </Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}

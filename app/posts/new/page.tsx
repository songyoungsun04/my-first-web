"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

type PostForm = {
  title: string;
  content: string;
};

export default function NewPostPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [form, setForm] = useState<PostForm>({ title: "", content: "" });

  if (loading) {
    return (
      <section className="mx-auto max-w-2xl rounded-xl border border-border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-foreground">새 게시글 작성</h1>
        <p className="mt-4 text-sm text-muted-foreground">로그인 상태를 확인하고 있습니다.</p>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="mx-auto max-w-2xl rounded-xl border border-border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-foreground">로그인이 필요합니다</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          글을 작성하려면 먼저 로그인해주세요.
        </p>
        <Button className="mt-6" asChild>
          <Link href="/login">로그인하기</Link>
        </Button>
      </section>
    );
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    alert("저장되었습니다");
    router.push("/posts");
  };

  return (
    <section className="mx-auto max-w-2xl rounded-xl border border-border bg-card p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-foreground">새 게시글 작성</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-foreground">
            제목
          </label>
          <Input
            id="title"
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="제목을 입력하세요"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="content" className="block text-sm font-medium text-foreground">
            내용
          </label>
          <textarea
            id="content"
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="내용을 입력하세요"
            rows={8}
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </div>

        <Button type="submit">
          저장하기
        </Button>
      </form>
    </section>
  );
}

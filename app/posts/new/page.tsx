"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import PostForm from "@/components/PostForm";
import { createPost, type PostPayload } from "@/lib/posts";

export default function NewPostPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (values: PostPayload) => {
    setIsSubmitting(true);
    setError(null);

    const { data, error: createError } = await createPost(user.id, values);

    if (createError) {
      console.error("Failed to create post", createError);
      setError("게시글 작성에 실패했습니다. 잠시 후 다시 시도해주세요.");
      setIsSubmitting(false);
      return;
    }

    if (data) {
      router.push(`/posts/${data.id}`);
    } else {
      router.push("/posts");
    }

    setIsSubmitting(false);
  };

  return (
    <section className="mx-auto max-w-2xl rounded-xl border border-border bg-card p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-foreground">새 게시글 작성</h1>
      <PostForm
        onSubmit={handleSubmit}
        submitLabel="작성하기"
        isSubmitting={isSubmitting}
        errorMessage={error}
      />
    </section>
  );
}

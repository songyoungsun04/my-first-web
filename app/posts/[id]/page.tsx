"use client";

import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { deletePost, getPostById, updatePost, type Post, type PostPayload } from "@/lib/posts";
import { useAuth } from "@/contexts/AuthContext";
import PostForm from "@/components/PostForm";

export default function PostDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { user } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const postId = useMemo(() => {
    const rawId = params?.id;
    return Array.isArray(rawId) ? rawId[0] : rawId;
  }, [params]);

  useEffect(() => {
    if (!postId) {
      setError("잘못된 경로입니다.");
      setLoading(false);
      return;
    }

    let isMounted = true;

    const loadPost = async () => {
      setLoading(true);
      setError(null);

      const { data, error: loadError, notFound: isMissing } = await getPostById(postId);

      if (!isMounted) {
        return;
      }

      if (isMissing) {
        setIsNotFound(true);
        setPost(null);
        setLoading(false);
        return;
      }

      if (loadError) {
        console.error("Failed to load post", loadError);
        setError("게시글을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
        setPost(null);
      } else {
        setPost(data);
      }

      setLoading(false);
    };

    loadPost();

    return () => {
      isMounted = false;
    };
  }, [postId]);

  const isOwner = Boolean(user && post && user.id === post.user_id);

  const formatDate = (value: string) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("ko-KR");
  };

  const handleUpdate = async (values: PostPayload) => {
    if (!post) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const { data, error: updateError } = await updatePost(post.id, values);

    if (updateError) {
      console.error("Failed to update post", updateError);
      setError("게시글 수정에 실패했습니다. 잠시 후 다시 시도해주세요.");
      setIsSubmitting(false);
      return;
    }

    if (data) {
      setPost(data);
    }

    setIsSubmitting(false);
    router.push("/posts");
  };

  const handleDelete = async () => {
    if (!post) {
      return;
    }

    const confirmed = window.confirm("게시글을 삭제할까요? 삭제하면 복구할 수 없습니다.");

    if (!confirmed) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const { error: deleteError } = await deletePost(post.id);

    setIsSubmitting(false);

    if (deleteError) {
      console.error("Failed to delete post", deleteError);
      setError("게시글 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    router.push("/posts");
  };

  if (isNotFound) {
    notFound();
  }

  if (loading) {
    return (
      <section className="space-y-4">
        <h1 className="text-2xl font-bold text-foreground">게시글 상세</h1>
        <p className="text-sm text-muted-foreground">게시글을 불러오는 중입니다.</p>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="space-y-4">
        <h1 className="text-2xl font-bold text-foreground">게시글 상세</h1>
        <p className="text-sm text-muted-foreground">
          {error ?? "게시글을 찾을 수 없습니다."}
        </p>
        <Button variant="link" asChild className="px-0">
          <Link href="/posts">목록으로 돌아가기</Link>
        </Button>
      </section>
    );
  }

  return (
    <article className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{post.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {formatDate(post.created_at)}
          </p>
        </div>
        {isOwner ? (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
              disabled={isSubmitting}
            >
              {isEditing ? "수정 취소" : "수정"}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={isSubmitting}
            >
              삭제
            </Button>
          </div>
        ) : null}
        {isOwner ? (
          <p className="text-xs text-muted-foreground">
            수정/삭제 노출은 UI 분기이며 실제 보안은 Ch11 RLS에서 처리됩니다.
          </p>
        ) : null}
      </header>

      {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}

      {isEditing ? (
        <PostForm
          initialValues={{ title: post.title, content: post.content }}
          onSubmit={handleUpdate}
          submitLabel="수정 저장"
          isSubmitting={isSubmitting}
          errorMessage={error}
        />
      ) : (
        <p className="mt-6 leading-7 text-foreground whitespace-pre-wrap">{post.content}</p>
      )}

      <Button variant="link" asChild className="mt-8 px-0">
        <Link href="/posts">목록으로 돌아가기</Link>
      </Button>
    </article>
  );
}

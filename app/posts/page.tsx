"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

type PostRow = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
};

export default function PostsPage() {
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    let isMounted = true;

    const loadPosts = async () => {
      setLoading(true);
      setError(null);

      const { data, error: loadError } = await supabase
        .from("posts")
        .select("id, title, content, created_at, user_id")
        .order("created_at", { ascending: false });

      if (!isMounted) {
        return;
      }

      if (loadError) {
        setError("게시글을 불러오지 못했습니다.");
        setPosts([]);
      } else {
        setPosts(data ?? []);
      }

      setLoading(false);
    };

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">최근 기록</p>
          <h1 className="text-2xl font-semibold text-foreground">글 목록</h1>
          <p className="text-sm text-muted-foreground">
            학습과 프로젝트 기록을 모아 확인할 수 있습니다.
          </p>
        </div>
        <Button size="sm" asChild>
          <Link href="/posts/new">새 글 쓰기</Link>
        </Button>
      </header>

      {loading ? (
        <p className="text-sm text-muted-foreground">로딩 중...</p>
      ) : error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : posts.length === 0 ? (
        <p className="text-sm text-muted-foreground">게시글이 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="rounded-lg border border-border bg-card p-4">
              <Link href={`/posts/${post.id}`} className="space-y-2 block">
                <h2 className="text-lg font-semibold text-foreground">{post.title}</h2>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {post.content}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

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
  const [reloadKey, setReloadKey] = useState(0);

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
        console.error("Failed to load posts", loadError);
        setError("게시글을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
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
  }, [reloadKey]);

  const handleRetry = () => {
    setReloadKey((prev) => prev + 1);
  };

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
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-muted-foreground/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-muted-foreground/60" />
            </span>
            <span>게시글을 불러오는 중입니다. 잠시만 기다려주세요.</span>
          </div>
        </div>
      ) : error ? (
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">{error}</p>
          <div className="mt-3">
            <Button variant="outline" size="sm" onClick={handleRetry}>
              다시 시도
            </Button>
          </div>
        </div>
      ) : posts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-card p-6 text-center">
          <p className="text-sm text-muted-foreground">
            아직 작성된 게시글이 없습니다. 첫 글을 작성해보세요.
          </p>
          <Button size="sm" className="mt-4" asChild>
            <Link href="/posts/new">첫 글 쓰기</Link>
          </Button>
        </div>
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

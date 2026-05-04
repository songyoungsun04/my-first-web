import Link from "next/link";
import PostsListClient from "@/components/PostsListClient";
import { Button } from "@/components/ui/button";
import { getPosts } from "@/lib/posts";

export default async function PostsPage() {
  const initialPosts = await getPosts();

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
      <PostsListClient initialPosts={initialPosts} />
    </section>
  );
}

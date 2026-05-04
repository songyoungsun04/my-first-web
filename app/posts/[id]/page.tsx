import Link from "next/link";
import { getPostById } from "@/lib/posts";
import { Button } from "@/components/ui/button";

type PostDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = await params;
  const postId = Number(id);

  const post = await getPostById(postId);

  if (!post) {
    return (
      <section className="space-y-4">
        <h1 className="text-2xl font-bold text-foreground">게시글 상세</h1>
        <p className="text-sm text-muted-foreground">게시글을 찾을 수 없습니다.</p>
        <Button variant="link" asChild className="px-0">
          <Link href="/posts">목록으로 돌아가기</Link>
        </Button>
      </section>
    );
  }

  return (
    <article className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-foreground">{post.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {post.author} · {post.date}
      </p>
      <p className="mt-6 leading-7 text-foreground">{post.content}</p>
      <Button variant="link" asChild className="mt-8 px-0">
        <Link href="/posts">목록으로 돌아가기</Link>
      </Button>
    </article>
  );
}

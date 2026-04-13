import Link from "next/link";
import { getPostById } from "@/lib/posts";

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
        <h1 className="text-2xl font-bold text-gray-900">게시글 상세</h1>
        <p className="text-gray-600">게시글을 찾을 수 없습니다.</p>
        <Link href="/posts" className="inline-block text-sm font-medium text-blue-600 hover:underline">
          목록으로 돌아가기
        </Link>
      </section>
    );
  }

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900">{post.title}</h1>
      <p className="mt-2 text-sm text-gray-500">
        {post.author} · {post.date}
      </p>
      <p className="mt-6 leading-7 text-gray-700">{post.content}</p>
      <Link href="/posts" className="mt-8 inline-block text-sm font-medium text-blue-600 hover:underline">
        목록으로 돌아가기
      </Link>
    </article>
  );
}

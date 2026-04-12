import Link from "next/link";
import { posts } from "@/lib/posts";

export default function PostsPage() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">게시글 목록</h1>
        <p className="text-sm text-gray-500">총 {posts.length}개</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            className="block rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <h2 className="text-lg font-semibold text-gray-900">{post.title}</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">{post.content}</p>
            <p className="mt-4 text-xs text-gray-500">
              {post.author} · {post.date}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

import Link from "next/link";
import { posts } from "@/lib/posts";

export default function PostsPage() {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">블로그</h1>
        <span className="text-sm text-gray-500">총 {posts.length}개 글</span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            className="block rounded-xl border border-gray-200 p-5 transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <h2 className="text-lg font-semibold text-gray-900">{post.title}</h2>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">{post.content}</p>
            <p className="mt-4 text-xs text-gray-500">
              {post.author} · {post.date}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

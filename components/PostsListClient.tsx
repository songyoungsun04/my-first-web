"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Post } from "@/lib/posts";
import SearchBar from "@/components/SearchBar";

type PostsListClientProps = {
  initialPosts: Post[];
};

export default function PostsListClient({ initialPosts }: PostsListClientProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [query, setQuery] = useState("");

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return posts;
    }

    return posts.filter((post) => {
      const title = post.title.toLowerCase();
      const content = post.content.toLowerCase();
      return title.includes(normalizedQuery) || content.includes(normalizedQuery);
    });
  }, [posts, query]);

  const handleDelete = (postId: number) => {
    const confirmed = window.confirm("이 게시글을 삭제할까요?");

    if (!confirmed) {
      return;
    }

    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-2xl font-bold text-gray-900">게시글 목록</h1>
          <p className="text-sm text-gray-500">
            검색 결과 {filteredPosts.length}개 / 전체 {posts.length}개
          </p>
        </div>
        <SearchBar onSearch={setQuery} />
      </div>

      {filteredPosts.length === 0 ? (
        <p className="rounded-xl border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-600">
          검색 결과가 없습니다.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredPosts.map((post) => (
            <li key={post.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold text-gray-900">{post.title}</h2>
                <button
                  type="button"
                  onClick={() => handleDelete(post.id)}
                  className="shrink-0 rounded-md border border-red-200 px-2.5 py-1 text-xs font-medium text-red-600 transition hover:bg-red-50"
                >
                  삭제
                </button>
              </div>
              <p className="mt-2 text-sm leading-6 text-gray-600">{post.content}</p>
              <p className="mt-4 text-xs text-gray-500">
                {post.author} · {post.date}
              </p>
              <Link href={`/posts/${post.id}`} className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline">
                상세 보기
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

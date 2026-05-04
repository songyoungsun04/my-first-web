"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Post } from "@/lib/posts";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type PostsListClientProps = {
  initialPosts: Post[];
};

export default function PostsListClient({ initialPosts }: PostsListClientProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [query, setQuery] = useState("");
  const [pendingDelete, setPendingDelete] = useState<Post | null>(null);

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

  const handleOpenDelete = (post: Post) => {
    setPendingDelete(post);
  };

  const handleConfirmDelete = () => {
    if (!pendingDelete) {
      return;
    }

    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== pendingDelete.id));
    setPendingDelete(null);
  };

  const handleDialogChange = (open: boolean) => {
    if (!open) {
      setPendingDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-2xl font-bold text-foreground">게시글 목록</h1>
          <p className="text-sm text-muted-foreground">
            검색 결과 {filteredPosts.length}개 / 전체 {posts.length}개
          </p>
        </div>
        <SearchBar onSearch={setQuery} />
      </div>

      <Dialog open={Boolean(pendingDelete)} onOpenChange={handleDialogChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>게시글 삭제</DialogTitle>
            <DialogDescription>
              {pendingDelete
                ? `"${pendingDelete.title}" 게시글을 삭제하면 복구할 수 없습니다.`
                : "삭제할 게시글을 선택해주세요."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">취소</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {filteredPosts.length === 0 ? (
        <Card className="items-center justify-center border-dashed text-center">
          <CardContent className="py-6 text-sm text-muted-foreground">
            검색 결과가 없습니다.
          </CardContent>
        </Card>
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredPosts.map((post) => (
            <li key={post.id}>
              <Card className="h-full shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  <CardAction>
                    <Button variant="destructive" size="sm" onClick={() => handleOpenDelete(post)}>
                      삭제
                    </Button>
                  </CardAction>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-6 text-foreground">{post.content}</p>
                  <p className="text-xs text-muted-foreground">
                    {post.author} · {post.date}
                  </p>
                </CardContent>
                <CardFooter className="justify-end">
                  <Button variant="link" asChild className="px-0">
                    <Link href={`/posts/${post.id}`}>상세 보기</Link>
                  </Button>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

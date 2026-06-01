"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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
import { deletePost, getPosts } from "@/lib/posts";
import { useAuth } from "@/contexts/AuthContext";

type PostsListClientProps = {
  initialPosts?: Post[];
};

export default function PostsListClient({ initialPosts = [] }: PostsListClientProps) {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [query, setQuery] = useState("");
  const [pendingDelete, setPendingDelete] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadPosts = async () => {
      setLoading(true);
      setError(null);

      const { data, error: loadError } = await getPosts();

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

  const isSearchActive = query.trim().length > 0;
  const isEmptyState = posts.length === 0 && !isSearchActive;

  const handleOpenDelete = (post: Post) => {
    setPendingDelete(post);
  };

  const handleConfirmDelete = async () => {
    if (!pendingDelete) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    const { error: deleteError } = await deletePost(pendingDelete.id);

    if (deleteError) {
      console.error("Failed to delete post", deleteError);
      setError("게시글 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.");
      setIsDeleting(false);
      setPendingDelete(null);
      return;
    }

    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== pendingDelete.id));
    setPendingDelete(null);
    setIsDeleting(false);
  };

  const handleDialogChange = (open: boolean) => {
    if (!open) {
      setPendingDelete(null);
    }
  };

  const formatDate = (value: string) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("ko-KR");
  };

  const getAuthorLabel = (userId: string) => {
    if (!userId) {
      return "알 수 없음";
    }

    return `${userId.slice(0, 8)}...`;
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
        {error ? (
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>{error}</span>
            <Button
              variant="outline"
              size="xs"
              onClick={() => setReloadKey((prev) => prev + 1)}
            >
              다시 시도
            </Button>
          </div>
        ) : null}
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
            <Button variant="destructive" onClick={handleConfirmDelete} disabled={isDeleting}>
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {loading ? (
        <Card className="items-center justify-center border-dashed text-center">
          <CardContent className="py-6 text-sm text-muted-foreground">
            게시글을 불러오는 중입니다.
          </CardContent>
        </Card>
      ) : isEmptyState ? (
        <Card className="items-center justify-center border-dashed text-center">
          <CardContent className="space-y-3 py-6 text-sm text-muted-foreground">
            <p>아직 작성된 게시글이 없습니다. 첫 글을 작성해보세요.</p>
            <Button size="xs" asChild>
              <Link href="/posts/new">첫 글 쓰기</Link>
            </Button>
          </CardContent>
        </Card>
      ) : filteredPosts.length === 0 ? (
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
                    {user?.id === post.user_id ? (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleOpenDelete(post)}
                      >
                        삭제
                      </Button>
                    ) : null}
                  </CardAction>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-6 text-foreground">{post.content}</p>
                  <p className="text-xs text-muted-foreground">
                    {getAuthorLabel(post.user_id)} · {formatDate(post.created_at)}
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

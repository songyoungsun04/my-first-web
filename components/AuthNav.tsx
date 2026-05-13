"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthNav() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const displayName = user?.user_metadata?.name ?? user?.email ?? "";

  const handleLogout = async () => {
    const { error } = await signOut();

    if (!error) {
      router.push("/");
    }
  };

  return (
    <div className="flex items-center gap-2">
      {loading ? (
        <span className="text-sm text-muted-foreground">로그인 확인 중...</span>
      ) : user ? (
        <>
          <Button size="sm" asChild>
            <Link href="/posts/new">글쓰기</Link>
          </Button>
          {displayName ? (
            <span className="text-sm text-muted-foreground">{displayName}님</span>
          ) : null}
          <Button variant="outline" size="sm" onClick={handleLogout}>
            로그아웃
          </Button>
        </>
      ) : (
        <>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">로그인</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/signup">회원가입</Link>
          </Button>
        </>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";

export default function AuthNav() {
  const { user, logout } = useAuth();
  const displayName = user?.name ?? user?.email ?? "";

  return (
    <div className="flex items-center gap-2">
      {user ? (
        <>
          <span className="text-sm text-muted-foreground">{displayName}님</span>
          <Button variant="outline" size="sm" onClick={logout}>
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

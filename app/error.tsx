"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Global error boundary", error);
  }, [error]);

  return (
    <section className="mx-auto max-w-xl space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm">
      <h1 className="text-2xl font-semibold text-foreground">문제가 발생했습니다</h1>
      <p className="text-sm text-muted-foreground">
        예상치 못한 오류로 작업을 완료하지 못했습니다. 잠시 후 다시 시도해주세요.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button onClick={reset}>다시 시도</Button>
        <Button variant="outline" asChild>
          <Link href="/">홈으로 돌아가기</Link>
        </Button>
      </div>
    </section>
  );
}

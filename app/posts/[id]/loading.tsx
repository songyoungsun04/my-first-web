export default function PostDetailLoading() {
  return (
    <section className="space-y-4">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="space-y-3">
          <div className="h-6 w-40 rounded bg-muted/60 animate-pulse" />
          <div className="h-4 w-28 rounded bg-muted/60 animate-pulse" />
        </div>
        <div className="mt-6 space-y-3">
          <div className="h-4 w-full rounded bg-muted/50 animate-pulse" />
          <div className="h-4 w-11/12 rounded bg-muted/50 animate-pulse" />
          <div className="h-4 w-10/12 rounded bg-muted/50 animate-pulse" />
        </div>
      </div>
      <div className="text-sm text-muted-foreground">게시글을 불러오는 중입니다.</div>
    </section>
  );
}

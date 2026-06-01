export default function PostsLoading() {
  return (
    <section className="space-y-6">
      <header className="space-y-3">
        <div className="h-4 w-24 rounded bg-muted/60 animate-pulse" />
        <div className="h-7 w-36 rounded bg-muted/60 animate-pulse" />
        <div className="h-4 w-72 rounded bg-muted/60 animate-pulse" />
      </header>

      <div className="rounded-lg border border-border bg-card p-4">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-muted-foreground/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-muted-foreground/60" />
          </span>
          <span>게시글을 불러오는 중입니다.</span>
        </div>
      </div>

      <ul className="space-y-4">
        <li className="h-24 rounded-lg border border-border bg-card animate-pulse" />
        <li className="h-24 rounded-lg border border-border bg-card animate-pulse" />
        <li className="h-24 rounded-lg border border-border bg-card animate-pulse" />
      </ul>
    </section>
  );
}

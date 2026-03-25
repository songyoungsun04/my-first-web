export default function Home() {
  const posts = [
    {
      title: "경제 뉴스 한눈에 정리하기",
      summary: "매일 쏟아지는 경제 이슈를 핵심만 빠르게 읽는 방법을 공유합니다.",
      date: "2026.03.25",
      category: "경제",
    },
    {
      title: "대학생을 위한 금융 습관 5가지",
      summary: "소액으로 시작할 수 있는 예산 관리와 소비 기록 루틴을 소개합니다.",
      date: "2026.03.20",
      category: "금융",
    },
    {
      title: "게임에서 배우는 전략적 사고",
      summary: "취미인 게임을 통해 의사결정과 리스크 관리 관점을 풀어봅니다.",
      date: "2026.03.17",
      category: "취미",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-5">
          <h1 className="text-2xl font-bold">YS Blog</h1>
          <nav className="flex gap-4 text-sm text-slate-600">
            <a href="#" className="hover:text-slate-900">
              홈
            </a>
            <a href="#" className="hover:text-slate-900">
              글목록
            </a>
            <a href="#" className="hover:text-slate-900">
              소개
            </a>
          </nav>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-5xl gap-6 px-4 py-8 md:grid-cols-3">
        <section className="space-y-4 md:col-span-2">
          <h2 className="text-xl font-semibold">최신 글</h2>
          {posts.map((post) => (
            <article key={post.title} className="rounded-lg bg-white p-6 shadow">
              <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                <span>{post.category}</span>
                <span>·</span>
                <time>{post.date}</time>
              </div>
              <h3 className="text-lg font-bold">{post.title}</h3>
              <p className="mt-2 text-slate-600">{post.summary}</p>
            </article>
          ))}
        </section>

        <aside className="h-fit rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-bold">블로그 소개</h2>
          <p className="mt-4 text-3xl font-bold">송영선</p>
          <div className="mt-5 space-y-2 text-slate-700">
            <p>
              <span className="font-semibold text-slate-900">전공:</span> 경제금융학
            </p>
            <p>
              <span className="font-semibold text-slate-900">취미:</span> 게임하기
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}

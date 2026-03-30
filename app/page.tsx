export default function Home() {
  const posts = [
    {
      title: "경제 뉴스 한눈에 정리하기",
      preview: "매일 쏟아지는 경제 이슈를 핵심만 빠르게 읽는 방법을 공유합니다.",
      author: "송영선",
      date: "2026-03-25",
    },
    {
      title: "대학생을 위한 금융 습관 5가지",
      preview: "소액으로 시작할 수 있는 예산 관리와 소비 기록 루틴을 소개합니다.",
      author: "송영선",
      date: "2026-03-20",
    },
    {
      title: "게임에서 배우는 전략적 사고",
      preview: "취미인 게임을 통해 의사결정과 리스크 관리 관점을 풀어봅니다.",
      author: "송영선",
      date: "2026-03-17",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-3">YS Blog</h1>
        <nav className="flex gap-4">
          <a href="#">홈</a>
          <a href="#">글목록</a>
          <a href="#">소개</a>
        </nav>
      </header>

      <main>
        <h2 className="text-xl font-bold mb-4">최신 글</h2>
        {posts.map((post) => (
          <article
            key={post.title}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition mb-4"
          >
            <h3 className="text-lg font-bold">{post.title}</h3>
            <p className="text-gray-600 mt-2">{post.preview}</p>
            <p className="mt-3">작성자: {post.author}</p>
            <p className="text-sm text-gray-400 mt-1">
              날짜: <time dateTime={post.date}>{post.date}</time>
            </p>
          </article>
        ))}
      </main>

      <footer className="mt-8 pt-4 border-t">
        <p>Copyright 2026. YS Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}

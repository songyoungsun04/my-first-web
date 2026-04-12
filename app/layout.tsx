import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "내 블로그",
  description: "내 블로그 메인 페이지",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col">
        <nav className="bg-gray-800 text-white">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-semibold hover:text-gray-200">
              내 블로그
            </Link>
            <div className="flex items-center gap-2 text-sm font-medium">
              <Link
                href="/"
                className="rounded-md px-3 py-2 transition-colors hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                홈
              </Link>
              <Link
                href="/posts"
                className="rounded-md px-3 py-2 transition-colors hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                블로그
              </Link>
              <Link
                href="/posts/new"
                className="rounded-md px-3 py-2 transition-colors hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                새 글 쓰기
              </Link>
            </div>
          </div>
        </nav>
        <main className="max-w-4xl mx-auto p-6">{children}</main>
        <footer className="text-center text-gray-500 py-4">© 2026 내 블로그</footer>
      </body>
    </html>
  );
}

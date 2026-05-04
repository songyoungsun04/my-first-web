import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="ko" className={cn("font-sans", geist.variable)}>
      <body className="min-h-screen bg-background text-foreground flex flex-col">
        <nav className="border-b border-border bg-background">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-semibold text-foreground transition-colors hover:text-foreground/80">
              내 블로그
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">홈</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/posts">블로그</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/posts/new">새 글 쓰기</Link>
              </Button>
            </div>
          </div>
        </nav>
        <main className="max-w-4xl mx-auto p-6">{children}</main>
        <footer className="border-t border-border py-4 text-center text-sm text-muted-foreground">
          © 2026 내 블로그
        </footer>
      </body>
    </html>
  );
}

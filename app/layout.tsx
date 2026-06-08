import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AuthProvider } from "@/contexts/AuthContext";
import AuthNav from "@/components/AuthNav";

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
        <AuthProvider>
          <nav className="border-b border-border bg-background">
            <div className="mx-auto flex max-w-4xl flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/"
                className="text-lg font-semibold text-foreground transition-colors hover:text-foreground/80"
              >
                내 블로그
              </Link>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/">홈</Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/posts">블로그</Link>
                  </Button>
                </div>
                <AuthNav />
              </div>
            </div>
          </nav>
          <main className="max-w-6xl mx-auto w-full p-6">{children}</main>
          <footer className="border-t border-border py-4 text-center text-sm text-muted-foreground">
            © 2026 내 블로그
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}

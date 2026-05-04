import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  return (
    <section className="space-y-10">
      <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <p className="text-sm font-medium text-muted-foreground">
            대학생 개발 성장 블로그
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground">
            내 블로그
          </h1>
          <p className="text-base leading-7 text-muted-foreground">
            개발 과정에서 배운 내용을 차분하게 정리하고, 꾸준한 기록으로
            성장 방향을 점검하는 공간입니다.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button asChild>
              <Link href="/posts">글 목록 보기</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/posts/new">새 글 쓰기</Link>
            </Button>
          </div>
        </div>
        <Card className="border-border shadow-sm">
          <CardHeader className="px-6 pt-6">
            <CardTitle>이번 주 집중 기록</CardTitle>
            <CardDescription>
              학습 목표와 기록 흐름을 간단히 확인하세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center justify-between">
                <span>알고리즘 복습</span>
                <span className="text-foreground">진행 중</span>
              </li>
              <li className="flex items-center justify-between">
                <span>프로젝트 회고</span>
                <span className="text-foreground">정리 예정</span>
              </li>
              <li className="flex items-center justify-between">
                <span>UI 개선 아이디어</span>
                <span className="text-foreground">메모 중</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border shadow-sm">
          <CardHeader className="px-6 pt-6">
            <CardTitle>정돈된 글</CardTitle>
            <CardDescription>길지 않게 핵심만 요약합니다.</CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6 text-sm text-muted-foreground">
            코드와 생각을 함께 정리해 다시 읽기 쉽게 기록합니다.
          </CardContent>
        </Card>
        <Card className="border-border shadow-sm">
          <CardHeader className="px-6 pt-6">
            <CardTitle>꾸준한 기록</CardTitle>
            <CardDescription>작은 배움도 놓치지 않습니다.</CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6 text-sm text-muted-foreground">
            매일의 학습 로그를 남기며 성장 흐름을 추적합니다.
          </CardContent>
        </Card>
        <Card className="border-border shadow-sm">
          <CardHeader className="px-6 pt-6">
            <CardTitle>명확한 다음 단계</CardTitle>
            <CardDescription>다음 목표를 선명하게.</CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6 text-sm text-muted-foreground">
            해야 할 일을 짧게 적어 집중력을 유지합니다.
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

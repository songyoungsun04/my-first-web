export type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
};

export const posts: Post[] = [
  {
    id: 1,
    title: "첫 번째 게시글",
    content: "안녕하세요. 내 블로그의 첫 게시글입니다.",
    author: "관리자",
    date: "2026-04-10",
  },
  {
    id: 2,
    title: "두 번째 게시글",
    content: "Next.js App Router를 사용해 페이지를 구성하는 방법을 정리했습니다.",
    author: "관리자",
    date: "2026-04-11",
  },
  {
    id: 3,
    title: "세 번째 게시글",
    content: "Tailwind CSS 4로 간단한 블로그 스타일을 적용했습니다.",
    author: "관리자",
    date: "2026-04-12",
  },
];

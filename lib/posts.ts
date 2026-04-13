export type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
};

type JsonPlaceholderPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
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

function toPost(source: JsonPlaceholderPost): Post {
  return {
    id: source.id,
    title: source.title,
    content: source.body,
    author: `사용자 ${source.userId}`,
    date: "2026-04-13",
  };
}

export async function getPosts(): Promise<Post[]> {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("게시글 목록을 불러오지 못했습니다.");
    }

    const data = (await response.json()) as JsonPlaceholderPost[];
    return data.map(toPost);
  } catch {
    return posts;
  }
}

export async function getPostById(id: number): Promise<Post | undefined> {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return posts.find((item) => item.id === id);
    }

    const data = (await response.json()) as JsonPlaceholderPost;
    return toPost(data);
  } catch {
    return posts.find((item) => item.id === id);
  }
}

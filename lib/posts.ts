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
    title: "React 19 New Features Overview",
    content:
      "A quick summary of what's new in React 19, including improved actions, form handling, and streaming updates.",
    author: "Kim Coding",
    date: "2026-03-30",
  },
  {
    id: 2,
    title: "Tailwind CSS 4 Migration Notes",
    content:
      "This post covers practical migration tips, common pitfalls, and how to keep utility classes maintainable in larger projects.",
    author: "Lee Design",
    date: "2026-03-28",
  },
  {
    id: 3,
    title: "Next.js 16 App Router Guide",
    content:
      "Learn the App Router fundamentals, dynamic routes, and why awaiting params matters in the latest Next.js version.",
    author: "Park Dev",
    date: "2026-03-25",
  },
];

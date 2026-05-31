## Tech Stack

- Next.js 16.2.1 (App Router only)
- React 19.2.4
- Tailwind CSS 4
- shadcn/ui (components/ui/ 경로에 설치됨)

## Coding Conventions

- Default to Server Components unless a Client Component is required.
- Use Tailwind CSS for styling.
- Keep components simple and easy to verify.
- Prefer files inside `app/` for routes.

## Design Tokens

- Primary color: shadcn/ui --primary (어두운 파란색 계열)
- Background: --background (흰색)
- Card: shadcn/ui Card 컴포넌트 사용 (rounded-lg shadow-sm)
- Spacing: 컨텐츠 간격 space-y-6, 카드 내부 p-6
- Max width: max-w-4xl mx-auto (메인 컨텐츠)
- 반응형: md 이상 2열 그리드, 모바일 1열

## Component Rules

- UI 컴포넌트는 shadcn/ui 사용 (components/ui/)
- Button, Card, Input, Dialog 등 shadcn/ui 컴포넌트 우선
- 커스텀 컴포넌트는 components/ 루트에 배치
- Tailwind 기본 컬러 직접 사용 금지 → CSS 변수(디자인 토큰) 사용

## Known AI Mistakes

- Do not use `next/router`; use `next/navigation` when navigation is needed.
- Do not create `pages/` router files; this project uses the App Router.
- Do not add `"use client"` unless interactivity or browser APIs are actually needed.

## Ch9 Auth Rules

- Email/password only; do not add social login.
- Use `signInWithPassword`, `signUp`, `signOut`.
- Do not use legacy `auth.signIn()`.
- Use `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` only.
- Never use service_role or other secret keys in client or middleware.

## Ch10 Posts Rules

- Use `lib/supabase/client.ts` for the Supabase browser client.
- Use `useAuth` / `AuthProvider` from `contexts/AuthContext.tsx` for auth state.
- Posts columns follow Ch8 schema: `id`, `user_id`, `title`, `content`, `created_at`.
- Do not rename or replace the posts column names.
- Profiles columns follow Ch8 schema: `id`, `username`, `avatar_url`, `role`.
- App Router only; never use `next/router` or the pages router.
- Edit/Delete UI is UX only; enforce access with Ch11 RLS.

## Version Policy

- Course baseline: Next.js 16.2.1, `@supabase/supabase-js` 2.47.12, `@supabase/ssr` 0.5.2.
- Installed versions (package.json): Next.js 16.2.1, `@supabase/supabase-js` 2.105.3, `@supabase/ssr` 0.10.2.
- Keep prompts/docs on the baseline; debug build issues against installed versions.
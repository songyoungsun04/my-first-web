<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project Rules (Ch11)

- Course baseline: Next.js 16.2.1, `@supabase/supabase-js` 2.47.12, `@supabase/ssr` 0.5.2.
- Installed versions (package.json): Next.js 16.2.1, `@supabase/supabase-js` 2.105.3, `@supabase/ssr` 0.10.2.
- App Router only; do not use pages router or `next/router`.
- Auth scope: email/password only; do not add social login.
- Supabase auth: `signInWithPassword`, `signUp`, `signOut`; do not use legacy `auth.signIn()`.
- Use `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Never use service_role or other secret keys in client or middleware.
- Use `lib/supabase/client.ts` for the Supabase browser client.
- Use `useAuth` / `AuthProvider` from `contexts/AuthContext.tsx`.
- Posts columns follow Ch8 schema: `id`, `user_id`, `title`, `content`, `created_at`.
- Profiles columns follow Ch8 schema: `id`, `username`, `avatar_url`, `role`.
- Edit/Delete UI is UX only; enforce access with Ch11 RLS.
- RLS policies are managed via Supabase CLI migrations (not SQL Editor).
- posts RLS policies use `user_id = auth.uid()`.
- Dashboard menu labels follow 2026-05 UI.

@AGENTS.md

## Claude Notes (Ch11)

- Keep auth scope to email/password only.
- App Router only; do not use pages router or `next/router`.
- Use `signInWithPassword` and avoid legacy `auth.signIn()`.
- Use `lib/supabase/client.ts` for the Supabase browser client.
- Use `useAuth` / `AuthProvider` from `contexts/AuthContext.tsx`.
- Posts columns follow Ch8 schema: `id`, `user_id`, `title`, `content`, `created_at`.
- Profiles columns follow Ch8 schema: `id`, `username`, `avatar_url`, `role`.
- Edit/Delete UI is UX only; enforce access with Ch11 RLS.
- RLS policies are managed via Supabase CLI migrations (not SQL Editor).
- posts RLS policies use `user_id = auth.uid()`.
- Never use service_role or other secret keys in client or middleware.
- Follow course baseline versions; if `package.json` differs, note both.

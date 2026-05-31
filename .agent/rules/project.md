# Project Rules

- App Router only; no pages router or next/router.
- Auth scope: email/password only.
- Use signInWithPassword, signUp, signOut; no auth.signIn().
- Use NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.
- Never use service_role or other secret keys in client or middleware.
- Use lib/supabase/client.ts for the Supabase browser client.
- Use useAuth/AuthProvider from contexts/AuthContext.tsx.
- Posts columns follow Ch8 schema: id, user_id, title, content, created_at.
- Profiles columns follow Ch8 schema: id, username, avatar_url, role.
- Edit/Delete UI is UX only; enforce access with Ch11 RLS.
- Course baseline: Next.js 16.2.1, @supabase/supabase-js 2.47.12, @supabase/ssr 0.5.2.
- Installed versions: Next.js 16.2.1, @supabase/supabase-js 2.105.3, @supabase/ssr 0.10.2.
- Dashboard menu labels follow 2026-05 UI.

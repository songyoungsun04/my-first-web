# Project Rules

- App Router only; no pages router or next/router.
- Auth scope: email/password only.
- Use signInWithPassword, signUp, signOut; no auth.signIn().
- Use NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.
- Never use service_role or other secret keys in client or middleware.
- Course baseline: Next.js 16.2.1, @supabase/supabase-js 2.47.12, @supabase/ssr 0.5.2.
- Dashboard menu labels follow 2026-05 UI.

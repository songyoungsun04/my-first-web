<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project Rules (Ch9)

- Course baseline: Next.js 16.2.1, `@supabase/supabase-js` 2.47.12, `@supabase/ssr` 0.5.2.
- App Router only; do not use pages router or `next/router`.
- Auth scope: email/password only; do not add social login.
- Supabase auth: `signInWithPassword`, `signUp`, `signOut`; do not use legacy `auth.signIn()`.
- Use `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Dashboard menu labels follow 2026-05 UI.

# Copilot Instructions

## Tech Stack
- Framework: Next.js 16.2.1
- Styling: Tailwind CSS ^4
- Routing: App Router ONLY (`app/` directory)

## Coding Conventions
- Use Server Components by default.
- Use Tailwind CSS only for styling.

## Known AI Mistakes
- Do not use `next/router`; use `next/navigation` instead.
- Do not use Pages Router (`pages/` directory); use App Router only.
- Always `await` `params` before using route params.

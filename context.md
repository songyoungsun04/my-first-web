# Context — my-first-web 프로젝트 상태

## 현재 상태

- 마지막 작업일: 2026-04-29
- 완료된 작업: 홈 페이지, 헤더/푸터 레이아웃, 포스트 목록, 데이터베이스 스키마 초안
- 진행 중: 포스트 상세 페이지 (UI 완료, 데이터 연결 미완)
- 미착수: 마이페이지

## 변경 파일

- ARCHITECTURE.md: 컴포넌트 구조/데이터 모델 보강
- docs/supabase-schema.sql: Supabase용 스키마 SQL 추가
- todo.md: 진행률 반영

## 기술 결정 사항

- 인증: Supabase Auth (Email)
- 상태관리: React Context (AuthProvider)
- 이미지: Supabase Storage 사용 예정

## 해결된 이슈

- shadcn/ui Button variant가 디자인 토큰과 불일치 → globals.css의 --primary 수정으로 해결
- 모바일 헤더 메뉴가 겹침 → Sheet 컴포넌트로 교체

## 알게 된 점

- Tailwind CSS 4 기준에서는 `@import "tailwindcss"` + `@theme` 블록으로 설정 (`tailwind.config.js` 불필요)
- Server Component에서 useRouter 사용 불가 → redirect() 사용
- Supabase 스키마는 UUID PK, 역할(role) 체크, FK on delete cascade를 기본으로 잡는 편이 안전
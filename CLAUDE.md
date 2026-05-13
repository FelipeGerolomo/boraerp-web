# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Next.js dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — Biome check (lint + import sorting)
- `npm run format` — Biome format with `--write`

There is no test setup in this repo yet.

## Stack & conventions

- **Next.js 16 App Router** with React 19 and TypeScript (strict). RSC is enabled (`components.json` `"rsc": true`) — files using hooks, event handlers, or browser APIs need `"use client"`.
- **Tailwind CSS v4** — no `tailwind.config.js`; theme tokens live in `src/app/globals.css` (`@theme inline`). Edit that file for design tokens, never create a new CSS config.
- **Biome** (not ESLint/Prettier) for lint + format: 2-space indent, organize-imports on. Next.js and React lint domains are enabled.
- Path alias: `@/*` → `src/*`.
- `cn()` from `@/lib/utils` (clsx + tailwind-merge) for conditional classes.

## Required libraries

Use the libraries already installed rather than introducing alternatives:
- **Zod** (`zod` v4) — all schema definitions, parsing, and validation.
- **TanStack tools** — `@tanstack/react-query` for server state/data fetching, `@tanstack/react-form` (+ `@tanstack/react-form-nextjs`) for forms (wire validation through Zod), and `@tanstack/react-table` for tables. The matching devtools packages are installed too.

## UI components — shadcn/ui

This project is initialized with shadcn/ui (`base-luma` style, `base` primitive library — `@base-ui/react`, not Radix; `lucide-react` icons). Components are vendored as source under `src/components/ui/`. A nearly-complete set is already installed — check `src/components/ui/` before adding anything.

Key implications of the `base` primitive library (differs from Radix examples found online):
- Custom triggers use `render={<Button />}` (not `asChild`). Add `nativeButton={false}` when `render` is a non-button element.
- `Select` requires an `items` prop on the root; placeholder is a `{ value: null }` item, not a `placeholder` prop.
- `ToggleGroup` / `Accordion` use a `multiple` boolean (not `type="single|multiple"`); `defaultValue` is always an array.
- `Slider` accepts a plain number for a single thumb.

When working with shadcn components, use the CLI (`npx shadcn@latest docs <component>`, `add`, `search`) rather than guessing APIs. The full shadcn skill rules are in `.agents/skills/shadcn/` — notable ones: use semantic color tokens (`bg-primary`, `text-muted-foreground`) not raw colors; `className` for layout only, never to override component colors/typography; forms use `FieldGroup`/`Field`; `flex gap-*` not `space-x/y-*`; `size-*` when width == height; icons in buttons use `data-icon="inline-start|inline-end"` with no sizing classes.

## Layout

`src/app/layout.tsx` wires three fonts as CSS variables: Geist (`--font-geist-sans`), Geist Mono (`--font-geist-mono`), and Inter (`--font-sans`, the active body font).

## Authentication standards

- Auth feature code lives under `src/auth/`:
  - `api/` for request schemas and browser-side auth client calls to local route handlers.
  - `components/` for auth forms and authenticated session provider.
  - `hooks/` for session hooks (`useAuthSession`).
  - `server/` for backend-auth service wrappers and route error mapping.
  - `types/` for DTO/session typing sourced from `docs/api-docs.json`.
- Backend calls use the centralized server API client in `src/lib/api/` (`apiRequest`) with:
  - `API_BASE_URL` (or fallback `NEXT_PUBLIC_API_BASE_URL`) from environment variables.
  - normalized JSON parsing and `ProblemDetail`-aware error mapping.
  - shared authorization header injection through the `token` option.
- Session storage strategy:
  - use secure, HTTP-only cookies (`bora_access_token`, `bora_auth_session`, `bora_pending_company`).
  - never store auth/session tokens in `localStorage`.
  - all cookie reads/writes are centralized in `src/lib/session/cookies.ts`.
- Route protection strategy:
  - `middleware.ts` handles anonymous/authenticated/pending-company redirects for `/`, `/login`, `/signup`, `/select-company`, and `/dashboard/*`.
  - dashboard layout enforces authenticated session server-side and injects `AuthSessionProvider`.
- Multi-company authentication flow:
  - login can return direct auth (single company) or pending company selection (multi-company).
  - pending session uses short-lived HTTP-only cookie with `sessionToken` + allowed companies.
  - `/select-company` finalizes authentication and creates company-scoped access token session.
- Company switching behavior:
  - company switcher in `src/components/sidebar/company-switcher.tsx` calls `/api/auth/switch-company`.
  - on success, current company and access token are replaced and app state refreshes.
- Logout behavior:
  - client calls `/api/auth/logout`, backend revoke is attempted, and frontend session cookies are always cleared.
  - user is redirected to `/login` after logout.
- Form validation standard:
  - use `zod` schemas from `src/auth/api/schemas.ts` as the single validation source.
  - display field-level errors using shadcn `FieldError` and form-level errors via `Alert`.
- Shadcn auth UI expectations:
  - forms must use `FieldGroup` + `Field` composition.
  - prefer semantic tokens and variants (no raw color overrides).
  - use existing `Card`, `Button`, `Input`, `Alert`, and `Spinner` components for consistency.

## Product UI standards

- Product feature code should live under `src/features/product/` with:
  - `api/` for typed product client/server calls and request schemas.
  - `hooks/` for TanStack Query data/mutation hooks (`useProducts`, `useProduct`, etc).
  - `components/` for product list/table, tab-based form, and tab-based detail UI.
  - `types/` for product DTOs and lookup option types.
- Product contracts must come from `docs/api-docs.json`; avoid guessing endpoint names or payload keys.
- Product form UX must be tab-based and aligned with Bora ERP ERP-style layout:
  - tabs: Dados gerais, Dados complementares, Ficha técnica, Anúncios, Kits, Preços, Custos, Outros.
  - only product name is required for initial create.
  - first create should persist minimal payload and then save additional tab payloads if fields were filled.
  - independent tab saves for edit flow (save current tab only).
- Product detail view must reuse the same tab structure in read-only mode (no raw JSON dumps).
- Required frontend stack for product screens:
  - TanStack Form for form state.
  - TanStack Query for API state and mutations.
  - TanStack Table for product list rendering.
  - shadcn/ui components for UI composition.
- Keep active tab in URL query param (`?tab=...`) when practical for form/detail screens.

### Product reference data TODO

- `docs/api-docs.json` currently does not expose dedicated lookup endpoints for:
  - product types/status
  - SPED item types
  - origin codes
  - units/package types
  - marketplace channels
  - price lists
  - categories/brands
- Until backend lookup endpoints are available, maintain temporary centralized fallback options in `src/features/product/types/lookups.ts`. Do not duplicate hardcoded options across components.

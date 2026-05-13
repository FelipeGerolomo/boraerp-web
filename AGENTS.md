# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

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

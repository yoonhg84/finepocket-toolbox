# FinePocket Toolbox — Codex Agent Instructions

## Project Overview

Free online utility toolbox (28 tools) built with Next.js 14 + Tailwind CSS. All processing is client-side — no data sent to servers. Deployed on Vercel at https://toolbox.finepocket.app.

## Tech Stack

- Next.js 14 (App Router), React 18, TypeScript
- Tailwind CSS 3.4 with `darkMode: "class"`
- chart.js + react-chartjs-2 (finance tools only)
- i18n: 7 languages (en, ko, ja, de, es, fr, pt)

## Project Structure

```
src/
├── app/[lang]/           # Pages (i18n dynamic routes)
│   ├── developer/        # Developer tool pages (individual page.tsx per tool)
│   ├── text/             # Text tool pages (individual page.tsx per tool)
│   ├── calculators/      # Calculator pages ([slug] dynamic route)
│   └── finance/          # Finance tool pages
├── components/
│   ├── layout/           # Header, Footer, LocaleProvider
│   ├── tool/             # ToolPageLayout, ToolCard
│   └── ui/               # CopyButton, FileUpload, etc.
├── tools/                # Individual tools (each: content.ts + logic.ts + Tool.tsx)
├── lib/                  # seo.ts, tools-registry.ts
├── i18n/                 # Localization config & messages
└── content/              # Localized tool page content
```

## Critical Rules

### 1. Dark Mode (MANDATORY)
Every Tailwind color class MUST have a corresponding `dark:` variant. Examples:
```
bg-white dark:bg-gray-900
text-gray-900 dark:text-gray-100
border-gray-200 dark:border-gray-700
hover:bg-gray-50 dark:hover:bg-gray-700
```
Never use inline color styles. Never omit dark variants.

### 2. i18n
- Tool UI text: use `getToolUiText(locale)` from `src/tools/ui-text.ts`
- Layout text: use `useI18n()` hook from `src/components/layout/LocaleProvider`
- content.ts SEO content: English hardcoded (migration planned)
- Add Korean (KO) and Japanese (JA) translations at minimum for new UI strings

### 3. Tool Architecture
Each tool lives in `src/tools/<slug>/` with exactly 3 files:
- `content.ts` — SEO content (`ToolContent` type from `@/lib/seo`)
- `logic.ts` — Pure functions only. No React. No side effects.
- `<Name>Tool.tsx` — `"use client"` directive. Named export (not default).

### 4. Adding a New Tool
1. Create `src/tools/<slug>/` directory with 3 files
2. Register in `src/lib/tools-registry.ts` (`ALL_TOOLS` array)
3. Create route page under `src/app/[lang]/<category>/<slug>/page.tsx`
   - For calculators: register in `src/app/[lang]/calculators/[slug]/page.tsx`
4. Add KO/JA translations in `src/tools/ui-text.ts`
5. Verify: `npm run build`

### 5. Code Standards
- No unused imports or variables (ESLint enforced)
- No `any` types unless necessary
- Prefer Web APIs over npm packages
- All data processing client-side (no server endpoints except currency API proxy)

## Tools (28 total)

**Developer (11):** json-formatter, base64, jwt-decoder, url-encoder, regex-tester, hash-generator, password-generator, diff-checker, color-picker, timestamp-converter, qr-code

**Text (6):** word-counter, case-converter, lorem-ipsum, markdown-preview, ascii-art, emoji-picker

**Calculators (8):** percentage-calculator, tip-calculator, age-calculator, data-converter, unit-converter, bmi-calculator, date-calculator, random-picker

**Finance (3):** loan-calculator, compound-interest, currency-converter

## Build & Verify

```bash
npm install
npm run dev          # Development server
npm run build        # Production build (TypeScript + ESLint)
```

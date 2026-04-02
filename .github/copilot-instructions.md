# FinePocket Toolbox — Copilot / Codex Instructions

## Project Overview

Free online utility toolbox (28 tools) built with Next.js 14 + Tailwind CSS. All processing is client-side. Deployed on Vercel at https://toolbox.finepocket.app.

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
│   └── finance/          # Finance tool pages (individual + legacy redirects)
├── components/
│   ├── layout/           # Header, Footer, LocaleProvider
│   ├── tool/             # ToolPageLayout, ToolCard
│   └── ui/               # CopyButton, FileUpload, etc.
├── tools/                # Individual tools
│   └── <slug>/           # Each tool has 3 files:
│       ├── content.ts    # SEO content (ToolContent type)
│       ├── logic.ts      # Pure logic functions (no React)
│       └── <Name>Tool.tsx # "use client" component (named export)
├── lib/                  # seo.ts, tools-registry.ts, copy-to-clipboard.ts
├── i18n/                 # Localization config & messages
└── content/              # Localized tool page content
```

## Critical Rules

### Dark Mode (MANDATORY)
Every Tailwind color class MUST have a `dark:` variant:
- `bg-white dark:bg-gray-900`
- `text-gray-900 dark:text-gray-100`
- `border-gray-200 dark:border-gray-700`
- `hover:bg-gray-50 dark:hover:bg-gray-700`

Never use inline styles for colors. Never use hardcoded color values.

### i18n
- UI text in tool components: use `getToolUiText(locale)` from `src/tools/ui-text.ts`
- Layout/shared text: use `useI18n()` hook from `src/components/layout/LocaleProvider`
- SEO content in `content.ts` files: English hardcoded (will migrate later)
- Supported locales: en, ko, ja, de, es, fr, pt

### Tool Architecture
- `logic.ts`: Pure functions only. No React imports. No side effects.
- `<Name>Tool.tsx`: Must start with `"use client"`. Named export (not default).
- `content.ts`: Export `content` of type `ToolContent` from `@/lib/seo`.
- All tools registered in `src/lib/tools-registry.ts` (`ALL_TOOLS` array).

### Adding a New Tool
1. Create `src/tools/<slug>/` with content.ts, logic.ts, <Name>Tool.tsx
2. Register in `src/lib/tools-registry.ts`
3. Create route page:
   - developer/text: `src/app/[lang]/<category>/<slug>/page.tsx`
   - calculators: register in `src/app/[lang]/calculators/[slug]/page.tsx`
4. Add translations in `src/tools/ui-text.ts` (KO and JA at minimum)
5. Verify with `npm run build`

## Current Tools (28)

### Developer (11): json-formatter, base64, jwt-decoder, url-encoder, regex-tester, hash-generator, password-generator, diff-checker, color-picker, timestamp-converter, qr-code
### Text (6): word-counter, case-converter, lorem-ipsum, markdown-preview, ascii-art, emoji-picker
### Calculators (8): percentage-calculator, tip-calculator, age-calculator, data-converter, unit-converter, bmi-calculator, date-calculator, random-picker
### Finance (3): loan-calculator, compound-interest, currency-converter

## Code Quality
- `npm run build` must pass (includes TypeScript + ESLint checks)
- No unused imports or variables
- No `any` types unless absolutely necessary
- Prefer Web APIs over npm packages (e.g., crypto.subtle for hashing)

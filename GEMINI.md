# FinePocket Toolbox — Gemini Instructions

## Project Overview

Free online utility toolbox (28 tools) built with Next.js 14 + Tailwind CSS. All processing happens client-side — no data leaves the user's browser. Deployed on Vercel at https://toolbox.finepocket.app.

## Tech Stack

- Next.js 14 (App Router), React 18, TypeScript
- Tailwind CSS 3.4 with `darkMode: "class"`
- chart.js + react-chartjs-2 (finance tools only)
- i18n: 7 languages (en, ko, ja, de, es, fr, pt)

## Project Structure

```
src/
├── app/[lang]/           # Pages with i18n dynamic routing
│   ├── developer/        # 11 developer tool pages
│   ├── text/             # 6 text tool pages
│   ├── calculators/      # 8 calculator pages ([slug] dynamic route)
│   └── finance/          # 3 finance tool pages
├── components/
│   ├── layout/           # Header, Footer, LocaleProvider
│   ├── tool/             # ToolPageLayout, ToolCard
│   └── ui/               # CopyButton, FileUpload, etc.
├── tools/                # Individual tools
│   └── <slug>/           # Each tool: content.ts + logic.ts + <Name>Tool.tsx
├── lib/                  # Utilities (seo.ts, tools-registry.ts)
├── i18n/                 # Localization infrastructure
└── content/              # Localized tool page content
```

## Mandatory Rules

### Dark Mode
This project uses Tailwind `darkMode: "class"`. Every color-related Tailwind class MUST include a `dark:` variant.

Required patterns:
- `bg-white dark:bg-gray-900`
- `text-gray-900 dark:text-gray-100`
- `border-gray-200 dark:border-gray-700`
- `hover:bg-gray-50 dark:hover:bg-gray-700`

Do NOT use inline color styles. Do NOT omit dark mode variants.

### i18n (Localization)
- Supported languages: en, de, ja, es, fr, pt, ko
- Tool UI text: use `getToolUiText(locale)` from `src/tools/ui-text.ts`
- Layout/shared text: use `useI18n()` from `src/components/layout/LocaleProvider`
- content.ts SEO content is English-only for now
- New UI strings require at least Korean and Japanese translations

### Tool File Structure
Each tool consists of exactly 3 files in `src/tools/<slug>/`:

| File | Purpose | Key Rule |
|------|---------|----------|
| `content.ts` | SEO content | Exports `content: ToolContent` |
| `logic.ts` | Business logic | Pure functions, no React imports |
| `<Name>Tool.tsx` | UI component | `"use client"`, named export |

### Adding a New Tool
1. Create `src/tools/<slug>/` with the 3 files above
2. Add entry to `ALL_TOOLS` in `src/lib/tools-registry.ts`
3. Create page route:
   - developer/text categories: `src/app/[lang]/<category>/<slug>/page.tsx`
   - calculators category: register in `src/app/[lang]/calculators/[slug]/page.tsx`
4. Add KO/JA translations in `src/tools/ui-text.ts`
5. Run `npm run build` to verify

## All Tools (28)

### Developer Tools (11)
json-formatter, base64, jwt-decoder, url-encoder, regex-tester, hash-generator, password-generator, diff-checker, color-picker, timestamp-converter, qr-code

### Text Tools (6)
word-counter, case-converter, lorem-ipsum, markdown-preview, ascii-art, emoji-picker

### Calculators (8)
percentage-calculator, tip-calculator, age-calculator, data-converter, unit-converter, bmi-calculator, date-calculator, random-picker

### Finance (3)
loan-calculator, compound-interest, currency-converter

## Build Commands

```bash
npm install          # Install dependencies
npm run dev          # Development server (http://localhost:3000)
npm run build        # Production build with TypeScript + ESLint checks
```

## Code Quality Standards
- `npm run build` must pass cleanly
- No unused imports or variables
- No `any` types unless absolutely necessary
- Prefer native Web APIs over npm packages
- All tool logic must be client-side (exception: currency exchange rate API proxy)

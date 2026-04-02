# FinePocket Toolbox

Free online utility tools built with Next.js 14 and Tailwind CSS. All tools run entirely in your browser — no data is sent to any server.

**Live:** https://toolbox.finepocket.app

## Tools (28)

### Developer Tools
JSON Formatter, Base64 Encoder/Decoder, JWT Decoder, URL Encoder/Decoder, Regex Tester, Hash Generator, Password Generator, Text Diff Checker, Color Picker, Timestamp Converter, QR Code Generator

### Text Tools
Word/Character Counter, Case Converter, Lorem Ipsum Generator, Markdown Previewer, ASCII Art Generator, Emoji Picker

### Calculators
Percentage Calculator, Tip Calculator, Age Calculator, Data Storage Converter, Unit Converter, BMI Calculator, Date Calculator, Random Decision Maker

### Finance
Loan Calculator, Compound Interest Calculator, Currency Converter

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3.4 (dark mode support)
- **Charts:** chart.js + react-chartjs-2
- **i18n:** 7 languages (en, ko, ja, de, es, fr, pt)
- **Deployment:** Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project Structure

```
src/
├── app/[lang]/        # Pages (i18n dynamic routes)
├── components/        # Shared UI components
│   ├── layout/        # Header, Footer, LocaleProvider
│   ├── tool/          # ToolPageLayout, ToolCard
│   └── ui/            # CopyButton, FileUpload, etc.
├── tools/             # Individual tools
│   └── <slug>/        # Tool.tsx + content.ts + logic.ts
├── lib/               # Utilities (seo, tools-registry)
├── i18n/              # Localization config & messages
└── content/           # Localized tool page content
```

## Adding a New Tool

1. Create `src/tools/<slug>/` with three files:
   - `content.ts` — SEO content (title, description, FAQ)
   - `logic.ts` — Pure logic functions (no React)
   - `<Name>Tool.tsx` — Client component (`"use client"`, named export)
2. Register in `src/lib/tools-registry.ts`
3. Create route page under `src/app/[lang]/<category>/<slug>/page.tsx`
4. Add Korean/Japanese translations in `src/tools/ui-text.ts`
5. Verify with `npm run build`

## License

Private — All rights reserved.

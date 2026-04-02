# FinePocket Toolbox

Privacy-first online tools — all processing in your browser.

**https://toolbox.finepocket.app**

## 28 Tools

**Developer (11):** JSON Formatter · Base64 · JWT Decoder · URL Encoder · Regex Tester · Hash Generator · Password Generator · Diff Checker · Color Picker · Timestamp Converter · QR Code

**Text (6):** Word Counter · Case Converter · Lorem Ipsum · Markdown Preview · ASCII Art · Emoji Picker

**Calculators (8):** Percentage · Tip · Age · Data Storage · Unit Converter · BMI · Date Calculator · Random Picker

**Finance (3):** Loan · Compound Interest · Currency Converter

## Stack

Next.js 14 · React 18 · TypeScript · Tailwind CSS 3.4 · Chart.js · Vercel · 7 languages (en ko ja de es fr pt)

## Dev

```bash
npm install && npm run dev   # localhost:3000
npm run build                # typecheck + lint + build
```

## Structure

```
src/tools/<slug>/        ← content.ts + logic.ts + <Name>Tool.tsx
src/app/[lang]/<cat>/    ← page routes (i18n dynamic)
src/lib/tools-registry.ts ← tool metadata registry
src/tools/ui-text.ts     ← KO/JA translations
```

## Add a Tool

1. Create `src/tools/<slug>/` — `content.ts`, `logic.ts`, `<Name>Tool.tsx`
2. Register in `tools-registry.ts`
3. Add page route in `src/app/[lang]/<category>/<slug>/page.tsx`
4. Add translations in `ui-text.ts`
5. `npm run build`

## Rules

- All Tailwind colors need `dark:` variant
- UI text via `getToolUiText(locale)`, not hardcoded
- `logic.ts` = pure functions, no React
- Prefer Web APIs over npm packages

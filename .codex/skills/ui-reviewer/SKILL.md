---
name: ui-reviewer
description: Review UI changes in FinePocket Toolbox for dark mode coverage and i18n readiness. Use when TSX/CSS files changed, new UI text was added, or the user asks for a UI audit of Tailwind classes, hardcoded strings, or localization keys.
---

# UI Reviewer

Use this skill after UI or content-facing component changes. The goal is to catch missing dark mode support, hardcoded UI copy, and missing i18n wiring before the change ships.

## When To Use

Use this skill when:

- TSX, TS, or CSS files changed in `src/app`, `src/components`, or `src/tools`
- a new tool or UI component was added
- button labels, placeholders, helper text, headings, or error messages changed
- the user explicitly asks for a dark mode or i18n review

## Review Workflow

1. Determine the review scope.
   Prefer the user-provided file list. If none is provided, inspect the current diff and focus on changed `.tsx`, `.ts`, and `.css` files.

2. Run the repository checks first.
   Use the existing scripts as fast heuristics, then manually confirm each finding.

   ```bash
   bash scripts/check-dark-mode.sh <file-or-directory>
   bash scripts/check-i18n-keys.sh <file-or-directory>
   ```

3. Perform a manual dark mode review.
   Check for light-only Tailwind classes such as `bg-*`, `text-*`, `border-*`, `shadow-*`, `hover:*`, and `focus:*` that need dark counterparts.

4. Perform a manual i18n review.
   Check for hardcoded UI strings in TSX files and confirm new keys exist in `src/i18n/messages/en.json`.

5. Produce a concise report with file and line references.
   Include only real issues. If nothing is wrong, say so explicitly.

## Dark Mode Checks

Flag these patterns when they do not have an appropriate dark mode treatment:

- `bg-white` or `bg-gray-*` without `dark:bg-*`
- `text-gray-*` or other text color classes without `dark:text-*`
- `border-gray-*` or other border color classes without `dark:border-*`
- `shadow-*` that becomes visually wrong on dark backgrounds
- `hover:bg-*` or `focus:*` styles without a matching `dark:hover:*` or `dark:focus:*`
- inline colors such as `style={{ color: "#..." }}` or `style={{ backgroundColor: "#..." }}`

Review the actual visual intent, not just token presence. A `dark:` variant should preserve contrast and hierarchy, not merely exist.

## i18n Checks

Flag these patterns:

- hardcoded button labels, headings, helper text, placeholders, and validation messages in TSX
- new UI text added to a tool without being routed through the project's content or i18n structure
- missing keys in `src/i18n/messages/en.json` for newly added UI copy

Do not flag these by default:

- English SEO or long-form tool copy inside `src/tools/*/content.ts`
- `className`, `id`, `key`, `href`, and similar technical attribute values
- stable icon or SVG attributes unless they surface as visible UI text

## Project Rules

- This project uses Tailwind `darkMode: "class"`. New UI work should include `dark:` variants at authoring time.
- `src/tools/*/content.ts` is currently allowed to contain English content directly.
- When `src/app/globals.css` changes, verify `@apply` rules still include dark mode handling where needed.
- New UI should follow the existing dark mode patterns used in components such as `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`, and `src/components/layout/ThemeToggle.tsx`.

## Report Format

Use this structure:

```md
## UI Review Report

### Dark Mode
- ✅ No dark mode issues found
- ⚠️ [file:line] `bg-gray-100` is missing a `dark:bg-*` counterpart
- ❌ [file:line] Inline color style breaks dark mode theming

### i18n
- ✅ No i18n issues found
- ⚠️ [file:line] Hardcoded string `"Submit"` should move to i18n or tool content
- 💡 Add key to `src/i18n/messages/en.json`: `common.submit`

### Summary
- Pass
- Found N issues
```

When possible, include a concrete fix suggestion next to each issue.

#!/bin/bash
# Check for common Tailwind color classes missing dark: variants
# Usage: ./scripts/check-dark-mode.sh [file-or-directory]

set -euo pipefail

TARGET="${1:-src}"
ISSUES=0

# Patterns: light-mode color classes that should have dark: counterparts
# We look for bg-{color}, text-{color}, border-{color} without a nearby dark: variant
echo "=== Dark Mode Check ==="
echo "Scanning: $TARGET"
echo ""

# Find files with Tailwind classes
while IFS= read -r file; do
  line_num=0
  while IFS= read -r line; do
    line_num=$((line_num + 1))

    # Skip comments and imports
    [[ "$line" =~ ^[[:space:]]*(//|\*|import|from) ]] && continue

    # Check for bg-{color} without dark:bg- on the same className string
    if echo "$line" | grep -qE 'bg-(white|gray|blue|red|green|yellow|orange|purple|pink|indigo|slate|zinc|neutral|stone|amber|lime|emerald|teal|cyan|sky|violet|fuchsia|rose)-[0-9]' && \
       ! echo "$line" | grep -qE 'dark:bg-'; then
      echo "WARN: $file:$line_num - bg-color without dark:bg- variant"
      ISSUES=$((ISSUES + 1))
    fi

    # Check for text-{color} without dark:text-
    if echo "$line" | grep -qE 'text-(gray|blue|red|green|yellow|orange|purple|pink|indigo|slate|zinc|neutral|stone|amber|lime|emerald|teal|cyan|sky|violet|fuchsia|rose)-[0-9]' && \
       ! echo "$line" | grep -qE 'dark:text-'; then
      echo "WARN: $file:$line_num - text-color without dark:text- variant"
      ISSUES=$((ISSUES + 1))
    fi

    # Check for border-{color} without dark:border-
    if echo "$line" | grep -qE 'border-(gray|blue|red|green|yellow|orange|purple|pink|indigo|slate|zinc|neutral|stone|amber|lime|emerald|teal|cyan|sky|violet|fuchsia|rose)-[0-9]' && \
       ! echo "$line" | grep -qE 'dark:border-'; then
      echo "WARN: $file:$line_num - border-color without dark:border- variant"
      ISSUES=$((ISSUES + 1))
    fi

  done < "$file"
done < <(find "$TARGET" -name '*.tsx' -o -name '*.ts' -o -name '*.css' | grep -v node_modules | grep -v '.d.ts')

echo ""
if [ $ISSUES -eq 0 ]; then
  echo "OK: No dark mode issues found."
else
  echo "FOUND: $ISSUES potential dark mode issues."
fi

exit 0

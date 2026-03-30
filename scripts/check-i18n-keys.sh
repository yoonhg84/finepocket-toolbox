#!/bin/bash
# Check for hardcoded UI strings in TSX files that should use i18n
# Usage: ./scripts/check-i18n-keys.sh [file-or-directory]

set -euo pipefail

TARGET="${1:-src}"
ISSUES=0

echo "=== i18n Key Check ==="
echo "Scanning: $TARGET"
echo ""

# Check for hardcoded strings in JSX (common patterns)
while IFS= read -r file; do
  line_num=0
  while IFS= read -r line; do
    line_num=$((line_num + 1))

    # Skip imports, types, interfaces, comments
    [[ "$line" =~ ^[[:space:]]*(import|from|export|type|interface|//|\*|const.*=.*\{) ]] && continue

    # Skip content.ts files (these ARE the content source)
    [[ "$file" == */content.ts ]] && continue

    # Skip logic.ts files
    [[ "$file" == */logic.ts ]] && continue

    # Skip metadata/seo files
    [[ "$file" == */seo.ts ]] && continue

    # Check for hardcoded button/label text in JSX like >Text< or >{" "}Text
    if echo "$line" | grep -qE '>[A-Z][a-z]{2,}[^<{]*</' 2>/dev/null; then
      # Skip className, href, src attributes
      if ! echo "$line" | grep -qE '(className|href|src|alt|aria-label|viewBox|strokeLinecap|strokeLinejoin|fill|stroke|xmlns)='; then
        echo "INFO: $file:$line_num - Potential hardcoded UI string"
        ISSUES=$((ISSUES + 1))
      fi
    fi

  done < "$file"
done < <(find "$TARGET" -name '*.tsx' | grep -v node_modules | grep -v '.d.ts')

echo ""
if [ $ISSUES -eq 0 ]; then
  echo "OK: No obvious hardcoded strings found."
else
  echo "FOUND: $ISSUES potential hardcoded strings to consider for i18n."
  echo "(Note: Some may be intentional - review each case)"
fi

exit 0

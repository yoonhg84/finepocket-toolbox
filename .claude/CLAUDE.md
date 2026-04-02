# FinePocket Toolbox

Next.js 14 + Tailwind CSS 기반 무료 온라인 도구 모음 웹앱 (28개 도구).

## 프로젝트 구조
- `src/app/[lang]/` - Next.js App Router 페이지 (i18n 동적 라우트)
- `src/components/` - 공통 UI 컴포넌트 (layout/, ui/, tool/)
- `src/tools/` - 개별 도구 (각 도구는 `[Name]Tool.tsx`, `content.ts`, `logic.ts`로 구성)
- `src/lib/` - 유틸리티 (seo.ts, tools-registry.ts 등)
- `src/i18n/` - 지역화 인프라 (config, messages)
- `src/content/` - 도구 페이지 로컬라이즈 콘텐츠

## 도구 목록 (28개)

### Developer Tools (11개)
- JSON Formatter / Validator (`json-formatter`)
- Base64 Encoder / Decoder (`base64`)
- JWT Decoder (`jwt-decoder`)
- URL Encoder / Decoder (`url-encoder`)
- Regex Tester (`regex-tester`)
- Hash Generator (`hash-generator`)
- Password Generator (`password-generator`)
- Text Diff Checker (`diff-checker`)
- Color Picker / Converter (`color-picker`)
- Timestamp Converter (`timestamp-converter`)
- QR Code Generator (`qr-code`)

### Text Tools (6개)
- Word / Character Counter (`word-counter`)
- Case Converter (`case-converter`)
- Lorem Ipsum Generator (`lorem-ipsum`)
- Markdown Previewer (`markdown-preview`)
- ASCII Art Generator (`ascii-art`)
- Emoji Picker (`emoji-picker`)

### Calculators (8개)
- Percentage Calculator (`percentage-calculator`)
- Tip Calculator (`tip-calculator`)
- Age Calculator (`age-calculator`)
- Data Storage Converter (`data-converter`)
- Unit Converter (`unit-converter`)
- BMI Calculator (`bmi-calculator`)
- Date Calculator (`date-calculator`)
- Random Decision Maker (`random-picker`)

### Finance (3개)
- Loan Calculator (`loan-calculator`)
- Compound Interest Calculator (`compound-interest`)
- Currency Converter (`currency-converter`)

## 필수 규칙

### Dark Mode
이 프로젝트는 Tailwind `darkMode: "class"` 전략을 사용합니다.
**모든 UI 변경 시 반드시 `dark:` variant를 함께 작성하세요.**

패턴 예시:
- `bg-white dark:bg-gray-900`
- `text-gray-900 dark:text-gray-100`
- `border-gray-200 dark:border-gray-700`
- `hover:bg-gray-50 dark:hover:bg-gray-700`

### i18n (지역화)
지원 언어: en, de, ja, es, fr, pt, ko

UI에 새 텍스트를 추가할 때:
1. 하드코딩 대신 `src/i18n/messages/en.json`에 키를 추가
2. 컴포넌트에서는 해당 키를 참조
3. content.ts의 SEO 콘텐츠는 현재 영어 직접 작성 (추후 i18n 전환 예정)

### UI 변경 후 자동 리뷰
TSX/CSS 파일을 수정한 뒤에는 **ui-reviewer 서브에이전트**를 실행하여 dark mode와 i18n 준수 여부를 검증하세요.

```
# 서브에이전트 호출 예시
Agent(subagent_type="ui-reviewer", prompt="다음 파일들의 UI 변경을 검토해주세요: [파일 목록]")
```

### 검증 스크립트
```bash
# Dark mode 누락 체크
./scripts/check-dark-mode.sh src/

# i18n 하드코딩 문자열 체크
./scripts/check-i18n-keys.sh src/
```

## 새 도구 추가 방법

1. `src/tools/<slug>/` 디렉토리 생성 (3개 파일):
   - `content.ts` - SEO 콘텐츠 (`ToolContent` 타입)
   - `logic.ts` - 순수 로직 함수 (React 의존 없음)
   - `<Name>Tool.tsx` - `"use client"` 컴포넌트 (named export)
2. `src/lib/tools-registry.ts`의 `ALL_TOOLS`에 도구 등록
3. 라우트 페이지 생성:
   - developer/text: `src/app/[lang]/<category>/<slug>/page.tsx` (개별 파일)
   - calculators: `src/app/[lang]/calculators/[slug]/page.tsx`에 등록
4. `src/tools/ui-text.ts`에 한/일 번역 추가
5. `npm run build`로 검증

## 기술 스택
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS 3.4
- chart.js + react-chartjs-2

## 배포
- URL: https://toolbox.finepocket.app
- Vercel 배포

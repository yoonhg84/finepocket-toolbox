---
name: new-tool
description: "새 도구 추가 시 파일 생성, registry 등록, 라우트 생성, i18n 번역까지 일괄 처리하는 에이전트"
---

# New Tool Agent

새 도구를 FinePocket Toolbox에 추가하는 전체 워크플로우를 처리합니다.

## 입력

사용자로부터 다음 정보를 받습니다:
- **slug**: 도구 URL 슬러그 (예: `password-generator`)
- **name**: 도구 표시 이름 (예: `Password Generator`)
- **category**: `developer` | `text` | `calculators` | `finance`
- **description**: 도구 설명
- **features**: 핵심 기능 목록

## 워크플로우

### Step 1: 도구 파일 생성

`src/tools/<slug>/` 디렉토리에 3개 파일 생성:

#### content.ts
```typescript
import type { ToolContent } from "@/lib/seo";

export const content: ToolContent = {
  title: "...",
  description: "...",
  whatIs: "...",         // 300자+
  howToUse: "...",       // 200자+
  howItWorks: "...",     // 200자+
  useCases: [...],       // 5-6개
  faq: [{ q: "...", a: "..." }, ...],  // 4-6개
};
```

#### logic.ts
- 순수 함수만 작성
- React import 금지
- 외부 패키지 사용 최소화 (Web API 우선)

#### <Name>Tool.tsx
- `"use client"` 필수
- named export 필수 (default export 아님)
- `useI18n` + `getToolUiText` 패턴 사용
- 모든 Tailwind 색상에 `dark:` variant 필수
- CopyButton 등 공용 컴포넌트 활용

### Step 2: Registry 등록

`src/lib/tools-registry.ts`의 `ALL_TOOLS` 배열에 추가:
```typescript
{
  slug: "<slug>",
  category: "<category>",
  name: "<name>",
  shortDescription: "<description>",
  href: "/<category>/<slug>",
  keywords: [...],
  icon: "...",
  relatedSlugs: [...],
}
```

### Step 3: 라우트 페이지 생성

**developer/text 카테고리:**
`src/app/[lang]/<category>/<slug>/page.tsx` 생성 (hash-generator 패턴 참조)

**calculators 카테고리:**
`src/app/[lang]/calculators/[slug]/page.tsx`에 등록:
- CALCULATOR_COMPONENTS에 dynamic import 추가
- CALCULATOR_CONTENT에 content 추가

### Step 4: i18n 번역 추가

`src/tools/ui-text.ts`에 새 UI 문자열의 한국어/일본어 번역 추가.

### Step 5: 빌드 검증

```bash
npm run build
```

에러 발생 시 수정 후 재빌드.

## 체크리스트

- [ ] content.ts: whatIs 300자+, howToUse 200자+, FAQ 4개+
- [ ] logic.ts: React import 없음, 순수 함수
- [ ] Tool.tsx: "use client", named export, dark mode 완전 지원
- [ ] tools-registry.ts: ALL_TOOLS에 등록, relatedSlugs 설정
- [ ] 라우트 페이지 생성 완료
- [ ] ui-text.ts: KO/JA 번역 추가
- [ ] npm run build 성공

## 참조 파일

기존 도구를 참조하여 패턴 일관성 유지:
- Developer: `src/tools/hash-generator/` + `src/app/[lang]/developer/hash-generator/page.tsx`
- Text: `src/tools/word-counter/` + `src/app/[lang]/text/word-counter/page.tsx`
- Calculator: `src/tools/random-picker/` + `src/app/[lang]/calculators/[slug]/page.tsx`

# toolbox.finepocket.app — Phase 1 도구 스펙 (Developer 12 + Text 6)

> Phase 1: 개발자 도구 11개 + 텍스트 도구 6개 = 17개 (구현 완료)
> 기술 스택: Next.js 14 (App Router) + TypeScript + Tailwind CSS + Vercel
> 핵심 원칙: 100% 클라이언트사이드 처리, 서버 비용 $0, 가입 불필요

---

## 공통 설계 원칙

### 페이지 구조 (AdSense 승인 최적화)

모든 도구 페이지는 동일한 레이아웃을 따름:

```
┌─────────────────────────────────────────┐
│  Header (사이트 네비게이션)                │
├─────────────────────────────────────────┤
│  Breadcrumb: Home > Category > Tool     │
├─────────────────────────────────────────┤
│  H1: [도구 이름]                         │
│  한줄 설명 + "Free, browser-based, ..."  │
├─────────────────────────────────────────┤
│  ┌─────────────────────────────────┐    │
│  │     도구 UI (인터랙티브 영역)      │    │
│  │     입력 → 처리 → 출력            │    │
│  └─────────────────────────────────┘    │
│                                         │
│  [AdSense 광고 슬롯 - 승인 후 활성화]    │
│                                         │
│  ## What is [Tool]?          (300자+)   │
│  ## How to use               (200자+)   │
│  ## How it works             (200자+)   │
│  ## Common use cases         (리스트)    │
│  ## FAQ                      (Q&A 3-5개) │
│                                         │
│  ## Related tools            (내부 링크)  │
├─────────────────────────────────────────┤
│  Footer (Trust pages 링크)               │
└─────────────────────────────────────────┘
```

### 기술 공통사항

- **상태 관리**: React useState/useReducer
- **입출력**: textarea 또는 file input → 결과 textarea + 복사 버튼 + 다운로드 버튼
- **에러 처리**: 유효하지 않은 입력 시 인라인 에러 메시지
- **반응형**: 모바일에서 전체 너비, 데스크탑에서 최대 960px
- **성능**: 도구 코드 dynamic import (lazy loading)
- **접근성**: 키보드 내비게이션, aria-label, 적절한 contrast ratio
- **Dark Mode**: 모든 Tailwind 색상에 `dark:` variant 필수
- **i18n**: UI 텍스트는 `ui-text.ts`로 분리 (ko/ja/de/es/fr/pt)

### 도구 파일 구조

각 도구는 `src/tools/<slug>/` 디렉토리에 3개 파일로 구성:

```
src/tools/<slug>/
├── content.ts       # SEO 콘텐츠 (ToolContent 타입)
├── logic.ts         # 순수 로직 함수 (React 의존 없음)
└── <Name>Tool.tsx   # "use client" 컴포넌트 (named export)
```

---

## Developer Tools (11개) — 구현 완료

| # | 도구 | URL | 핵심 기능 |
|---|------|-----|----------|
| 1 | JSON Formatter / Validator | `/developer/json-formatter` | 포맷, 검증, 정렬, 트리뷰 |
| 2 | Base64 Encoder / Decoder | `/developer/base64` | 텍스트/파일/이미지 Base64 변환 |
| 3 | JWT Decoder | `/developer/jwt-decoder` | 헤더/페이로드 디코딩, 만료 표시 |
| 4 | URL Encoder / Decoder | `/developer/url-encoder` | encodeURIComponent / decodeURI |
| 5 | Regex Tester | `/developer/regex-tester` | 실시간 매치 하이라이팅, 프리셋 |
| 6 | Hash Generator | `/developer/hash-generator` | MD5/SHA-1/256/384/512 동시 생성 |
| 7 | Password Generator | `/developer/password-generator` | 비밀번호/패스프레이즈, 강도 미터 |
| 8 | Text Diff Checker | `/developer/diff-checker` | Side-by-side/Inline 비교 |
| 9 | Color Picker / Converter | `/developer/color-picker` | HEX/RGB/HSL 변환, 대비 검사 |
| 10 | Timestamp Converter | `/developer/timestamp-converter` | Unix↔날짜, 실시간 시계, 상대시간 |
| 11 | QR Code Generator | `/developer/qr-code` | 순수 JS QR 인코딩, 색상, PNG 다운로드 |

## Text Tools (6개) — 구현 완료

| # | 도구 | URL | 핵심 기능 |
|---|------|-----|----------|
| 1 | Word / Character Counter | `/text/word-counter` | 실시간 통계, 키워드 밀도, 가독성 |
| 2 | Case Converter | `/text/case-converter` | 10종 케이스 변환 |
| 3 | Lorem Ipsum Generator | `/text/lorem-ipsum` | 단어/문장/문단 생성, HTML 태그 |
| 4 | Markdown Previewer | `/text/markdown-preview` | 실시간 렌더링, 치트시트 |
| 5 | ASCII Art Generator | `/text/ascii-art` | 4개 FIGlet 폰트, 터미널 스타일 |
| 6 | Emoji Picker | `/text/emoji-picker` | 380+ 이모지, 카테고리/검색, 스킨톤 |

---

## 외부 의존성

| 패키지 | 용도 | 크기 |
|--------|------|------|
| `marked` | Markdown 파싱 | ~12KB gzipped |
| `dompurify` | XSS 방지 | ~7KB gzipped |
| `diff` | 텍스트 비교 | ~8KB gzipped |

> 나머지는 모두 네이티브 Web API + 순수 JS 구현 (QR 코드, 해시, 패스워드 등).

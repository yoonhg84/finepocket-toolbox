# toolbox.finepocket.app — MVP 도구 12개 상세 스펙

> Phase 1 목표: 개발자 도구 8개 + 텍스트 도구 4개 = 12개  
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
│  ## Related guides           (블로그 링크)│
├─────────────────────────────────────────┤
│  Footer (Trust pages 링크)               │
└─────────────────────────────────────────┘
```

### 기술 공통사항

- **상태 관리**: React useState/useReducer (localStorage 사용 금지)
- **입출력**: textarea 또는 file input → 결과 textarea + 복사 버튼 + 다운로드 버튼
- **에러 처리**: 유효하지 않은 입력 시 인라인 에러 메시지 (빨간색 텍스트)
- **반응형**: 모바일에서 전체 너비, 데스크탑에서 최대 960px
- **성능**: 도구 코드 dynamic import (lazy loading)
- **접근성**: 키보드 내비게이션, aria-label, 적절한 contrast ratio

---

## 도구 1: JSON Formatter / Validator

| 항목 | 내용 |
|------|------|
| **URL** | `/developer/json-formatter` |
| **카테고리** | Developer Tools |
| **타겟 키워드** | json formatter, json validator, json beautifier, json pretty print |
| **예상 월간 검색량** | 500K+ (전세계) |
| **경쟁 강도** | 높음 (jsonformatter.org, jsoneditoronline.org 등) |
| **차별화** | 트리뷰 + 코드뷰 동시 제공, JSON → CSV/YAML 변환 내장 |

### 기능 상세

**입력**
- textarea에 JSON 붙여넣기
- 파일 업로드 (.json)
- URL에서 가져오기 (CORS 허용 시)
- 샘플 JSON 로드 버튼

**처리 옵션**
- Format (beautify): 2/4 스페이스 또는 탭 선택
- Minify: 공백 제거
- Validate: RFC 8259 기준 유효성 검증
- Sort keys: 알파벳순 키 정렬

**출력**
- 포맷된 JSON (syntax highlighting)
- 에러 발생 시: 줄 번호 + 에러 메시지 표시
- 복사 버튼
- .json 다운로드 버튼
- 변환: JSON → CSV, JSON → YAML, JSON → XML 탭

**구현 라이브러리**
- 파싱: 네이티브 `JSON.parse()` + 커스텀 에러 위치 추적
- 하이라이팅: Prism.js 또는 커스텀 토크나이저
- 트리뷰: 재귀 React 컴포넌트

### SEO 콘텐츠 (페이지 하단, 800자+)

- What is JSON? — JSON 개요 및 역사
- How to format JSON — 단계별 사용법
- JSON syntax rules — 유효한 JSON 규칙
- Common JSON errors — 흔한 실수와 해결법
- FAQ: "Is my data safe?" → "모든 처리는 브라우저에서 수행됩니다"

---

## 도구 2: Base64 Encoder / Decoder

| 항목 | 내용 |
|------|------|
| **URL** | `/developer/base64` |
| **카테고리** | Developer Tools |
| **타겟 키워드** | base64 encode, base64 decode, base64 converter |
| **예상 월간 검색량** | 200K+ |
| **경쟁 강도** | 중간 |
| **차별화** | 텍스트 + 파일 + 이미지 Base64 통합 처리 |

### 기능 상세

**모드 탭**
1. **Text ↔ Base64**: 텍스트 인코딩/디코딩
2. **File ↔ Base64**: 파일을 Base64 문자열로 (data URI 포함)
3. **Image ↔ Base64**: 이미지 프리뷰 + data URI 생성

**입력**: textarea 또는 파일 드래그앤드롭  
**출력**: 변환 결과 + 복사 + 다운로드  
**인코딩 옵션**: UTF-8, ASCII, URL-safe Base64

**구현**: 네이티브 `btoa()` / `atob()` + `FileReader` API + `TextEncoder`

### SEO 콘텐츠

- What is Base64 encoding?
- When to use Base64 (이메일 첨부, 데이터 URI, API 전송 등)
- Base64 vs URL encoding — 차이점

---

## 도구 3: JWT Decoder

| 항목 | 내용 |
|------|------|
| **URL** | `/developer/jwt-decoder` |
| **카테고리** | Developer Tools |
| **타겟 키워드** | jwt decoder, jwt debugger, json web token decoder |
| **예상 월간 검색량** | 100K+ |
| **경쟁 강도** | 중간 (jwt.io가 지배적) |
| **차별화** | 만료 시간 시각화, 클레임 설명 자동 표시 |

### 기능 상세

**입력**: JWT 토큰 문자열 붙여넣기  
**출력 (3개 패널)**:
1. **Header**: 알고리즘, 타입 표시 (JSON 포맷)
2. **Payload**: 클레임 디코딩 + 각 클레임 설명 (iss, sub, exp, iat 등)
3. **Signature**: 서명 상태 (검증은 공개키 입력 시에만)

**추가 기능**:
- `exp` / `iat` / `nbf` 타임스탬프 → 사람이 읽을 수 있는 날짜로 변환
- 만료 여부 표시 (빨간/초록 배지)
- 전체 페이로드 복사 버튼

**구현**: Base64URL 디코딩 (커스텀), `JSON.parse()`

### SEO 콘텐츠

- What is JWT?
- JWT structure explained (Header.Payload.Signature)
- Common JWT claims reference

---

## 도구 4: URL Encoder / Decoder

| 항목 | 내용 |
|------|------|
| **URL** | `/developer/url-encoder` |
| **카테고리** | Developer Tools |
| **타겟 키워드** | url encoder, url decoder, percent encoding |
| **예상 월간 검색량** | 150K+ |
| **경쟁 강도** | 중간 |

### 기능 상세

**모드**: Encode / Decode 토글  
**옵션**:
- `encodeURIComponent()` — 쿼리 파라미터용 (기본)
- `encodeURI()` — 전체 URL용
- 커스텀: 특정 문자만 인코딩

**입력**: 텍스트 또는 전체 URL  
**출력**: 변환 결과 + 변환된 문자 하이라이트  
**실시간**: 입력 시 자동 변환 (debounce 300ms)

**구현**: 네이티브 `encodeURIComponent()` / `decodeURIComponent()`

---

## 도구 5: Regex Tester

| 항목 | 내용 |
|------|------|
| **URL** | `/developer/regex-tester` |
| **카테고리** | Developer Tools |
| **타겟 키워드** | regex tester, regex101, regular expression tester |
| **예상 월간 검색량** | 200K+ |
| **경쟁 강도** | 높음 (regex101.com이 지배적) |
| **차별화** | 실시간 매치 + 간결한 UI + 자주 쓰는 패턴 프리셋 |

### 기능 상세

**입력 (3개 영역)**:
1. **Pattern**: 정규식 입력
2. **Flags**: g, i, m, s, u 체크박스
3. **Test string**: 테스트할 텍스트 (여러 줄)

**출력**:
- 매치 하이라이팅 (색상으로 구분, 그룹별 다른 색)
- 매치 정보 테이블: 전체 매치, 그룹, 인덱스, 값
- 매치 개수 카운터
- Replace 모드: 치환 결과 표시

**프리셋 패턴**:
- 이메일, URL, IP 주소, 전화번호, 날짜 등 10개+
- 클릭 시 자동 입력 + 예시 테스트 문자열

**구현**: 네이티브 `RegExp` + 커스텀 하이라이팅 (HTML mark 태그)

---

## 도구 6: Hash Generator

| 항목 | 내용 |
|------|------|
| **URL** | `/developer/hash-generator` |
| **카테고리** | Developer Tools |
| **타겟 키워드** | md5 hash generator, sha256 generator, hash generator online |
| **예상 월간 검색량** | 150K+ |
| **경쟁 강도** | 중간 |

### 기능 상세

**입력**: 텍스트 또는 파일  
**지원 알고리즘** (동시 표시):
- MD5
- SHA-1
- SHA-256
- SHA-384
- SHA-512

**출력**: 모든 알고리즘의 해시 값 동시 표시 + 개별 복사 버튼  
**추가**: 대소문자 토글 (lowercase/uppercase)

**구현**: Web Crypto API (`crypto.subtle.digest()`) — MD5만 별도 구현 필요 (Web Crypto에 미포함)

---

## 도구 7: Text Diff Checker

| 항목 | 내용 |
|------|------|
| **URL** | `/developer/diff-checker` |
| **카테고리** | Developer Tools |
| **타겟 키워드** | diff checker, text compare, text diff online |
| **예상 월간 검색량** | 100K+ |
| **경쟁 강도** | 중간 |

### 기능 상세

**입력**: 좌우 2개 textarea (Original / Modified)  
**비교 모드**:
- Side-by-side (기본)
- Inline (통합 뷰)

**출력**:
- 추가된 줄: 초록색 배경
- 삭제된 줄: 빨간색 배경
- 변경된 단어: 단어 수준 하이라이팅
- 통계: 추가/삭제/변경 줄 수

**구현**: `diff` 라이브러리 (npm `diff` 패키지, ~8KB)

---

## 도구 8: Color Picker / Converter

| 항목 | 내용 |
|------|------|
| **URL** | `/developer/color-picker` |
| **카테고리** | Developer Tools |
| **타겟 키워드** | color picker, hex to rgb, color converter |
| **예상 월간 검색량** | 300K+ |
| **경쟁 강도** | 높음 |
| **차별화** | HEX/RGB/HSL/CSS 변수 동시 표시 + 팔레트 생성 |

### 기능 상세

**입력** (어느 형식이든):
- 컬러 피커 (네이티브 `<input type="color">` + 커스텀 UI)
- HEX 입력: `#FF5733`
- RGB 입력: `rgb(255, 87, 51)`
- HSL 입력: `hsl(14, 100%, 60%)`

**출력 (동시 표시)**:
- HEX, RGB, HSL, HSB, CMYK 값 + 각각 복사 버튼
- 프리뷰 박스 (선택한 색상)
- Opacity 슬라이더 → RGBA/HSLA 출력
- CSS 변수 형식: `var(--primary-color)`

**보너스 기능**:
- Contrast checker: 배경/전경 색상 대비율 (WCAG 기준)
- 팔레트 생성: Complementary, Analogous, Triadic

**구현**: 순수 JS 색상 변환 함수 (외부 라이브러리 불필요)

---

## 도구 9: Word / Character Counter

| 항목 | 내용 |
|------|------|
| **URL** | `/text/word-counter` |
| **카테고리** | Text Tools |
| **타겟 키워드** | word counter, character counter, word count online |
| **예상 월간 검색량** | 500K+ |
| **경쟁 강도** | 높음 (wordcounter.net 등) |
| **차별화** | 실시간 통계 + 읽기 시간 + 키워드 밀도 분석 |

### 기능 상세

**입력**: 큰 textarea (최소 높이 300px)  
**실시간 통계** (입력 시 즉시 업데이트):
- 글자 수 (공백 포함/제외)
- 단어 수
- 문장 수
- 문단 수
- 읽기 시간 (평균 200 WPM 기준)
- 말하기 시간 (평균 130 WPM 기준)

**추가 분석**:
- Top 키워드 밀도 (상위 10개 단어, 빈도 + 비율)
- 가독성 점수 (Flesch Reading Ease)

**구현**: 순수 JS 문자열 분석 (정규식 기반)

---

## 도구 10: Case Converter

| 항목 | 내용 |
|------|------|
| **URL** | `/text/case-converter` |
| **카테고리** | Text Tools |
| **타겟 키워드** | case converter, uppercase converter, title case converter |
| **예상 월간 검색량** | 200K+ |
| **경쟁 강도** | 중간 |

### 기능 상세

**입력**: textarea  
**변환 버튼들** (클릭 시 즉시 변환):
- UPPERCASE
- lowercase
- Title Case
- Sentence case
- camelCase
- PascalCase
- snake_case
- kebab-case
- CONSTANT_CASE
- dot.case

**출력**: 변환된 텍스트 + 복사 버튼  
**구현**: 순수 JS 문자열 변환 함수

---

## 도구 11: Lorem Ipsum Generator

| 항목 | 내용 |
|------|------|
| **URL** | `/text/lorem-ipsum` |
| **카테고리** | Text Tools |
| **타겟 키워드** | lorem ipsum generator, placeholder text, dummy text generator |
| **예상 월간 검색량** | 150K+ |
| **경쟁 강도** | 중간 |

### 기능 상세

**옵션**:
- 생성 단위: 단어 / 문장 / 문단
- 수량: 숫자 입력 (1-100)
- "Lorem ipsum dolor sit amet"으로 시작 토글
- HTML 태그 포함 (`<p>` 태그) 토글

**출력**: 생성된 텍스트 + 복사 + 다운로드 (.txt)  
**구현**: 미리 준비된 라틴어 단어 풀에서 랜덤 조합

---

## 도구 12: Markdown Previewer

| 항목 | 내용 |
|------|------|
| **URL** | `/text/markdown-preview` |
| **카테고리** | Text Tools |
| **타겟 키워드** | markdown preview, markdown editor online, markdown to html |
| **예상 월간 검색량** | 100K+ |
| **경쟁 강도** | 중간 |

### 기능 상세

**레이아웃**: 좌우 분할 (에디터 | 프리뷰)  
**입력**: Markdown 에디터 (좌측)  
**출력**: 렌더링된 HTML (우측, 실시간)

**지원 문법**:
- 헤더 (H1-H6)
- 볼드, 이탤릭, 취소선
- 링크, 이미지
- 코드 블록 (syntax highlighting)
- 테이블
- 리스트 (순서/비순서)
- 인용문
- 수평선

**추가 기능**:
- HTML 소스 복사
- Markdown 치트시트 사이드패널
- 샘플 Markdown 로드

**구현**: `marked` 라이브러리 (경량, ~12KB gzipped) + DOMPurify (XSS 방지)

---

## 구현 우선순위 (권장 순서)

| 순서 | 도구 | 이유 |
|------|------|------|
| 1 | JSON Formatter | 가장 높은 검색량, 핵심 도구 |
| 2 | Word Counter | 범용 트래픽, 구현 간단 |
| 3 | Base64 Encoder | 개발자 필수, 구현 간단 |
| 4 | Case Converter | 구현 간단, 넓은 타겟 |
| 5 | Hash Generator | Web Crypto API 활용 |
| 6 | URL Encoder | 구현 간단, 개발자 필수 |
| 7 | Password Generator | 보안 니치 (높은 CPC 잠재력) |
| 8 | Color Picker | 시각적 매력, 높은 검색량 |
| 9 | Lorem Ipsum | 구현 간단, 디자이너 타겟 |
| 10 | Regex Tester | 고급 개발자 타겟 |
| 11 | JWT Decoder | 보안/인증 니치 |
| 12 | Diff Checker | 외부 라이브러리 필요 |

> 참고: 위 순서는 "빠르게 12개를 완성"하는 데 최적화되어 있음.
> 검색량이 높고 구현이 쉬운 것부터 시작하여 빠르게 사이트 콘텐츠를 채움.

---

## 총 외부 의존성 (최소화)

| 패키지 | 용도 | 크기 |
|--------|------|------|
| `marked` | Markdown 파싱 | ~12KB gzipped |
| `dompurify` | XSS 방지 | ~7KB gzipped |
| `diff` | 텍스트 비교 | ~8KB gzipped |
| `prismjs` | 코드 하이라이팅 (선택) | ~6KB core |

> 총 추가 번들: ~33KB gzipped. 나머지는 모두 네이티브 Web API로 처리.

---

## AdSense 승인 체크포인트

각 도구 페이지가 다음을 포함하는지 확인:

- [x] 800자 이상의 오리지널 콘텐츠 (What/How/FAQ)
- [x] 관련 도구 내부 링크 3개 이상
- [x] 관련 블로그 글 링크 1개 이상
- [x] 메타 태그 (title, description, og:image)
- [x] 구조화 데이터 (JSON-LD: WebApplication schema)
- [x] 모바일 반응형 확인
- [x] 페이지 로딩 3초 이내
- [x] 광고 슬롯 공간 예약 (도구 아래, 콘텐츠 사이)

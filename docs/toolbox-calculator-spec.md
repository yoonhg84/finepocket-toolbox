# toolbox.finepocket.app — 계산기/변환기 도구 10개 스펙

> Phase 2 목표: 금융 계산기 4개 + 단위 변환기 2개 + 일상 계산기 4개 = 10개  
> 카테고리: `/finance` 하위에 배치  
> 핵심: YMYL 도구에 면책조항 필수

---

## A. 금융 계산기 (CPC $2-8+ / 높은 수익 잠재력)

### 1. Loan Calculator (대출 계산기)

| 항목 | 내용 |
|------|------|
| **URL** | `/finance/loan-calculator` |
| **타겟 키워드** | loan calculator, 대출 계산기, mortgage calculator, EMI calculator |
| **예상 검색량** | 720K+/월 |
| **CPC** | $5+ (금융 니치 최상위) |

**입력 필드:**
- 대출 원금 (₩ / $ 통화 선택)
- 연 이자율 (%, 슬라이더 + 직접 입력)
- 대출 기간 (개월 또는 년, 슬라이더 + 직접 입력)
- 상환 방식: 원리금균등 / 원금균등 / 만기일시 토글

**출력:**
- 월 상환액 (큰 숫자로 강조)
- 총 상환액
- 총 이자
- 원금 대비 이자 비율 파이차트
- 상환 스케줄 테이블 (월별 원금/이자/잔액)
- 연도별 상환 추이 라인 차트

**핵심 수식:**
```
원리금균등: PMT = P × r(1+r)^n / ((1+r)^n - 1)
  P = 원금, r = 월이자율(연이율/12), n = 총 개월수

원금균등: 월상환원금 = P/n, 월이자 = 잔액 × r
```

**시각화:** Chart.js — 파이차트(원금 vs 이자) + 라인 차트(잔액 추이)

**YMYL 면책조항 (필수):**
> "이 계산기는 참고용이며, 실제 대출 조건은 금융기관에 따라 다를 수 있습니다. 
> 정확한 상환 정보는 해당 금융기관에 문의하시기 바랍니다.
> 이 도구는 전문 금융 조언을 대체하지 않습니다."

**SEO 콘텐츠 (800자+):**
- What is a loan calculator?
- How loan interest works (단리 vs 복리)
- 원리금균등 vs 원금균등 차이
- Tips for reducing loan interest
- FAQ

---

### 2. Compound Interest Calculator (복리 계산기)

| 항목 | 내용 |
|------|------|
| **URL** | `/finance/compound-interest` |
| **타겟 키워드** | compound interest calculator, 복리 계산기, investment calculator |
| **예상 검색량** | 400K+/월 |
| **CPC** | $4+ |

**입력 필드:**
- 초기 투자금 (원금)
- 연 이자율 (%)
- 투자 기간 (년)
- 복리 주기: 일별 / 월별 / 분기별 / 반기별 / 연별
- 정기 추가 적립금 (선택, 월별)

**출력:**
- 최종 금액 (크게 표시)
- 총 이자 수익
- 총 투입금 (원금 + 적립금 합계)
- 연도별 성장 테이블
- 성장 차트: 원금 영역 + 이자 영역 스택 면적 차트

**핵심 수식:**
```
기본: A = P(1 + r/n)^(nt)
적립금 포함: A = P(1 + r/n)^(nt) + PMT × ((1+r/n)^(nt) - 1) / (r/n)
  P = 원금, r = 연이율, n = 연간 복리 횟수, t = 년수, PMT = 월 적립금
```

**시각화:** Chart.js — 스택 면적 차트 (원금 vs 이자 성장)

**SEO 콘텐츠:**
- What is compound interest? (단리와의 차이)
- The power of compounding (72 법칙 설명)
- How compounding frequency affects returns
- FAQ

---

### 3. Percentage Calculator (퍼센트 계산기)

| 항목 | 내용 |
|------|------|
| **URL** | `/finance/percentage-calculator` |
| **타겟 키워드** | percentage calculator, percent calculator, 퍼센트 계산 |
| **예상 검색량** | 980K+/월 (매우 높음) |
| **CPC** | $1-2 |

**4가지 계산 모드 (탭 또는 섹션):**

| 모드 | 질문 | 수식 |
|------|------|------|
| 기본 | X의 Y%는? | result = X × Y / 100 |
| 역산 | X는 Y의 몇 %? | result = (X / Y) × 100 |
| 증감률 | X에서 Y로의 변화율? | result = ((Y - X) / X) × 100 |
| 할인/추가 | X에 Y% 적용? | result = X × (1 ± Y/100) |

**UX:** 모든 모드를 한 페이지에 세로로 배치 (스크롤). 각 모드에 예시 표시.
**실시간:** 입력 즉시 결과 업데이트 (debounce 불필요, 순수 수학)

**SEO 콘텐츠:**
- How to calculate percentage (수동 계산법)
- Percentage formulas cheat sheet
- Common percentage mistakes
- FAQ

---

### 4. Tip Calculator (팁 계산기)

| 항목 | 내용 |
|------|------|
| **URL** | `/finance/tip-calculator` |
| **타겟 키워드** | tip calculator, 팁 계산기, gratuity calculator |
| **예상 검색량** | 300K+/월 |
| **CPC** | $1-2 |

**입력 필드:**
- 총 금액 (bill amount)
- 팁 비율: 15% / 18% / 20% / 25% 프리셋 버튼 + 커스텀 입력
- 인원 수 (1-20, 스텝퍼)

**출력:**
- 팁 금액
- 1인당 총액 (금액 + 팁)
- 1인당 팁
- 올림 옵션: 1인당 금액을 깔끔한 숫자로 올림

**구현:** 순수 JS 산술. 반올림 처리 주의.

---

## B. 단위 변환기 (높은 트래픽)

### 5. Unit Converter (종합 단위 변환기)

| 항목 | 내용 |
|------|------|
| **URL** | `/finance/unit-converter` |
| **타겟 키워드** | unit converter, 단위 변환, cm to inches, kg to lbs |
| **예상 검색량** | 780K+/월 (롱테일 키워드 합산 시 수백만) |
| **CPC** | $0.5-1 (낮지만 트래픽 엄청남) |

**지원 카테고리 (8개):**

| 카테고리 | 단위 예시 | 인기 변환 |
|----------|----------|----------|
| 길이 | mm, cm, m, km, in, ft, yd, mi | cm↔in, m↔ft, km↔mi |
| 무게 | mg, g, kg, oz, lb, ton | kg↔lb, g↔oz |
| 온도 | °C, °F, K | °C↔°F |
| 부피 | ml, l, gal, fl oz, cup, tbsp, tsp | ml↔fl oz, l↔gal |
| 면적 | mm², cm², m², km², in², ft², acre, ha | m²↔ft², acre↔ha |
| 속도 | m/s, km/h, mph, knot, ft/s | km/h↔mph |
| 데이터 | B, KB, MB, GB, TB, PB | MB↔GB |
| 시간 | ms, s, min, h, day, week, month, year | — |

**UI 레이아웃:**
```
[카테고리 탭/드롭다운]

[숫자 입력]  [From 단위 ▼]
        ⇅ (스왑 버튼)
[결과 표시]  [To 단위 ▼]

[모든 단위로 동시 변환 테이블]
```

**핵심 구현:**
- 각 카테고리의 기준 단위(base unit)를 정하고, 모든 변환은 base를 거침
- 예: 길이 base = meter, 1 inch = 0.0254 meter
- 온도만 특수: C↔F는 선형 변환 아닌 공식 필요

**SEO 전략 — 롱테일 키워드:**
- 개별 변환 페이지 생성 가능: `/unit-converter/cm-to-inches` 등
- 하지만 MVP에서는 단일 페이지로 시작, 트래픽 보고 분리 결정

**SEO 콘텐츠:**
- What is the metric system?
- Metric vs Imperial units explained
- Most common unit conversions reference table
- FAQ

---

### 6. Currency Converter (환율 변환기)

| 항목 | 내용 |
|------|------|
| **URL** | `/finance/currency-converter` |
| **타겟 키워드** | currency converter, 환율 계산, USD to KRW, exchange rate |
| **예상 검색량** | 1.1M+/월 (매우 높음) |
| **CPC** | $3+ |

**입력 필드:**
- 금액
- From 통화 (검색 가능 드롭다운, 국기 아이콘)
- To 통화
- 스왑 버튼

**출력:**
- 변환 금액
- 환율 (1 USD = X KRW)
- 역환율 (1 KRW = X USD)
- 최종 업데이트 시간

**지원 통화 (30+):**
USD, EUR, GBP, JPY, KRW, CNY, CAD, AUD, CHF, HKD, SGD, 
TWD, THB, VND, INR, BRL, MXN, ZAR, SEK, NOK, DKK, NZD, 
RUB, TRY, AED, SAR, PHP, IDR, MYR, PLN

**기술 구현:**
- 무료 환율 API: `exchangerate.host` 또는 `open.er-api.com`
- Next.js API Route로 프록시 (CORS 회피 + API 키 보호)
- ISR (Incremental Static Regeneration): 1시간마다 환율 갱신
- 오프라인 폴백: 마지막으로 가져온 환율 사용

**YMYL 면책조항 (필수):**
> "표시된 환율은 참고용이며, 실제 거래 환율과 다를 수 있습니다.
> 정확한 환율은 금융기관에 확인하시기 바랍니다."

---

## C. 일상 계산기 (범용 트래픽)

### 7. BMI Calculator

| 항목 | 내용 |
|------|------|
| **URL** | `/finance/bmi-calculator` |
| **타겟 키워드** | BMI calculator, body mass index, 비만도 계산 |
| **예상 검색량** | 850K+/월 |
| **CPC** | $1-3 (건강 니치) |

**입력:**
- 단위 토글: Metric (cm/kg) / Imperial (ft-in/lb)
- 키
- 몸무게
- (선택) 나이, 성별 — BMI Prime 계산용

**출력:**
- BMI 수치 (큰 숫자)
- 카테고리: 저체중(<18.5) / 정상(18.5-24.9) / 과체중(25-29.9) / 비만(30+)
- 시각적 게이지 (초록~노랑~빨강 컬러 바에 포인터)
- 정상 체중 범위 표시 ("당신의 키에서 정상 체중은 X~Y kg입니다")
- BMI Prime 값

**수식:** `BMI = weight(kg) / height(m)²`

**YMYL 면책조항 (필수):**
> "BMI는 건강 상태의 참고 지표이며, 정확한 건강 평가를 위해서는
> 의료 전문가와 상담하시기 바랍니다. 근육량이 많은 분, 임산부,
> 노인, 성장기 아동에게는 정확하지 않을 수 있습니다."

---

### 8. Age Calculator (나이 계산기)

| 항목 | 내용 |
|------|------|
| **URL** | `/finance/age-calculator` |
| **타겟 키워드** | age calculator, 나이 계산, how old am I |
| **예상 검색량** | 500K+/월 |
| **CPC** | $0.5-1 |

**입력:** 생년월일 (Date picker)

**출력:**
- 만 나이: X년 Y월 Z일
- 다음 생일까지: D-day 카운트다운
- 살아온 총 일수 / 시간 / 분 / 초 (실시간 카운터)
- 태어난 요일
- 띠 (12간지)
- 별자리

**보너스 모드:** 두 날짜 사이 간격 계산

**구현:** 네이티브 Date API. 윤년 처리 주의.

---

### 9. Date Calculator (날짜 계산기)

| 항목 | 내용 |
|------|------|
| **URL** | `/finance/date-calculator` |
| **타겟 키워드** | date calculator, days between dates, 날짜 계산 |
| **예상 검색량** | 300K+/월 |
| **CPC** | $0.5-1 |

**모드 2가지:**

1. **날짜 더하기/빼기**
   - 기준일 + N일/주/월/년 = 결과 날짜
   - 옵션: 영업일만 계산 (토/일 제외)

2. **두 날짜 사이 간격**
   - 시작일 ~ 종료일 = X일 (X주 X일)
   - 옵션: 시작일/종료일 포함 여부

**구현:** 네이티브 Date API. 월 더하기 시 말일 처리 주의 (1/31 + 1개월 = 2/28).

---

### 10. Data Storage Converter (데이터 단위 변환기)

| 항목 | 내용 |
|------|------|
| **URL** | `/finance/data-converter` |
| **타겟 키워드** | byte converter, MB to GB, data unit converter |
| **예상 검색량** | 200K+/월 |
| **CPC** | $0.5-1 |

**입력:** 숫자 + 단위 드롭다운

**단위 (10개):**
Bit, Byte, KB, MB, GB, TB, PB, EB, Kib, MiB, GiB, TiB

**출력:** 모든 단위로 동시 변환 (테이블)

**핵심 토글:** SI (1000 기준) vs IEC (1024 기준)
- SI: 1 KB = 1,000 Bytes
- IEC: 1 KiB = 1,024 Bytes

**구현:** 순수 JS. BigInt 사용 (PB/EB 단위에서 정밀도 필요).

---

## 구현 우선순위

| 순서 | Phase | 도구 | 난이도 | 이유 |
|------|-------|------|--------|------|
| 1 | 2A | Percentage calculator | ★☆☆ | 검색량 980K, 구현 가장 쉬움 |
| 2 | 2A | Tip calculator | ★☆☆ | 구현 쉬움, 범용 트래픽 |
| 3 | 2A | Age calculator | ★☆☆ | 구현 쉬움, 높은 검색량 |
| 4 | 2A | Data converter | ★☆☆ | 구현 쉬움 |
| 5 | 2B | Unit converter | ★★☆ | 높은 트래픽, 카테고리 많음 |
| 6 | 2B | BMI calculator | ★★☆ | 차트 필요, YMYL |
| 7 | 2B | Loan calculator | ★★☆ | 차트 + 테이블 필요, YMYL |
| 8 | 2B | Compound interest | ★★☆ | 면적 차트, YMYL |
| 9 | 2B | Date calculator | ★★☆ | 영업일 로직 |
| 10 | 2C | Currency converter | ★★★ | 외부 API 연동, ISR |

---

## URL 구조 재검토

현재 모든 계산기가 `/finance/` 하위에 있는데, 카테고리를 좀 더 정교하게 나눌 수 있음:

```
/finance/loan-calculator        — 금융
/finance/compound-interest      — 금융
/finance/percentage-calculator  — 금융/수학
/finance/tip-calculator         — 금융/일상
/finance/currency-converter     — 금융

/converter/unit-converter       — 변환기 (별도 카테고리 고려)
/converter/data-converter       — 변환기

/health/bmi-calculator          — 건강 (별도 카테고리 고려)

/utility/age-calculator         — 일상
/utility/date-calculator        — 일상
```

**권장:** MVP에서는 `/finance/` 통합 유지.  
트래픽 데이터 보고 `/converter/`, `/health/` 카테고리 분리 결정.

---

## 차트 라이브러리 선택

계산기류에서 차트가 핵심 차별화 요소:

| 옵션 | 크기 | 장점 | 단점 |
|------|------|------|------|
| **Chart.js** | ~63KB gzipped | 가장 대중적, 문서 풍부 | 약간 무거움 |
| **Recharts** | ~45KB | React 네이티브 | SSR 이슈 가능 |
| **Lightweight Charts** | ~40KB | 금융 차트 특화 | 범용성 낮음 |
| **커스텀 SVG** | 0KB | 추가 번들 없음 | 개발 시간 |

**권장:** Chart.js — dynamic import로 계산기 페이지에서만 로드.
tree-shaking으로 사용하는 차트 타입만 포함.

---

## AdSense 핵심: YMYL 도구 특별 주의

금융/건강 도구는 Google의 YMYL (Your Money or Your Life) 카테고리:

1. **면책조항**: 모든 금융/건강 도구 페이지 상단 + 하단에 배치
2. **출처 인용**: 수식 설명 시 공인된 출처 참조 (예: "Federal Reserve의 정의에 따르면...")
3. **E-E-A-T**: About 페이지에서 운영자의 전문성/경험 표시
4. **정확성**: 소수점 처리, 반올림 규칙을 명확히 문서화
5. **비교 금지**: "이 은행이 좋다" 같은 추천은 절대 하지 않음

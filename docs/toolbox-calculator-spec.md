# toolbox.finepocket.app — Phase 2 계산기/금융 도구 스펙

> Phase 2: 금융 3개 + 계산기 8개 = 11개 (구현 완료)
> 카테고리: `/calculators/` 및 `/finance/` 하위 배치
> 핵심: YMYL 도구에 면책조항 필수

---

## Finance Tools (3개) — 구현 완료

| # | 도구 | URL | CPC | 핵심 기능 |
|---|------|-----|-----|----------|
| 1 | Loan Calculator | `/finance/loan-calculator` | $5+ | 원리금균등/원금균등/만기일시, 상환 스케줄, 차트 |
| 2 | Compound Interest Calculator | `/finance/compound-interest` | $4+ | 복리 계산, 월 적립금, 성장 차트 |
| 3 | Currency Converter | `/finance/currency-converter` | $3+ | 30+ 통화, 실시간 환율 API, ISR |

## Calculators (8개) — 구현 완료

| # | 도구 | URL | 핵심 기능 |
|---|------|-----|----------|
| 1 | Percentage Calculator | `/calculators/percentage-calculator` | 4가지 모드 (기본/역산/증감률/할인) |
| 2 | Tip Calculator | `/calculators/tip-calculator` | 프리셋 팁률, 인원 분할, 올림 |
| 3 | Age Calculator | `/calculators/age-calculator` | 만 나이, 총 일수, 별자리, 띠 |
| 4 | Data Storage Converter | `/calculators/data-converter` | 이진(×1024) 기준 단위 변환 |
| 5 | Unit Converter | `/calculators/unit-converter` | 8카테고리 (길이/무게/온도/부피/면적/속도/데이터/시간) |
| 6 | BMI Calculator | `/calculators/bmi-calculator` | Metric/Imperial, 게이지, 정상 범위 |
| 7 | Date Calculator | `/calculators/date-calculator` | 날짜 간격/더하기빼기, 영업일 옵션 |
| 8 | Random Decision Maker | `/calculators/random-picker` | 룰렛 휠, 동전 던지기, 주사위 (d4~d20) |

---

## URL 구조

```
/finance/
├── loan-calculator
├── compound-interest
└── currency-converter

/calculators/
├── percentage-calculator
├── tip-calculator
├── age-calculator
├── data-converter
├── unit-converter
├── bmi-calculator
├── date-calculator
└── random-picker
```

> 참고: calculators는 `[slug]` 동적 라우트로 통합 관리
> (`src/app/[lang]/calculators/[slug]/page.tsx`)

---

## 차트 라이브러리

- **Chart.js + react-chartjs-2**: Loan/Compound Interest 계산기에서 사용
- dynamic import로 해당 페이지에서만 로드

---

## YMYL 면책조항

금융/건강 도구에 필수 포함:
- 대출 계산기: "참고용이며 실제 대출 조건은 금융기관에 따라 다를 수 있습니다"
- 환율 변환기: "표시된 환율은 참고용이며 실제 거래 환율과 다를 수 있습니다"
- BMI 계산기: "건강 상태의 참고 지표이며 의료 전문가와 상담하시기 바랍니다"

import type { Locale } from "@/i18n/config";
import type { ToolCategory } from "@/lib/tools-registry";

export interface CategoryHubContent {
  category: ToolCategory;
  title: string;
  description: string;
  intro: string[];
  tasksTitle: string;
  tasks: string[];
  valueTitle: string;
  valuePoints: string[];
  toolsTitle: string;
  toolsDescription: string;
  faqTitle: string;
  faq: Array<{ q: string; a: string }>;
  guideTitle: string;
  guidePoints: string[];
}

export const CATEGORY_HUBS: Record<ToolCategory, CategoryHubContent> = {
  developer: {
    category: "developer",
    title: "Developer Tools",
    description:
      "Browser-based utilities for inspecting, formatting, validating, and transforming data during development work.",
    intro: [
      "The developer category is built for tasks that usually interrupt flow: cleaning JSON, checking regular expressions, decoding tokens, generating hashes, or comparing text during debugging and review.",
      "Each tool is designed to open fast, work locally when possible, and provide enough explanation below the interface that a result can be trusted and understood without leaving the page.",
    ],
    tasksTitle: "Common tasks in this category",
    tasks: [
      "Validate and format API payloads before shipping or debugging",
      "Inspect tokens, encoded strings, and hashes during auth or integration work",
      "Compare payloads, snippets, and text outputs during review",
      "Convert values quickly without switching to a local script or IDE extension",
    ],
    valueTitle: "Why these pages are useful",
    valuePoints: [
      "Fast browser-based workflows for one-off developer tasks",
      "Explanatory content that helps newer team members understand the output",
      "Related tool links that keep similar debugging workflows close together",
      "No account wall before trying a tool",
    ],
    toolsTitle: "Browse all developer tools",
    toolsDescription:
      "These utilities focus on common debugging, inspection, encoding, and transformation tasks for web and application development.",
    faqTitle: "Developer tools FAQ",
    faq: [
      {
        q: "Are these tools suitable for sensitive payloads?",
        a: "Many developer tools on the site run entirely in the browser, which is helpful for sensitive debugging data. When a feature depends on a remote data source, the page should make that explicit.",
      },
      {
        q: "Can these tools replace IDE plugins?",
        a: "They are best used for quick checks, debugging sessions, and shareable browser workflows. They do not aim to replace a full local development environment.",
      },
      {
        q: "Which pages are most useful for API debugging?",
        a: "JSON Formatter, JWT Decoder, Base64 Encoder or Decoder, URL Encoder or Decoder, and Diff Checker are the strongest starting points for API payload inspection and troubleshooting.",
      },
    ],
    guideTitle: "Good next expansions for this category",
    guidePoints: [
      "Short guides that compare related tools for common debugging jobs",
      "Examples of typical API troubleshooting workflows",
      "Reference articles that explain JSON, JWT, Base64, and regex patterns in plain English",
    ],
  },
  text: {
    category: "text",
    title: "Text Tools",
    description:
      "Utilities for counting, transforming, previewing, and generating text without losing the original structure or formatting.",
    intro: [
      "The text category is for editing workflows where speed matters more than opening a full editor. These tools help with word counts, casing changes, placeholder copy, and Markdown rendering.",
      "The goal is to make common text operations predictable, especially for writing, documentation, content review, and quick collaboration tasks.",
    ],
    tasksTitle: "Common tasks in this category",
    tasks: [
      "Check length limits before publishing or sending content",
      "Convert text between common casing formats for naming or cleanup",
      "Preview Markdown before posting it to docs or issue trackers",
      "Generate placeholder copy for designs and drafts",
    ],
    valueTitle: "Why these pages are useful",
    valuePoints: [
      "Simple interfaces for repetitive text transformations",
      "Clear output that can be copied immediately into another workflow",
      "Browser-based tools that work well on both desktop and mobile",
      "Complementary tools grouped together by writing and editing intent",
    ],
    toolsTitle: "Browse all text tools",
    toolsDescription:
      "These pages support copy editing, writing, content QA, and lightweight formatting workflows.",
    faqTitle: "Text tools FAQ",
    faq: [
      {
        q: "Who are these text tools for?",
        a: "They are useful for writers, marketers, students, developers, support teams, and anyone who needs quick text cleanup or preview workflows without opening heavier software.",
      },
      {
        q: "Do text tools store what I write?",
        a: "Most text tools are intended to run in the browser so you can paste, review, and copy content quickly. The privacy and tool page notes explain when a tool uses only local processing.",
      },
      {
        q: "Which text tool should I start with?",
        a: "Word Counter is best for measuring length, Case Converter is best for quick transformations, Markdown Previewer is best for rendered output checks, and Lorem Ipsum Generator is best for placeholder content.",
      },
    ],
    guideTitle: "Good next expansions for this category",
    guidePoints: [
      "Short guides for choosing between common casing formats",
      "Markdown examples for documentation and README workflows",
      "Best-practice articles around character limits and readability checks",
    ],
  },
  finance: {
    category: "finance",
    title: "Finance & Calculators",
    description:
      "Reference calculators for planning payments, comparing rates, modeling growth, and answering high-intent money questions with clear assumptions.",
    intro: [
      "The finance category is where higher-intent planning tools live: loan calculations, compound interest, percentages, currency conversion, and related utility calculators. These pages are designed to answer a question quickly while still giving enough context to understand the result.",
      "Supporting calculators such as date, unit, and tip tools still live here, but the strongest pages are the ones tied directly to borrowing, savings, rates, and payment planning.",
      "Because finance-related pages carry higher trust expectations, the content emphasizes formulas, assumptions, and reference-only disclaimers instead of presenting outputs as professional advice.",
    ],
    tasksTitle: "Common tasks in this category",
    tasks: [
      "Estimate loan payments before comparing lenders or repayment methods",
      "Model savings growth or recurring investment contributions",
      "Check percentages, discounts, or date differences during planning",
      "Convert currencies or units while researching costs across countries",
    ],
    valueTitle: "Why these pages are useful",
    valuePoints: [
      "High-intent pages built around practical planning questions",
      "Plain-language explanations of formulas and repayment logic",
      "Reference disclaimers that set expectations for financial decisions",
      "Related calculators grouped together for deeper comparison workflows",
    ],
    toolsTitle: "Browse all finance and calculator tools",
    toolsDescription:
      "These tools focus on budgeting, planning, conversions, and quick reference calculations. They are useful for exploration and comparison, not a substitute for professional advice.",
    faqTitle: "Finance and calculator FAQ",
    faq: [
      {
        q: "Are these calculators financial advice?",
        a: "No. They are reference tools for estimation and planning. Actual rates, fees, taxes, and lending decisions depend on providers and personal circumstances.",
      },
      {
        q: "Why are finance pages important for trust?",
        a: "Visitors use them for decisions that can affect money, so the page should explain formulas, assumptions, and limitations clearly instead of presenting the output as unquestionable.",
      },
      {
        q: "Which finance pages are strongest for high-intent visitors?",
        a: "Loan Calculator, Compound Interest Calculator, and Currency Converter usually match clearer commercial or planning intent than general-purpose utility pages.",
      },
    ],
    guideTitle: "Good next expansions for this category",
    guidePoints: [
      "Mortgage, APR, refinance, and credit card payoff calculators",
      "Country-specific finance explainers that add context to the tools",
      "Comparison guides that explain when to use one calculator versus another",
    ],
  },
};

const KO_CATEGORY_HUBS: Record<ToolCategory, CategoryHubContent> = {
  developer: {
    category: "developer",
    title: "개발 도구",
    description:
      "개발 과정에서 자주 필요한 검사, 포맷팅, 검증, 변환 작업을 브라우저에서 바로 처리할 수 있는 도구 모음입니다.",
    intro: [
      "개발 카테고리는 작업 흐름을 자주 끊는 반복 업무를 빠르게 처리하도록 구성했습니다. JSON 정리, 정규식 확인, 토큰 디코딩, 해시 생성, 텍스트 비교 같은 작업을 별도 설치 없이 바로 실행할 수 있습니다.",
      "각 도구는 가능한 한 브라우저 안에서 동작하고, 결과를 바로 신뢰하고 이해할 수 있도록 인터페이스 아래에 설명과 관련 도구 링크를 함께 제공합니다.",
    ],
    tasksTitle: "이 카테고리에서 자주 하는 작업",
    tasks: [
      "API 응답이나 설정 데이터를 검증하고 포맷팅하기",
      "인증 토큰, 인코딩 문자열, 해시 값을 빠르게 확인하기",
      "리뷰 중 텍스트나 코드 조각의 차이를 비교하기",
      "로컬 스크립트 없이 브라우저에서 즉시 값 변환하기",
    ],
    valueTitle: "이 페이지들이 유용한 이유",
    valuePoints: [
      "설치 없이 바로 쓸 수 있는 빠른 브라우저 기반 워크플로",
      "출력 결과를 이해하는 데 도움이 되는 설명형 콘텐츠",
      "비슷한 디버깅 작업을 자연스럽게 이어 주는 관련 도구 링크",
      "회원가입 없이 바로 사용 가능한 구조",
    ],
    toolsTitle: "전체 개발 도구 보기",
    toolsDescription:
      "이 섹션은 디버깅, 점검, 인코딩, 변환처럼 개발 중 자주 필요한 작업에 초점을 맞춘 도구들로 구성되어 있습니다.",
    faqTitle: "개발 도구 FAQ",
    faq: [
      {
        q: "민감한 데이터를 넣어도 괜찮나요?",
        a: "많은 개발 도구가 브라우저 안에서만 동작하므로 민감한 디버깅 데이터 처리에 유리합니다. 다만 외부 데이터 소스를 사용하는 기능은 페이지에서 그 사실을 명확히 안내해야 합니다.",
      },
      {
        q: "IDE 플러그인을 완전히 대체하나요?",
        a: "아니요. 이 도구들은 빠른 확인, 디버깅, 공유 가능한 브라우저 워크플로에 적합하며, 완전한 로컬 개발 환경을 대체하려는 목적은 아닙니다.",
      },
      {
        q: "API 디버깅에는 어떤 도구부터 보는 것이 좋나요?",
        a: "JSON Formatter, JWT Decoder, Base64 Encoder / Decoder, URL Encoder / Decoder, Diff Checker가 가장 좋은 출발점입니다.",
      },
    ],
    guideTitle: "이 카테고리의 다음 확장 아이디어",
    guidePoints: [
      "서로 비슷한 도구를 비교해 주는 짧은 가이드",
      "일반적인 API 트러블슈팅 예시 워크플로",
      "JSON, JWT, Base64, 정규식을 쉽게 설명하는 참고 글",
    ],
  },
  text: {
    category: "text",
    title: "텍스트 도구",
    description:
      "텍스트의 길이 확인, 형식 변환, 미리보기, 더미 텍스트 생성 같은 작업을 빠르게 처리할 수 있는 브라우저 기반 도구 모음입니다.",
    intro: [
      "텍스트 카테고리는 무거운 에디터를 열기 전에 빠르게 처리하고 싶은 작업에 초점을 맞춥니다. 글자 수 확인, 케이스 변환, 플레이스홀더 텍스트 생성, Markdown 렌더링 확인 같은 흐름에 적합합니다.",
      "글쓰기, 문서 작성, 콘텐츠 검수, 간단한 협업 과정에서 자주 필요한 텍스트 작업을 예측 가능하고 빠르게 처리하는 것이 목표입니다.",
    ],
    tasksTitle: "이 카테고리에서 자주 하는 작업",
    tasks: [
      "게시 전 글자 수나 분량 제한 확인",
      "이름, 제목, 키 값을 다양한 케이스 형식으로 변환",
      "문서나 이슈에 올리기 전 Markdown 결과 미리보기",
      "디자인 시안과 초안용 더미 텍스트 생성",
    ],
    valueTitle: "이 페이지들이 유용한 이유",
    valuePoints: [
      "반복적인 텍스트 작업을 빠르게 처리하는 단순한 인터페이스",
      "다른 워크플로에 바로 붙여 넣기 쉬운 명확한 결과",
      "데스크톱과 모바일 모두에서 사용하기 쉬운 브라우저 기반 구조",
      "글쓰기와 편집 의도에 맞게 묶어 둔 보완형 도구 구성",
    ],
    toolsTitle: "전체 텍스트 도구 보기",
    toolsDescription:
      "이 페이지들은 글쓰기, 카피 편집, 콘텐츠 QA, 가벼운 포맷팅 작업을 지원합니다.",
    faqTitle: "텍스트 도구 FAQ",
    faq: [
      {
        q: "누가 이 텍스트 도구를 쓰면 좋나요?",
        a: "작가, 마케터, 학생, 개발자, 지원팀 등 빠른 텍스트 정리나 미리보기 작업이 필요한 누구에게나 유용합니다.",
      },
      {
        q: "입력한 텍스트를 저장하나요?",
        a: "대부분의 텍스트 도구는 브라우저 안에서 바로 붙여 넣고 확인하고 복사하는 흐름을 염두에 두고 설계되었습니다. 로컬 처리 여부는 각 도구와 개인정보 안내에서 확인할 수 있습니다.",
      },
      {
        q: "어떤 도구부터 시작하면 좋나요?",
        a: "분량 확인은 Word Counter, 형식 변환은 Case Converter, 렌더링 확인은 Markdown Previewer, 더미 텍스트 생성은 Lorem Ipsum Generator가 가장 적합합니다.",
      },
    ],
    guideTitle: "이 카테고리의 다음 확장 아이디어",
    guidePoints: [
      "여러 케이스 형식을 비교하는 짧은 가이드",
      "문서와 README용 Markdown 예시 모음",
      "글자 수 제한과 가독성 점검에 관한 실전 가이드",
    ],
  },
  finance: {
    category: "finance",
    title: "금융 및 계산기",
    description:
      "상환 계획, 금리 비교, 자산 성장 추정처럼 돈과 직접 연결된 질문에 답하는 고의도 참고용 계산기 모음입니다.",
    intro: [
      "금융 카테고리에는 대출 계산, 복리 계산, 퍼센트 계산, 환율 변환처럼 의도가 분명한 계획형 도구를 우선 배치했습니다. 질문에 빠르게 답하면서도 결과를 이해할 수 있는 설명을 함께 제공하는 데 초점을 맞춥니다.",
      "날짜, 단위, 팁 같은 보조 계산기도 함께 제공하지만, 핵심은 차입, 저축, 환산, 비용 비교처럼 돈과 직접 연결되는 상황을 돕는 것입니다.",
      "금융 관련 페이지는 신뢰 기대치가 높기 때문에, 결과를 전문가 조언처럼 제시하기보다 공식, 가정, 참고용 한계를 명확히 설명하는 방향으로 구성했습니다.",
    ],
    tasksTitle: "이 카테고리에서 자주 하는 작업",
    tasks: [
      "대출 조건과 상환 방식을 비교해 월 부담액 추정하기",
      "저축 또는 투자 성장과 정기 납입 효과 시뮬레이션하기",
      "할인율, 날짜 차이, 단위 변환을 계획 과정에서 빠르게 계산하기",
      "국가별 비용 비교 중 환율과 단위를 함께 확인하기",
    ],
    valueTitle: "이 페이지들이 유용한 이유",
    valuePoints: [
      "실제 계획 질문에 바로 연결되는 고의도 페이지 구성",
      "공식과 상환 구조를 쉽게 설명하는 평이한 문구",
      "금융 판단에 대한 기대치를 조정해 주는 참고용 안내",
      "비교 검토를 이어 가기 쉬운 관련 계산기 묶음",
    ],
    toolsTitle: "전체 금융 및 계산기 도구 보기",
    toolsDescription:
      "이 도구들은 예산, 계획, 변환, 빠른 참고 계산에 적합합니다. 전문적인 금융 조언을 대체하지는 않습니다.",
    faqTitle: "금융 및 계산기 FAQ",
    faq: [
      {
        q: "이 계산 결과가 금융 조언인가요?",
        a: "아니요. 이 도구들은 추정과 계획을 돕기 위한 참고용 계산기입니다. 실제 금리, 수수료, 세금, 승인 조건은 기관과 개인 상황에 따라 달라집니다.",
      },
      {
        q: "왜 금융 페이지는 신뢰 설명이 중요한가요?",
        a: "방문자가 실제 돈과 관련된 결정을 검토할 때 사용하기 때문입니다. 공식과 가정, 한계를 명확히 설명해야 결과를 과신하지 않게 할 수 있습니다.",
      },
      {
        q: "고의도 방문자에게 특히 적합한 페이지는 무엇인가요?",
        a: "Loan Calculator, Compound Interest Calculator, Currency Converter는 일반 유틸리티보다 더 뚜렷한 계획 의도와 상업적 의도를 갖는 경우가 많습니다.",
      },
    ],
    guideTitle: "이 카테고리의 다음 확장 아이디어",
    guidePoints: [
      "모기지, APR, 리파이낸스, 신용카드 상환 계산기",
      "국가별 금융 상황을 설명하는 보조 가이드",
      "어떤 계산기를 언제 써야 하는지 비교하는 안내 글",
    ],
  },
};

export function getCategoryHubContent(
  category: ToolCategory,
  locale: Locale
): CategoryHubContent {
  if (locale === "ko") {
    return KO_CATEGORY_HUBS[category] ?? CATEGORY_HUBS[category];
  }

  return CATEGORY_HUBS[category];
}

import type { Locale } from "@/i18n/config";
import type { ToolContent } from "@/lib/seo";

const KO_TOOL_PAGE_CONTENT: Record<string, ToolContent> = {
  "json-formatter": {
    title: "JSON 포맷터 / 검증기",
    description: "JSON 데이터를 정렬하고 문법 오류를 확인하며 보기 좋은 형태로 변환할 수 있는 브라우저 기반 도구입니다.",
    whatIs:
      "JSON 포맷터와 검증기는 API 응답, 설정 파일, 로그 데이터를 읽기 쉬운 형태로 정리하고 문법 오류를 빠르게 찾는 도구입니다. 긴 한 줄 JSON을 들여쓰기된 구조로 바꾸거나, 반대로 용량을 줄이기 위해 압축할 수 있습니다.",
    howToUse:
      "1. 왼쪽 입력 영역에 JSON을 붙여넣습니다. 2. Format, Minify, Validate, Sort Keys 중 원하는 모드를 선택합니다. 3. 필요하면 들여쓰기 방식을 고릅니다. 4. 오른쪽 결과를 확인한 뒤 복사하거나 파일로 저장합니다.",
    howItWorks:
      "이 도구는 브라우저의 JSON.parse와 JSON.stringify를 사용해 입력을 분석하고 다시 출력합니다. 문법 오류가 있으면 파싱 단계에서 즉시 감지하고, 정렬 모드에서는 객체 키를 재귀적으로 정렬합니다. 처리 과정은 브라우저 안에서만 이루어집니다.",
    useCases: [
      "API 응답 데이터를 디버깅할 때",
      "설정 파일의 문법 오류를 빠르게 확인할 때",
      "버전 관리에서 비교하기 쉬운 JSON으로 정리할 때",
    ],
    faq: [
      {
        q: "입력한 JSON이 서버로 전송되나요?",
        a: "아니요. JSON 포맷팅과 검증은 브라우저 안에서 처리됩니다.",
      },
      {
        q: "유효하지 않은 JSON도 확인할 수 있나요?",
        a: "네. Validate 모드에서 문법 오류 여부를 확인할 수 있습니다.",
      },
      {
        q: "키 정렬은 중첩 객체에도 적용되나요?",
        a: "네. Sort Keys 모드는 중첩된 객체까지 재귀적으로 정렬합니다.",
      },
    ],
  },
  base64: {
    title: "Base64 인코더 / 디코더",
    description: "텍스트와 파일을 Base64로 인코딩하거나 다시 디코딩할 수 있는 브라우저 기반 도구입니다.",
    whatIs:
      "Base64는 바이너리 데이터를 텍스트 형태로 안전하게 전달하기 위해 자주 사용하는 인코딩 방식입니다. 이메일 첨부, 데이터 URI, API 전송 등에서 흔히 사용됩니다. 이 도구는 문자열과 파일 데이터를 빠르게 Base64로 바꾸거나 원래 값으로 되돌릴 수 있습니다.",
    howToUse:
      "1. 인코딩하거나 디코딩할 텍스트를 입력합니다. 2. 필요한 경우 파일을 업로드합니다. 3. 인코드 또는 디코드 결과를 확인하고 복사하거나 다운로드합니다.",
    howItWorks:
      "브라우저의 인코딩 기능과 FileReader API를 활용해 텍스트와 파일을 처리합니다. 데이터는 로컬에서 변환되며, 사용자가 업로드한 내용이 외부 서버로 전송되지 않습니다.",
    useCases: [
      "파일 내용을 텍스트로 전달해야 할 때",
      "Base64 문자열을 원문으로 복원할 때",
      "데이터 URI나 간단한 API 테스트를 할 때",
    ],
    faq: [
      { q: "이미지도 변환할 수 있나요?", a: "네. 파일 업로드를 통해 이미지나 기타 파일도 Base64 문자열로 변환할 수 있습니다." },
      { q: "디코딩 결과가 깨질 수 있나요?", a: "입력값이 유효한 Base64가 아니면 올바르게 디코딩되지 않을 수 있습니다." },
      { q: "데이터는 어디서 처리되나요?", a: "모든 변환은 브라우저 안에서 로컬로 처리됩니다." },
    ],
  },
  "jwt-decoder": {
    title: "JWT 디코더",
    description: "JWT 토큰의 헤더, 페이로드, 만료 정보 등을 빠르게 확인할 수 있는 도구입니다.",
    whatIs:
      "JWT 디코더는 JSON Web Token을 사람이 읽을 수 있는 형태로 풀어 보여주는 도구입니다. 인증과 권한 부여 흐름을 디버깅할 때 헤더, 클레임, 만료 시점, 서명 파트 구조를 확인하는 데 유용합니다.",
    howToUse:
      "1. JWT 문자열을 입력합니다. 2. 디코딩된 헤더와 페이로드를 확인합니다. 3. exp, iat, nbf 같은 시간 기반 클레임을 사람이 읽기 쉬운 값으로 확인합니다.",
    howItWorks:
      "JWT는 점으로 구분된 세 부분으로 구성되며, 이 도구는 각 파트를 Base64URL 규칙에 따라 디코딩합니다. 서명을 검증하는 도구는 아니지만, 토큰 구조와 주요 클레임을 빠르게 읽는 데 도움을 줍니다.",
    useCases: [
      "로그인 또는 인증 흐름 디버깅",
      "토큰 만료 시점 확인",
      "클레임 값이 기대한 대로 들어갔는지 검토",
    ],
    faq: [
      { q: "서명 검증도 하나요?", a: "아니요. 이 도구는 주로 디코딩과 읽기 목적에 초점을 둡니다." },
      { q: "토큰이 서버로 전송되나요?", a: "아니요. 브라우저 안에서만 디코딩됩니다." },
      { q: "만료 여부도 볼 수 있나요?", a: "네. exp 같은 클레임을 바탕으로 만료 상태를 표시합니다." },
    ],
  },
  "url-encoder": {
    title: "URL 인코더 / 디코더",
    description: "URL과 쿼리 문자열을 퍼센트 인코딩하거나 원래 값으로 복원하는 도구입니다.",
    whatIs:
      "URL 인코더와 디코더는 공백, 특수문자, 한글처럼 URL에서 직접 쓰기 어려운 값을 안전한 형태로 바꾸거나 다시 복원하는 도구입니다. 쿼리 파라미터, 경로, API 호출 테스트에 자주 사용됩니다.",
    howToUse:
      "1. 입력값에 URL 또는 문자열을 넣습니다. 2. 인코드 또는 디코드 모드를 선택합니다. 3. 결과를 확인한 뒤 복사합니다.",
    howItWorks:
      "브라우저의 URL 관련 인코딩 함수를 사용해 입력 문자열을 퍼센트 인코딩 형식으로 변환하거나 반대로 해석합니다. 모든 작업은 로컬에서 처리됩니다.",
    useCases: [
      "쿼리 파라미터를 안전하게 만들 때",
      "퍼센트 인코딩된 URL을 읽기 쉽게 복원할 때",
      "API 테스트 도중 경로 문자열을 정리할 때",
    ],
    faq: [
      { q: "전체 URL과 파라미터를 같은 방식으로 인코딩하나요?", a: "상황에 따라 다릅니다. 전체 URL과 개별 파라미터는 보통 다른 함수가 적합합니다." },
      { q: "한글도 처리되나요?", a: "네. URL에서 직접 쓰기 어려운 문자도 안전한 인코딩 형태로 바꿀 수 있습니다." },
      { q: "서버 전송이 있나요?", a: "아니요. 브라우저 안에서만 처리됩니다." },
    ],
  },
  "regex-tester": {
    title: "정규식 테스터",
    description: "정규식을 입력하고 실시간으로 매치 결과를 확인할 수 있는 테스트 도구입니다.",
    whatIs:
      "정규식 테스터는 패턴이 어떤 문자열과 일치하는지 확인하고, 그룹 캡처와 치환 결과까지 검토할 수 있는 도구입니다. 검증 규칙, 검색 패턴, 텍스트 정리 로직을 빠르게 실험할 때 유용합니다.",
    howToUse:
      "1. 정규식 패턴을 입력합니다. 2. 필요한 플래그를 켭니다. 3. 테스트할 문자열을 넣고 결과를 확인합니다. 4. 필요하면 치환 문자열을 넣어 replace 결과도 봅니다.",
    howItWorks:
      "브라우저의 RegExp 객체를 사용해 패턴과 입력 문자열을 매칭합니다. 전역 검색, 대소문자 무시, 멀티라인 같은 플래그를 조합할 수 있고, 일치한 위치와 캡처 그룹도 함께 보여줍니다.",
    useCases: [
      "입력값 검증 패턴 테스트",
      "로그나 텍스트에서 특정 형식 추출",
      "replace 규칙을 적용하기 전 결과 미리보기",
    ],
    faq: [
      { q: "정규식 플래그도 설정할 수 있나요?", a: "네. g, i, m, s, u 같은 플래그를 켜고 끌 수 있습니다." },
      { q: "치환 결과도 볼 수 있나요?", a: "네. replacement 문자열을 입력하면 replace 결과를 함께 확인할 수 있습니다." },
      { q: "패턴 예시가 있나요?", a: "자주 쓰는 패턴 프리셋을 통해 빠르게 시작할 수 있습니다." },
    ],
  },
  "hash-generator": {
    title: "해시 생성기",
    description: "텍스트나 파일에 대해 MD5, SHA 계열 해시 값을 생성할 수 있는 도구입니다.",
    whatIs:
      "해시 생성기는 입력값을 고정 길이의 요약값으로 변환하는 도구입니다. 무결성 확인, 파일 비교, 간단한 테스트 용도로 많이 사용되며, MD5, SHA-1, SHA-256, SHA-384, SHA-512 같은 알고리즘을 지원합니다.",
    howToUse:
      "1. 텍스트를 입력하거나 파일을 업로드합니다. 2. 생성된 해시 값을 알고리즘별로 확인합니다. 3. 필요한 값을 복사해서 사용합니다.",
    howItWorks:
      "브라우저의 Web Crypto API와 로컬 처리 로직을 사용해 입력값으로부터 해시를 계산합니다. 입력 원문은 외부로 전송되지 않습니다.",
    useCases: [
      "파일 무결성 비교",
      "배포 전후 결과 값 확인",
      "테스트 데이터의 해시 요약값 생성",
    ],
    faq: [
      { q: "비밀번호 암호화 용도로 적합한가요?", a: "일반 해시는 비밀번호 저장용으로 적합하지 않습니다. 비밀번호는 전용 해시/키 스트레칭 알고리즘을 사용해야 합니다." },
      { q: "파일도 해시할 수 있나요?", a: "네. 파일 업로드를 통해 파일 해시 값을 계산할 수 있습니다." },
      { q: "서버에 업로드되나요?", a: "아니요. 계산은 브라우저 안에서 처리됩니다." },
    ],
  },
  "password-generator": {
    title: "비밀번호 생성기",
    description: "강력한 랜덤 비밀번호와 기억하기 쉬운 패스프레이즈를 브라우저에서 생성하는 도구입니다.",
    whatIs:
      "비밀번호 생성기는 계정 보안에 필요한 무작위 비밀번호를 빠르게 만드는 도구입니다. 대문자, 소문자, 숫자, 특수문자 조합을 선택할 수 있고, 기억하기 쉬운 단어 기반 패스프레이즈도 함께 생성할 수 있습니다.",
    howToUse:
      "1. 비밀번호 길이를 정합니다. 2. 포함할 문자 종류를 선택합니다. 3. 필요하면 모호한 문자 제외 옵션을 켭니다. 4. 패스워드 또는 패스프레이즈 모드를 고른 뒤 결과를 복사합니다.",
    howItWorks:
      "브라우저의 Web Crypto API를 사용해 암호학적으로 안전한 난수를 생성하고, 선택한 문자 집합이나 단어 목록에서 값을 조합합니다. 생성 과정은 브라우저 안에서만 이루어집니다.",
    useCases: [
      "온라인 계정용 강력한 비밀번호 생성",
      "마스터 비밀번호용 패스프레이즈 초안 만들기",
      "테스트용 시크릿 문자열이나 토큰 생성",
    ],
    faq: [
      { q: "생성된 비밀번호는 정말 무작위인가요?", a: "네. 브라우저의 안전한 난수 생성 기능을 사용하므로 일반적인 임의 문자열보다 신뢰도가 높습니다." },
      { q: "생성한 비밀번호가 서버로 전송되나요?", a: "아니요. 모든 생성은 브라우저 안에서만 처리되며 외부로 전송되지 않습니다." },
      { q: "패스프레이즈가 일반 비밀번호보다 더 좋은가요?", a: "상황에 따라 다릅니다. 긴 랜덤 비밀번호는 강도가 높고, 충분히 긴 패스프레이즈는 기억하기 쉬운 장점이 있습니다." },
    ],
  },
  "diff-checker": {
    title: "텍스트 비교기",
    description: "두 텍스트를 비교해 차이점을 시각적으로 확인할 수 있는 도구입니다.",
    whatIs:
      "텍스트 비교기는 두 개의 문자열, 문서 조각, 코드 스니펫 사이의 차이를 찾아주는 도구입니다. 변경된 부분을 빠르게 파악하고, 리뷰나 수정 전후 차이를 확인할 때 유용합니다.",
    howToUse:
      "1. 왼쪽과 오른쪽 입력 영역에 비교할 텍스트를 넣습니다. 2. 결과 영역에서 추가, 삭제, 변경된 부분을 확인합니다. 3. 필요하면 차이 결과를 복사합니다.",
    howItWorks:
      "브라우저에서 diff 알고리즘을 실행해 두 입력값을 비교하고, 변경된 구간을 시각적으로 구분해 보여줍니다. 서버 업로드 없이 로컬에서 처리됩니다.",
    useCases: [
      "수정 전후 문장 비교",
      "설정 파일이나 코드 일부 변경 사항 확인",
      "문서 검수 중 차이 추적",
    ],
    faq: [
      { q: "긴 텍스트도 비교할 수 있나요?", a: "대부분의 일반적인 텍스트 비교에는 충분하지만, 매우 큰 입력은 브라우저 성능에 영향을 줄 수 있습니다." },
      { q: "코드 비교에도 쓸 수 있나요?", a: "네. 코드 조각, 설정 파일, 텍스트 문서 모두 비교할 수 있습니다." },
      { q: "데이터가 저장되나요?", a: "아니요. 비교는 로컬에서 실행됩니다." },
    ],
  },
  "color-picker": {
    title: "색상 선택기 / 변환기",
    description: "HEX, RGB, HSL 등 다양한 색상 형식 간 변환과 조합 확인을 도와주는 도구입니다.",
    whatIs:
      "색상 선택기와 변환기는 디자인과 개발에서 사용하는 색상 값을 쉽게 선택하고 다른 포맷으로 바꾸는 도구입니다. HEX, RGB, HSL, HSV, CMYK 변환과 대비 확인, 팔레트 생성에 활용할 수 있습니다.",
    howToUse:
      "1. 색상 선택기에서 원하는 색을 고르거나 직접 값을 입력합니다. 2. 다른 형식의 색상 값을 확인합니다. 3. 대비나 추천 팔레트를 함께 검토합니다.",
    howItWorks:
      "입력된 색상 값을 내부적으로 변환 공식에 따라 다른 색상 체계로 계산합니다. 명도, 채도, hue 정보를 바탕으로 팔레트와 대비 수치도 함께 계산합니다.",
    useCases: [
      "디자인 시안용 색상 값 확인",
      "HEX와 RGB/HSL 변환",
      "텍스트와 배경의 대비 비율 확인",
    ],
    faq: [
      { q: "접근성 대비도 볼 수 있나요?", a: "네. 대비 관련 정보를 통해 색상 조합을 검토할 수 있습니다." },
      { q: "팔레트 추천도 제공하나요?", a: "네. 보색, 유사색, 삼각 배색 같은 조합을 확인할 수 있습니다." },
      { q: "컬러 값 복사는 가능한가요?", a: "네. 필요한 형식의 값을 복사해 바로 사용할 수 있습니다." },
    ],
  },
  "timestamp-converter": {
    title: "타임스탬프 변환기",
    description: "유닉스 타임스탬프와 사람이 읽는 날짜/시간 형식을 서로 변환하는 도구입니다.",
    whatIs:
      "타임스탬프 변환기는 Unix timestamp를 일반 날짜와 시간으로 바꾸거나, 반대로 날짜를 타임스탬프로 계산하는 도구입니다. API 응답, 로그, 토큰 만료 시각처럼 시간 값을 빠르게 확인할 때 유용합니다.",
    howToUse:
      "1. 초 또는 밀리초 단위 타임스탬프를 입력합니다. 2. ISO, 현지 시간, 상대 시간 등 여러 형식의 결과를 확인합니다. 3. 반대로 날짜를 입력해 타임스탬프 값을 얻을 수도 있습니다.",
    howItWorks:
      "JavaScript의 Date 객체와 Intl API를 사용해 날짜를 해석하고 여러 형식으로 변환합니다. 큰 수는 밀리초, 일반적인 10자리 값은 초 단위로 구분해 처리하며 계산은 브라우저 안에서만 이루어집니다.",
    useCases: [
      "API 응답의 시간 값을 읽기 쉬운 날짜로 변환",
      "로그나 이벤트 시간 비교",
      "JWT나 OAuth 만료 시각 확인",
    ],
    faq: [
      { q: "초와 밀리초 타임스탬프 차이는 무엇인가요?", a: "일반적으로 초 단위는 10자리, 밀리초 단위는 13자리입니다. 이 도구는 입력 크기를 보고 자동으로 구분합니다." },
      { q: "시간대도 함께 볼 수 있나요?", a: "네. UTC와 브라우저의 현지 시간대를 함께 표시해 시간 차이를 확인할 수 있습니다." },
      { q: "음수 타임스탬프도 지원하나요?", a: "네. 1970년 1월 1일 이전 날짜도 음수 타임스탬프로 계산할 수 있습니다." },
    ],
  },
  "qr-code": {
    title: "QR 코드 생성기",
    description: "텍스트나 URL로 QR 코드를 만들고 크기, 색상, 오류 정정 수준을 조절할 수 있는 도구입니다.",
    whatIs:
      "QR 코드 생성기는 짧은 텍스트, 링크, 안내 문구 등을 QR 코드 이미지로 변환하는 도구입니다. 인쇄물, 발표 자료, 메뉴판, 제품 포장처럼 휴대폰으로 바로 열어야 하는 정보를 공유할 때 유용합니다.",
    howToUse:
      "1. 텍스트나 URL을 입력합니다. 2. 코드 크기와 전경색, 배경색을 조절합니다. 3. 오류 정정 수준을 선택합니다. 4. 생성된 QR 코드를 PNG로 저장하거나 복사합니다.",
    howItWorks:
      "브라우저 안의 JavaScript 로직이 입력값을 QR 코드 매트릭스로 인코딩하고 캔버스에 그립니다. 오류 정정 코드는 함께 계산되며, 모든 처리는 로컬에서만 실행됩니다.",
    useCases: [
      "웹사이트 링크를 포스터나 명함에 넣을 때",
      "행사 안내나 제품 정보로 연결할 때",
      "간단한 텍스트를 스캔 가능한 형태로 공유할 때",
    ],
    faq: [
      { q: "QR 코드 색상을 바꿔도 되나요?", a: "네. 전경색과 배경색을 자유롭게 바꿀 수 있지만, 스캔이 잘 되려면 두 색상 사이 대비가 충분해야 합니다." },
      { q: "오류 정정 수준은 무엇인가요?", a: "QR 코드 일부가 가려지거나 손상돼도 읽을 수 있도록 여유 정보를 넣는 설정입니다. 수준이 높을수록 더 견고하지만 코드 밀도도 높아집니다." },
      { q: "입력한 텍스트가 서버로 전송되나요?", a: "아니요. QR 코드는 브라우저 안에서만 생성됩니다." },
    ],
  },
  "word-counter": {
    title: "단어 / 글자 수 카운터",
    description: "텍스트의 단어 수, 글자 수, 문장 수, 예상 읽기 시간을 계산하는 도구입니다.",
    whatIs:
      "단어 및 글자 수 카운터는 작성 중인 텍스트의 길이를 빠르게 파악하는 데 쓰는 도구입니다. 글 수 제한이 있는 문서, 게시물, 요약문을 작성할 때 유용합니다.",
    howToUse:
      "1. 텍스트를 입력하거나 붙여넣습니다. 2. 단어 수, 글자 수, 문장 수, 읽기 시간 정보를 확인합니다. 3. 필요하면 텍스트를 수정하며 실시간으로 결과를 확인합니다.",
    howItWorks:
      "입력 문자열을 공백, 문장 부호, 문자 수 기준으로 분석해 각 통계를 계산합니다. 모든 계산은 브라우저 안에서 즉시 처리됩니다.",
    useCases: [
      "글자 수 제한이 있는 원고 점검",
      "요약문 길이 확인",
      "콘텐츠 작성 중 분량 관리",
    ],
    faq: [
      { q: "공백 포함 글자 수도 계산하나요?", a: "보통 공백 포함/제외 기준을 함께 확인할 수 있습니다." },
      { q: "읽기 시간은 어떻게 계산되나요?", a: "일반적인 읽기 속도를 기준으로 대략적인 시간을 추정합니다." },
      { q: "입력한 문장이 저장되나요?", a: "아니요. 브라우저 내에서만 처리됩니다." },
    ],
  },
  "case-converter": {
    title: "대소문자 변환기",
    description: "텍스트를 대문자, 소문자, 제목형, camelCase 등으로 빠르게 바꾸는 도구입니다.",
    whatIs:
      "대소문자 변환기는 같은 텍스트를 여러 형식으로 바꿔야 할 때 유용한 도구입니다. 코드 변수명, 제목, 문장 정리, 데이터 정제 작업에 자주 쓰입니다.",
    howToUse:
      "1. 변환할 텍스트를 입력합니다. 2. 원하는 케이스 형식을 선택합니다. 3. 결과를 복사해 필요한 곳에 붙여넣습니다.",
    howItWorks:
      "문자열을 단어 단위로 분리한 뒤 각 형식의 규칙에 맞게 대소문자와 구분자를 다시 조합합니다. 처리 과정은 브라우저 안에서 실행됩니다.",
    useCases: [
      "변수명과 키 이름 형식 통일",
      "문장이나 제목 케이스 정리",
      "복붙한 텍스트를 원하는 형식으로 빠르게 변환",
    ],
    faq: [
      { q: "camelCase와 snake_case도 지원하나요?", a: "네. 여러 프로그래밍/문서용 케이스를 지원합니다." },
      { q: "긴 텍스트도 바꿀 수 있나요?", a: "네. 일반적인 텍스트는 바로 변환할 수 있습니다." },
      { q: "원문이 저장되나요?", a: "아니요. 로컬에서만 처리됩니다." },
    ],
  },
  "lorem-ipsum": {
    title: "Lorem Ipsum 생성기",
    description: "디자인 시안과 초안 작성에 사용할 더미 텍스트를 생성하는 도구입니다.",
    whatIs:
      "Lorem Ipsum 생성기는 레이아웃 검토나 목업 제작에 필요한 placeholder 텍스트를 빠르게 만드는 도구입니다. 문단 수, 문장 길이, 시작 문구 여부 등을 조절할 수 있습니다.",
    howToUse:
      "1. 생성할 문단 또는 문장 수를 선택합니다. 2. 옵션을 설정합니다. 3. 생성된 텍스트를 복사하거나 다운로드합니다.",
    howItWorks:
      "미리 정의된 Lorem Ipsum 텍스트 조각을 기준으로 사용자가 선택한 길이에 맞춰 문장을 구성합니다. 생성 결과는 브라우저에서 바로 확인할 수 있습니다.",
    useCases: [
      "디자인 목업용 더미 텍스트 생성",
      "문서 템플릿 레이아웃 테스트",
      "초안 페이지의 타이포그래피 확인",
    ],
    faq: [
      { q: "생성된 문구는 자유롭게 써도 되나요?", a: "네. 일반적인 더미 텍스트 용도로 자유롭게 사용할 수 있습니다." },
      { q: "문단 수를 조절할 수 있나요?", a: "네. 생성 길이를 옵션으로 조절할 수 있습니다." },
      { q: "한 번에 복사할 수 있나요?", a: "네. 생성된 결과를 바로 복사하거나 저장할 수 있습니다." },
    ],
  },
  "markdown-preview": {
    title: "Markdown 미리보기",
    description: "Markdown 문서를 입력하고 렌더링 결과를 실시간으로 확인할 수 있는 도구입니다.",
    whatIs:
      "Markdown 미리보기 도구는 README, 문서, 메모를 작성할 때 원본 Markdown과 렌더링 결과를 함께 확인할 수 있게 해줍니다. GitHub 스타일 문서 작성 전에 결과를 검토할 때 유용합니다.",
    howToUse:
      "1. 왼쪽 입력 영역에 Markdown을 작성합니다. 2. 오른쪽 미리보기에서 렌더링 결과를 확인합니다. 3. 필요하면 복사하거나 수정합니다.",
    howItWorks:
      "Markdown 파서를 이용해 입력 텍스트를 HTML로 렌더링하고, 브라우저 안에서 안전하게 표시합니다. 처리와 미리보기는 즉시 반영됩니다.",
    useCases: [
      "README 초안 작성",
      "문서 게시 전 렌더링 확인",
      "Markdown 문법 테스트",
    ],
    faq: [
      { q: "실시간 미리보기가 되나요?", a: "네. 입력과 동시에 결과가 갱신됩니다." },
      { q: "GitHub용 문서에도 쓸 수 있나요?", a: "네. README나 이슈 본문 초안 검토에 유용합니다." },
      { q: "HTML을 바로 볼 수 있나요?", a: "렌더링된 결과를 미리보기로 확인할 수 있습니다." },
    ],
  },
  "ascii-art": {
    title: "ASCII 아트 생성기",
    description: "텍스트를 FIGlet 스타일의 ASCII 아트 배너로 변환하는 도구입니다.",
    whatIs:
      "ASCII 아트 생성기는 일반 텍스트를 여러 줄의 문자 배너 형태로 바꿔 주는 도구입니다. 터미널 헤더, README 제목, 레트로 스타일 장식 텍스트처럼 시각적인 강조가 필요한 곳에 쓰기 좋습니다.",
    howToUse:
      "1. 텍스트를 입력합니다. 2. 원하는 폰트 스타일을 선택합니다. 3. 미리보기 결과를 확인한 뒤 복사합니다. 4. 출력 너비를 보고 터미널이나 문서 폭에 맞는지 점검합니다.",
    howItWorks:
      "각 폰트는 문자별 여러 줄 패턴으로 정의되어 있으며, 입력된 문자를 순서대로 이어 붙여 최종 배너를 만듭니다. 별도 서버 없이 브라우저 안에서 바로 변환됩니다.",
    useCases: [
      "CLI 도구나 스크립트 헤더 꾸미기",
      "README 제목이나 주석 배너 만들기",
      "레트로 스타일 텍스트 장식 제작",
    ],
    faq: [
      { q: "어떤 폰트를 지원하나요?", a: "기본 FIGlet 스타일을 포함한 여러 배너형 폰트를 선택할 수 있습니다." },
      { q: "소문자도 입력할 수 있나요?", a: "네. 입력은 자유롭게 가능하며, 렌더링은 폰트 정의에 맞춰 처리됩니다." },
      { q: "입력 텍스트가 서버로 전송되나요?", a: "아니요. 변환은 브라우저 안에서만 실행됩니다." },
    ],
  },
  "emoji-picker": {
    title: "이모지 선택기",
    description: "카테고리별로 이모지를 찾아보고 검색하고 한 번에 복사할 수 있는 도구입니다.",
    whatIs:
      "이모지 선택기는 자주 쓰는 이모지를 쉽게 찾고 복사할 수 있게 해 주는 도구입니다. 운영체제 기본 이모지 키보드를 열지 않아도 카테고리 탐색, 검색, 최근 사용 목록, 피부 톤 선택을 한 화면에서 사용할 수 있습니다.",
    howToUse:
      "1. 상단 검색창에 키워드를 입력하거나 카테고리를 선택합니다. 2. 원하는 이모지를 클릭하면 바로 복사됩니다. 3. 필요하면 피부 톤을 선택해 지원 이모지에 적용합니다.",
    howItWorks:
      "미리 정의된 이모지 목록과 이름, 키워드 데이터를 바탕으로 브라우저에서 실시간 검색을 수행합니다. 복사는 Clipboard API를 사용하며, 최근 사용 목록은 localStorage에 저장됩니다.",
    useCases: [
      "메신저나 SNS 게시물에 이모지 빠르게 넣기",
      "이모지 검색으로 적절한 표현 찾기",
      "자주 쓰는 이모지를 최근 목록으로 관리하기",
    ],
    faq: [
      { q: "설치 없이 사용할 수 있나요?", a: "네. 웹 브라우저에서 바로 사용할 수 있으며 별도 설치가 필요하지 않습니다." },
      { q: "피부 톤 선택은 어떻게 적용되나요?", a: "지원하는 사람/손 이모지에는 선택한 피부 톤 수정자가 적용됩니다." },
      { q: "최근 사용 이모지는 어디에 저장되나요?", a: "사용 기록은 현재 브라우저의 localStorage에만 저장되며 서버로 전송되지 않습니다." },
    ],
  },
  "percentage-calculator": {
    title: "퍼센트 계산기",
    description: "퍼센트 값, 비율, 증감률, 할인 또는 마크업을 빠르게 계산할 수 있는 도구입니다.",
    whatIs:
      "퍼센트 계산기는 할인율, 인상률, 부분과 전체의 비율처럼 퍼센트와 관련된 여러 계산을 한 페이지에서 처리할 수 있는 도구입니다. 일상 계산과 업무 계산 모두에 유용합니다.",
    howToUse:
      "1. 필요한 계산 유형을 선택합니다. 2. 숫자를 입력합니다. 3. 결과 카드에서 퍼센트 값이나 최종 금액을 확인합니다.",
    howItWorks:
      "기본 퍼센트 계산식과 증감률 계산식을 사용해 결과를 즉시 계산합니다. 입력값은 브라우저 안에서만 처리됩니다.",
    useCases: [
      "할인 금액 계산",
      "증감률 확인",
      "부분이 전체에서 차지하는 비율 계산",
    ],
    faq: [
      { q: "할인과 마크업을 모두 계산할 수 있나요?", a: "네. 퍼센트를 더하거나 빼는 두 가지 모드를 지원합니다." },
      { q: "소수점도 입력할 수 있나요?", a: "네. 일반적인 실수 입력을 지원합니다." },
      { q: "여러 계산 유형이 있나요?", a: "네. 기본 퍼센트, 역산, 변화율, 적용 계산 등을 제공합니다." },
    ],
  },
  "tip-calculator": {
    title: "팁 계산기",
    description: "팁 금액과 인원별 분할 금액을 빠르게 계산할 수 있는 도구입니다.",
    whatIs:
      "팁 계산기는 음식값에 대해 적절한 팁 금액을 계산하고, 여러 명이 함께 계산할 때 1인당 부담 금액까지 보여주는 도구입니다.",
    howToUse:
      "1. 총 금액을 입력합니다. 2. 팁 비율과 인원 수를 설정합니다. 3. 필요하면 반올림 옵션을 적용합니다. 4. 총 팁과 1인당 금액을 확인합니다.",
    howItWorks:
      "청구 금액에 팁 비율을 곱해 팁 금액을 계산하고, 총합을 인원 수로 나눠 각자 부담액을 계산합니다. 로컬 계산만 사용합니다.",
    useCases: [
      "식사 후 팁 계산",
      "친구들과 비용 분할",
      "반올림한 금액으로 깔끔하게 정산",
    ],
    faq: [
      { q: "인원 수까지 나눌 수 있나요?", a: "네. 여러 명이 함께 낼 때 1인당 금액을 계산할 수 있습니다." },
      { q: "팁 비율은 직접 입력 가능한가요?", a: "네. 프리셋과 직접 입력을 모두 지원할 수 있습니다." },
      { q: "반올림 금액도 확인할 수 있나요?", a: "네. 정산이 쉬운 값으로 조정할 수 있습니다." },
    ],
  },
  "age-calculator": {
    title: "나이 계산기",
    description: "생년월일을 기준으로 현재 나이와 총 일수, 다음 생일까지 남은 기간을 계산하는 도구입니다.",
    whatIs:
      "나이 계산기는 태어난 날짜를 기준으로 연, 월, 일 단위의 나이를 계산하고, 총 생존 일수나 다음 생일까지 남은 시간처럼 부가 정보를 함께 보여주는 도구입니다.",
    howToUse:
      "1. 생년월일을 선택합니다. 2. 현재 나이와 추가 통계를 확인합니다. 3. 필요하면 두 날짜 사이의 기간 계산도 함께 사용합니다.",
    howItWorks:
      "브라우저의 날짜 연산을 이용해 기준일과 비교일의 차이를 계산하고, 연월일과 총 일수 등 다양한 단위로 결과를 정리합니다.",
    useCases: [
      "정확한 만 나이 확인",
      "다음 생일까지 남은 기간 계산",
      "두 날짜 사이 기간 비교",
    ],
    faq: [
      { q: "오늘 기준으로 계산되나요?", a: "네. 현재 날짜를 기준으로 나이를 계산합니다." },
      { q: "생일까지 남은 날짜도 나오나요?", a: "네. 다음 생일까지 남은 기간을 함께 보여줍니다." },
      { q: "기간 계산도 가능하나요?", a: "네. 추가적으로 두 날짜 사이 간격을 계산할 수 있습니다." },
    ],
  },
  "data-converter": {
    title: "데이터 저장 단위 변환기",
    description: "B, KB, MB, GB, TB 등 저장 용량 단위를 빠르게 변환하는 도구입니다.",
    whatIs:
      "데이터 저장 단위 변환기는 파일 크기나 저장 공간을 비교할 때 자주 사용하는 용량 단위를 서로 변환하는 도구입니다. 바이트부터 테라바이트 이상 단위까지 쉽게 계산할 수 있습니다.",
    howToUse:
      "1. 값을 입력합니다. 2. 기준 단위를 선택합니다. 3. 다른 단위로 변환된 결과를 한 번에 확인합니다.",
    howItWorks:
      "기준 단위를 중심으로 각 저장 단위를 환산해 계산합니다. 모든 변환은 브라우저 안에서 즉시 처리됩니다.",
    useCases: [
      "파일 크기 비교",
      "저장 공간 계산",
      "네트워크나 디스크 용량 단위 확인",
    ],
    faq: [
      { q: "KB와 KiB 차이도 고려하나요?", a: "지원하는 단위 체계에 따라 표시 방식이 달라질 수 있으니 기준을 함께 확인하는 것이 좋습니다." },
      { q: "결과를 한 번에 복사할 수 있나요?", a: "네. 전체 변환 결과를 복사할 수 있습니다." },
      { q: "대용량 단위도 계산 가능한가요?", a: "네. 일반적인 저장 단위 변환에 사용할 수 있습니다." },
    ],
  },
  "unit-converter": {
    title: "단위 변환기",
    description: "길이, 무게, 온도, 부피 등 다양한 단위를 상호 변환하는 범용 도구입니다.",
    whatIs:
      "단위 변환기는 일상과 업무에서 자주 쓰는 여러 측정 단위를 한 페이지에서 변환할 수 있는 도구입니다. 길이, 무게, 온도, 면적, 속도, 데이터 단위 등을 빠르게 비교할 수 있습니다.",
    howToUse:
      "1. 카테고리를 선택합니다. 2. 값을 입력하고 기준 단위를 고릅니다. 3. 대상 단위를 선택하거나 전체 변환 결과를 확인합니다.",
    howItWorks:
      "각 카테고리별 기준 단위를 중심으로 값을 환산합니다. 온도처럼 별도 계산식이 필요한 항목은 전용 공식으로 처리합니다.",
    useCases: [
      "cm와 inch 변환",
      "kg와 lb 변환",
      "섭씨와 화씨 변환",
    ],
    faq: [
      { q: "여러 단위 결과를 동시에 볼 수 있나요?", a: "네. 선택한 카테고리의 다양한 단위 결과를 한 번에 확인할 수 있습니다." },
      { q: "온도도 지원하나요?", a: "네. 온도는 별도 공식으로 변환합니다." },
      { q: "모든 계산은 로컬에서 되나요?", a: "네. 단위 계산은 브라우저 안에서 즉시 처리됩니다." },
    ],
  },
  "bmi-calculator": {
    title: "BMI 계산기",
    description: "키와 몸무게를 기준으로 BMI와 체중 범주를 확인할 수 있는 도구입니다.",
    whatIs:
      "BMI 계산기는 체질량지수를 계산해 현재 체중 상태를 간단히 확인하는 도구입니다. 키와 몸무게를 입력하면 BMI 값, 범주, 참고 지표를 함께 볼 수 있습니다.",
    howToUse:
      "1. 미터법 또는 야드파운드법을 선택합니다. 2. 키와 몸무게를 입력합니다. 3. BMI 결과와 범주를 확인합니다.",
    howItWorks:
      "BMI는 몸무게를 키의 제곱으로 나누는 공식으로 계산합니다. 단위 체계에 따라 입력값을 변환한 뒤 같은 기준으로 결과를 산출합니다.",
    useCases: [
      "체중 상태의 간단한 참고 지표 확인",
      "미터법과 야드파운드법 기준 비교",
      "건강 기록 정리 시 기본 수치 확인",
    ],
    faq: [
      { q: "BMI는 진단 도구인가요?", a: "아니요. BMI는 참고용 지표이며 개인 건강 상태를 완전히 설명하지는 않습니다." },
      { q: "단위 선택이 가능한가요?", a: "네. 미터법과 야드파운드법을 모두 지원할 수 있습니다." },
      { q: "결과는 어디까지 참고해야 하나요?", a: "기본적인 체중 상태 확인용으로 활용하고, 건강 상담은 전문가와 상의하는 것이 좋습니다." },
    ],
  },
  "loan-calculator": {
    title: "대출 계산기",
    description: "월 상환액, 총 이자, 상환 스케줄을 계산해 대출 조건을 비교할 수 있는 도구입니다.",
    whatIs:
      "대출 계산기는 주택담보대출, 자동차 대출, 개인 대출처럼 이자와 기간이 있는 대출의 부담을 미리 계산하는 도구입니다. 월 상환액과 총 상환액, 총 이자, 상환표를 확인할 수 있습니다.",
    howToUse:
      "1. 대출 원금과 통화를 선택합니다. 2. 연 이자율과 기간을 입력합니다. 3. 상환 방식을 고릅니다. 4. 결과 카드와 차트, 상환 스케줄을 확인합니다.",
    howItWorks:
      "원리금균등, 원금균등, 만기일시 상환 방식에 따라 월별 상환액과 잔액 변화를 계산합니다. 입력된 값으로 브라우저 안에서 계산되며 서버 저장은 없습니다.",
    useCases: [
      "대출 조건 비교",
      "상환 방식별 총 이자 차이 확인",
      "월 부담액 예산 계획",
    ],
    faq: [
      { q: "실제 금융기관 조건과 완전히 같나요?", a: "아니요. 참고용 계산이며 실제 수수료, 우대금리, 세금은 다를 수 있습니다." },
      { q: "상환표도 볼 수 있나요?", a: "네. 월별 원금, 이자, 잔액을 확인할 수 있습니다." },
      { q: "어떤 상환 방식을 지원하나요?", a: "원리금균등, 원금균등, 만기일시 상환을 비교할 수 있습니다." },
    ],
  },
  "compound-interest": {
    title: "복리 계산기",
    description: "초기 금액, 이율, 추가 납입을 기준으로 복리 성장 결과를 계산하는 도구입니다.",
    whatIs:
      "복리 계산기는 투자나 저축이 시간이 지나며 어떻게 늘어나는지 확인하는 도구입니다. 초기 금액, 연이율, 납입 주기, 추가 적립금에 따라 최종 금액과 수익을 볼 수 있습니다.",
    howToUse:
      "1. 초기 금액과 연이율을 입력합니다. 2. 투자 기간과 복리 주기를 선택합니다. 3. 필요하면 정기 납입금을 추가합니다. 4. 최종 금액과 성장 차트를 확인합니다.",
    howItWorks:
      "복리 공식과 추가 적립금 계산식을 이용해 기간별 성장 값을 계산합니다. 결과는 브라우저에서 즉시 산출됩니다.",
    useCases: [
      "장기 투자 성장 시뮬레이션",
      "정기 적립 시 최종 금액 추정",
      "복리 주기 차이에 따른 결과 비교",
    ],
    faq: [
      { q: "단리와 복리의 차이도 확인할 수 있나요?", a: "복리의 성장 효과를 기준으로 결과를 확인할 수 있으며, 필요하면 별도 비교 계산에 활용할 수 있습니다." },
      { q: "매달 추가 납입도 계산되나요?", a: "네. 정기적으로 넣는 금액을 반영할 수 있습니다." },
      { q: "투자 조언을 제공하나요?", a: "아니요. 참고용 계산 결과만 제공합니다." },
    ],
  },
  "date-calculator": {
    title: "날짜 계산기",
    description: "두 날짜 사이 일수 계산이나 특정 날짜에 일수를 더하고 빼는 작업을 돕는 도구입니다.",
    whatIs:
      "날짜 계산기는 시작일과 종료일 사이의 차이를 계산하거나, 기준 날짜에 일정 기간을 더하거나 빼는 작업에 사용하는 도구입니다. 일정 계획, 마감일 계산, 기간 비교에 유용합니다.",
    howToUse:
      "1. 날짜 차이 또는 날짜 더하기/빼기 모드를 선택합니다. 2. 기준 날짜와 값을 입력합니다. 3. 결과 날짜 또는 기간을 확인합니다.",
    howItWorks:
      "브라우저의 날짜 객체를 사용해 날짜 차이를 계산하고, 입력된 일수/주수/월수 등을 기준으로 새로운 날짜를 산출합니다.",
    useCases: [
      "마감일까지 남은 기간 계산",
      "특정 날짜 이후/이전 날짜 확인",
      "두 일정 사이 간격 비교",
    ],
    faq: [
      { q: "주말이나 공휴일도 고려하나요?", a: "기본 계산은 단순 날짜 차이 기준이며, 영업일 계산은 별도 규칙이 필요할 수 있습니다." },
      { q: "날짜를 더하고 빼는 기능이 있나요?", a: "네. 기준 날짜에 기간을 더하거나 뺄 수 있습니다." },
      { q: "결과는 즉시 반영되나요?", a: "네. 입력값이 바뀌면 바로 계산됩니다." },
    ],
  },
  "random-picker": {
    title: "랜덤 선택기",
    description: "룰렛, 동전 던지기, 주사위 굴리기로 무작위 결정을 도와주는 도구입니다.",
    whatIs:
      "랜덤 선택기는 여러 선택지 중 하나를 공정하게 뽑아야 할 때 사용하는 도구입니다. 직접 옵션을 넣어 룰렛을 돌리거나, 간단한 양자택일은 동전 던지기로, 게임이나 활동용 선택은 주사위 굴리기로 처리할 수 있습니다.",
    howToUse:
      "1. 상단 탭에서 룰렛, 동전, 주사위 모드를 고릅니다. 2. 룰렛은 항목을 추가하고, 동전은 바로 던지고, 주사위는 개수와 종류를 선택합니다. 3. 애니메이션 결과와 기록을 확인합니다.",
    howItWorks:
      "브라우저의 Web Crypto API를 이용해 무작위 값을 생성하고, 각 모드에 맞게 결과를 계산합니다. 룰렛과 동전, 주사위 애니메이션은 CSS와 브라우저 렌더링만 사용하며 모든 데이터는 로컬에서 처리됩니다.",
    useCases: [
      "식사 메뉴나 순서를 랜덤으로 정할 때",
      "수업이나 회의에서 무작위 발표자 선택",
      "보드게임이나 RPG용 주사위 굴리기",
    ],
    faq: [
      { q: "결과는 정말 공정한가요?", a: "네. 브라우저의 안전한 난수 생성 기능을 사용해 일반적인 단순 랜덤보다 더 일관된 무작위 값을 만듭니다." },
      { q: "룰렛 항목은 몇 개까지 넣는 것이 좋나요?", a: "기능상 더 많이 넣을 수 있지만, 보통 2개에서 20개 사이가 읽기 쉽고 사용하기 좋습니다." },
      { q: "입력한 항목이 저장되나요?", a: "아니요. 현재 세션에서만 사용되며 페이지를 새로고침하면 초기화됩니다." },
    ],
  },
  "currency-converter": {
    title: "환율 계산기",
    description: "주요 통화 간 환율을 바탕으로 금액을 변환하고 기준 환율을 확인하는 도구입니다.",
    whatIs:
      "환율 계산기는 한 통화의 금액을 다른 통화 기준으로 환산하는 도구입니다. 여행, 해외 결제, 국제 견적 비교처럼 현재 환율 기준의 대략적인 금액이 필요할 때 유용합니다.",
    howToUse:
      "1. 금액을 입력합니다. 2. 기준 통화와 대상 통화를 선택합니다. 3. 변환 결과와 환율 정보를 확인합니다. 4. 필요하면 통화를 바꿔 다시 계산합니다.",
    howItWorks:
      "환율 데이터는 외부 환율 API를 기준으로 가져오고, 브라우저에서 선택한 통화쌍의 환산 값을 계산합니다. 표시되는 값은 참고용 환율입니다.",
    useCases: [
      "해외 결제 금액 대략 계산",
      "국가별 가격 비교",
      "국제 송금이나 견적 검토",
    ],
    faq: [
      { q: "실제 은행 환율과 같나요?", a: "아니요. 참고용 중간 환율 기준이며 실제 거래 환율과 수수료는 다를 수 있습니다." },
      { q: "환율은 얼마나 자주 갱신되나요?", a: "데이터 공급 방식에 따라 주기적으로 갱신되며, 페이지에서 마지막 업데이트 시각을 확인할 수 있습니다." },
      { q: "입력한 금액이 저장되나요?", a: "아니요. 금액 계산은 브라우저 안에서 처리됩니다." },
    ],
  },
};

const JA_TOOL_PAGE_CONTENT: Record<string, ToolContent> = {
  "percentage-calculator": {
    title: "パーセンテージ計算機",
    description: "割合、比率、増減率、割引や上乗せをすばやく計算できるブラウザベースのツールです。",
    whatIs:
      "パーセンテージ計算機は、割引率、上昇率、部分と全体の比率など、割合に関する複数の計算を1ページで処理できるツールです。日常の計算から仕事の見積もりまで幅広く使えます。",
    howToUse:
      "1. 必要な計算タイプを選択します。2. 数値を入力します。3. 結果カードで割合や最終金額を確認します。",
    howItWorks:
      "基本的な百分率の計算式と増減率の計算式を使って結果を即座に求めます。入力値はブラウザ内でのみ処理されます。",
    useCases: [
      "割引額を計算したいとき",
      "増減率をすばやく確認したいとき",
      "部分が全体に占める割合を求めたいとき",
    ],
    faq: [
      { q: "割引と上乗せの両方を計算できますか？", a: "はい。割合を加算する場合と減算する場合の両方に対応しています。" },
      { q: "小数点も入力できますか？", a: "はい。通常の小数入力に対応しています。" },
      { q: "複数の計算タイプがありますか？", a: "はい。基本割合、逆算、増減率、適用計算などを利用できます。" },
    ],
  },
};

const DE_TOOL_PAGE_CONTENT: Record<string, ToolContent> = {
  "percentage-calculator": {
    title: "Prozentrechner",
    description: "Berechnen Sie Prozente, Verhältnisse, Veränderungen sowie Rabatte oder Aufschläge schnell im Browser.",
    whatIs:
      "Der Prozentrechner ist ein Tool, mit dem Sie mehrere prozentbezogene Berechnungen an einem Ort erledigen können, etwa Rabatte, Preisänderungen und das Verhältnis eines Teils zum Ganzen. Er eignet sich sowohl für Alltagsrechnungen als auch für Arbeits- und Planungsaufgaben.",
    howToUse:
      "1. Wählen Sie die gewünschte Berechnungsart. 2. Geben Sie die Zahlen ein. 3. Prüfen Sie das Ergebnis im Resultatfeld.",
    howItWorks:
      "Das Tool verwendet Standardformeln für Prozentwerte, Verhältnisberechnungen und prozentuale Veränderungen. Alle Berechnungen erfolgen direkt im Browser.",
    useCases: [
      "Rabatte und Preisnachlässe prüfen",
      "Preisänderungen oder Wachstumsraten vergleichen",
      "Den Anteil eines Werts am Gesamtwert berechnen",
    ],
    faq: [
      { q: "Kann ich sowohl Rabatte als auch Aufschläge berechnen?", a: "Ja. Das Tool unterstützt beide Richtungen." },
      { q: "Kann ich Dezimalzahlen eingeben?", a: "Ja. Normale Dezimalwerte werden unterstützt." },
      { q: "Gibt es mehrere Berechnungsarten?", a: "Ja. Es gibt Grundberechnung, Rückwärtsrechnung, Veränderung und Prozentanwendung." },
    ],
  },
};

const ES_TOOL_PAGE_CONTENT: Record<string, ToolContent> = {
  "percentage-calculator": {
    title: "Calculadora de porcentajes",
    description: "Calcula porcentajes, proporciones, cambios porcentuales y descuentos o recargos rápidamente en el navegador.",
    whatIs:
      "La calculadora de porcentajes permite resolver en una sola página operaciones habituales relacionadas con porcentajes, como descuentos, aumentos y la relación entre una parte y un total. Sirve tanto para cálculos cotidianos como para tareas de trabajo o planificación.",
    howToUse:
      "1. Elige el tipo de cálculo que necesitas. 2. Introduce los números. 3. Revisa el resultado en la tarjeta de salida.",
    howItWorks:
      "La herramienta aplica fórmulas estándar para porcentajes, relaciones y variaciones porcentuales. Todo se calcula directamente en el navegador.",
    useCases: [
      "Calcular descuentos y precios rebajados",
      "Comparar aumentos, caídas o variaciones",
      "Saber qué porcentaje representa una parte del total",
    ],
    faq: [
      { q: "¿Puedo calcular descuentos y recargos?", a: "Sí. La herramienta admite ambos casos." },
      { q: "¿Puedo introducir decimales?", a: "Sí. Se admiten números decimales normales." },
      { q: "¿Hay varios tipos de cálculo?", a: "Sí. Incluye porcentaje básico, cálculo inverso, cambio porcentual y aplicación de porcentaje." },
    ],
  },
};

const FR_TOOL_PAGE_CONTENT: Record<string, ToolContent> = {
  "percentage-calculator": {
    title: "Calculatrice de pourcentages",
    description: "Calculez rapidement pourcentages, ratios, variations et remises ou majorations dans le navigateur.",
    whatIs:
      "La calculatrice de pourcentages permet d'effectuer sur une seule page plusieurs calculs liés aux pourcentages, comme les remises, les hausses et le rapport entre une partie et un total. Elle convient aussi bien aux calculs du quotidien qu'aux besoins de travail ou de planification.",
    howToUse:
      "1. Choisissez le type de calcul souhaité. 2. Saisissez les nombres. 3. Vérifiez le résultat dans la carte de sortie.",
    howItWorks:
      "L'outil applique des formules standard pour les pourcentages, les ratios et les variations en pourcentage. Tous les calculs sont effectués directement dans le navigateur.",
    useCases: [
      "Vérifier une remise ou un prix soldé",
      "Comparer une hausse, une baisse ou une évolution",
      "Calculer la part d'une valeur dans un total",
    ],
    faq: [
      { q: "Puis-je calculer une remise et une majoration ?", a: "Oui. L'outil prend en charge les deux cas." },
      { q: "Puis-je saisir des nombres décimaux ?", a: "Oui. Les décimales classiques sont prises en charge." },
      { q: "Y a-t-il plusieurs types de calcul ?", a: "Oui. Le calculateur inclut le pourcentage de base, le calcul inverse, la variation et l'application d'un pourcentage." },
    ],
  },
};

const PT_TOOL_PAGE_CONTENT: Record<string, ToolContent> = {
  "percentage-calculator": {
    title: "Calculadora de porcentagem",
    description: "Calcule rapidamente porcentagens, proporções, variações e descontos ou acréscimos no navegador.",
    whatIs:
      "A calculadora de porcentagem permite resolver em uma única página vários cálculos relacionados a porcentagens, como descontos, aumentos e a relação entre uma parte e o total. Ela é útil tanto para contas do dia a dia quanto para planejamento e trabalho.",
    howToUse:
      "1. Escolha o tipo de cálculo desejado. 2. Digite os números. 3. Confira o resultado no cartão de saída.",
    howItWorks:
      "A ferramenta aplica fórmulas padrão para porcentagens, relações e variações percentuais. Todos os cálculos são feitos diretamente no navegador.",
    useCases: [
      "Calcular descontos e preços promocionais",
      "Comparar aumentos, quedas ou variações",
      "Descobrir qual porcentagem uma parte representa do total",
    ],
    faq: [
      { q: "Posso calcular desconto e acréscimo?", a: "Sim. A ferramenta cobre os dois casos." },
      { q: "Posso inserir números decimais?", a: "Sim. Decimais comuns são aceitos." },
      { q: "Existem vários tipos de cálculo?", a: "Sim. Há cálculo básico, cálculo inverso, variação percentual e aplicação de porcentagem." },
    ],
  },
};

export function getLocalizedToolPageContent(
  slug: string,
  locale: Locale,
  fallback: ToolContent
): ToolContent {
  if (locale === "ko") {
    return KO_TOOL_PAGE_CONTENT[slug] ?? fallback;
  }

  if (locale === "ja") {
    return JA_TOOL_PAGE_CONTENT[slug] ?? fallback;
  }

  if (locale === "de") {
    return DE_TOOL_PAGE_CONTENT[slug] ?? fallback;
  }

  if (locale === "es") {
    return ES_TOOL_PAGE_CONTENT[slug] ?? fallback;
  }

  if (locale === "fr") {
    return FR_TOOL_PAGE_CONTENT[slug] ?? fallback;
  }

  if (locale === "pt") {
    return PT_TOOL_PAGE_CONTENT[slug] ?? fallback;
  }

  return fallback;
}

import { DEFAULT_LOCALE, type Locale } from "@/i18n/config";

export const SUPPORT_EMAIL = "support@finepocket.app";
const LAST_UPDATED = "2026-03-30";

export type SitePageKey = "about" | "privacy" | "terms" | "contact";

export interface ContentSection {
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface SitePageContent {
  metaTitle: string;
  title: string;
  description: string;
  lastUpdatedLabel?: string;
  lastUpdated?: string;
  intro: string[];
  email?: string;
  sections: ContentSection[];
  callout?: {
    title: string;
    body: string;
  };
}

const SITE_PAGE_CONTENT: Record<Locale, Record<SitePageKey, SitePageContent>> = {
  en: {
    about: {
      metaTitle: "About",
      title: "About FinePocket Toolbox",
      description:
        "Learn how FinePocket Toolbox builds fast, browser-based tools with privacy, clarity, and practical utility in mind.",
      lastUpdatedLabel: "Last updated",
      lastUpdated: LAST_UPDATED,
      intro: [
        "FinePocket Toolbox is a collection of browser-based tools for developers, writers, students, and anyone who wants quick answers without installing software or creating an account.",
        "The project aims to keep everyday tasks simple: open a tool, solve the problem, and move on. Wherever possible, processing happens directly in the browser so sensitive input can stay on the user's device.",
      ],
      sections: [
        {
          title: "What we build",
          paragraphs: [
            "The site focuses on practical tools across developer workflows, text workflows, and finance or calculator use cases. Each page combines an interactive tool with explanatory content so visitors can understand what the result means.",
            "That structure matters for both usability and trust. A page should still be helpful even before someone presses a button.",
          ],
        },
        {
          title: "Privacy-first design",
          paragraphs: [
            "Whenever a feature can run safely in the browser, FinePocket keeps that processing inside FinePocket Toolbox. Formatters, encoders, decoders, text utilities, and many calculators are designed around that principle.",
            "If a tool depends on external reference data, the page should explain that dependency clearly instead of hiding it.",
          ],
        },
        {
          title: "How pages are reviewed",
          paragraphs: [
            "The site aims to make each page useful before and after the interactive tool is used. That means checking the formulas, verifying edge cases in the UI, and writing plain-language explanations that match what the tool actually does.",
            "Pages with higher-trust topics such as finance or health are reviewed more conservatively. The goal is to present them as reference aids, not as substitutes for legal, medical, or financial advice.",
          ],
          bullets: [
            "Check result logic and common edge cases before publishing",
            "Keep tool copy aligned with the actual implementation",
            "Add clear disclaimers for finance and health-related outputs",
            "Keep policy and contact links visible across the site",
          ],
        },
        {
          title: "Quality and advertising",
          paragraphs: [
            "New tools are reviewed for accessibility, responsive behavior, dark mode support, and plain-language explanations. Finance-related pages also include reference-only disclaimers because they should help with planning, not impersonate professional advice.",
            "The long-term monetization model is non-intrusive advertising. Ads should support the project without interrupting the core task, blending into primary controls, or appearing in a way that could confuse a result with paid content.",
          ],
          bullets: [
            "No forced sign-up before using a tool",
            "Clear explanations of what a result means",
            "Visible policy and contact pages in the footer",
            "Related-tool links that keep similar workflows connected",
          ],
        },
      ],
      callout: {
        title: "Contact and feedback",
        body: "Questions, bug reports, partnership inquiries, and suggestions for new tools can be sent to support@finepocket.app.",
      },
    },
    privacy: {
      metaTitle: "Privacy Policy",
      title: "Privacy Policy",
      description:
        "Read how FinePocket handles browser-based processing, hosting logs, advertising, analytics, and contact requests for FinePocket Toolbox.",
      lastUpdatedLabel: "Last updated",
      lastUpdated: LAST_UPDATED,
      intro: [
        "FinePocket operates FinePocket Toolbox, and many tools are designed to run directly in the browser. This policy explains what data is and is not processed when you use the site.",
      ],
      sections: [
        {
          title: "Browser-based processing",
          paragraphs: [
            "For browser-based tools such as formatters, encoders, decoders, text utilities, and many calculators, the data you enter is processed locally in your browser. FinePocket does not intentionally send that input to an application server for storage or analysis.",
            "If a tool requires external reference data, such as exchange rates, the page should make that dependency clear.",
          ],
        },
        {
          title: "Hosting and logs",
          paragraphs: [
            "The site is hosted on Vercel. Like most hosting providers, Vercel may process technical request data such as IP address, request path, timestamps, and security events for operations, reliability, and abuse prevention.",
          ],
        },
        {
          title: "Cookies, preferences, and advertising",
          paragraphs: [
            "FinePocket may use local browser storage for product preferences such as theme or language settings on FinePocket Toolbox.",
            "If advertising is enabled, partners such as Google AdSense may use cookies or similar technologies to deliver, measure, or personalize ads in line with their policies and applicable consent requirements.",
            "Where regional consent rules apply, FinePocket aims to show advertising in a way that respects those rules instead of treating consent as optional.",
          ],
        },
        {
          title: "Reference data and network requests",
          paragraphs: [
            "Most tools work entirely with local browser processing, but some pages rely on external reference data. For example, a currency page may request cached exchange-rate data through a site API route so the page can display current reference values.",
            "When that happens, the page should explain the dependency clearly. The reference request may still generate ordinary infrastructure logs, but the tool should avoid transmitting user-entered content unless that transmission is necessary for the feature.",
          ],
        },
        {
          title: "Analytics",
          paragraphs: [
            "The site may use privacy-conscious analytics to understand high-level usage patterns such as page views, popular tools, device categories, and navigation flows. The goal is to improve product quality, not to inspect tool input.",
          ],
        },
        {
          title: "Contact requests",
          paragraphs: [
            "If you email support@finepocket.app, your email address and message contents may be used to respond to your request and maintain a support history when needed.",
          ],
        },
        {
          title: "Your choices",
          paragraphs: [
            "You can stop using the site at any time, clear local site data through your browser settings, block cookies through browser controls, and contact support if you have policy questions.",
          ],
          bullets: [
            "Clear local site data in your browser",
            "Block or delete cookies through browser settings",
            "Use privacy tools that fit your preferences",
            "Email support@finepocket.app with policy questions",
          ],
        },
      ],
    },
    terms: {
      metaTitle: "Terms of Service",
      title: "Terms of Service",
      description:
        "Review the terms that govern use of FinePocket Toolbox, including acceptable use, disclaimers, and liability limits.",
      lastUpdatedLabel: "Last updated",
      lastUpdated: LAST_UPDATED,
      intro: [
        "These terms govern access to and use of FinePocket Toolbox. By using the site, you agree to these terms. If you do not agree, do not use the service.",
      ],
      sections: [
        {
          title: "Service scope",
          paragraphs: [
            "FinePocket provides online utilities, calculators, and reference content through FinePocket Toolbox for general informational and productivity use. The service is offered on an as-is and as-available basis.",
          ],
        },
        {
          title: "Acceptable use",
          paragraphs: [
            "You may use the service for personal, educational, and commercial work so long as your use is lawful and does not interfere with the operation, security, or availability of the site.",
          ],
          bullets: [
            "Do not attempt to disrupt or overload the service",
            "Do not use the site to violate law or third-party rights",
            "Do not rely on the tools for deceptive, harmful, or abusive activity",
          ],
        },
        {
          title: "Accuracy and reference-only information",
          paragraphs: [
            "Tool outputs are provided for convenience and general information. FinePocket does not guarantee that every result is complete, error-free, or suitable for every context.",
            "Finance, health, and planning tools should be treated as reference aids only. They do not replace professional advice.",
          ],
        },
        {
          title: "Liability and third-party services",
          paragraphs: [
            "Some features may rely on third-party providers such as hosting, analytics, or advertising services. FinePocket is not responsible for downtime, policy changes, or actions taken by those providers.",
            "To the maximum extent permitted by law, FinePocket will not be liable for indirect, incidental, special, consequential, or exemplary damages arising from use of the site or reliance on its outputs.",
          ],
        },
        {
          title: "Advertising and external destinations",
          paragraphs: [
            "If the site displays advertising, those placements are intended to stay distinct from the main workflow and from the meaning of the tool result itself.",
            "Clicks to third-party advertisers, partners, or linked services are governed by the terms and privacy practices of those third parties, not by these site terms.",
          ],
        },
        {
          title: "Updates and contact",
          paragraphs: [
            "These terms may be updated when the product evolves or legal requirements change. Continued use after an update means you accept the revised terms. Questions can be sent to support@finepocket.app.",
          ],
        },
      ],
    },
    contact: {
      metaTitle: "Contact Us",
      title: "Contact Us",
      description:
        "Contact FinePocket regarding support, bug reports, partnerships, or suggestions for FinePocket Toolbox.",
      intro: [
        "Questions, bug reports, product feedback, advertising inquiries, and partnership requests are all welcome. Email is the primary support channel for FinePocket.",
      ],
      email: SUPPORT_EMAIL,
      sections: [
        {
          title: "General support",
          paragraphs: [
            "Use support@finepocket.app for general questions, feedback, policy requests, or help understanding how a tool works.",
          ],
        },
        {
          title: "Bug reports",
          paragraphs: [
            "If something behaves unexpectedly, include the tool URL, a short description of the issue, the input you used if it is safe to share, and the browser or device where the problem occurred.",
          ],
          bullets: [
            "Tool name or page URL",
            "Expected result and actual result",
            "Browser name and version",
            "Screenshot or screen recording if available",
          ],
        },
        {
          title: "Feature requests",
          paragraphs: [
            "Suggestions for new tools or improvements are most useful when they describe the job to be done, the likely user, and what makes the workflow difficult today.",
          ],
        },
        {
          title: "What helps us review faster",
          paragraphs: [
            "The fastest way to get a useful response is to include enough concrete context in the first message. Repro steps, page URLs, expected behavior, and screenshots reduce the back-and-forth required to understand the issue.",
          ],
          bullets: [
            "Exact page URL and locale",
            "What you expected to happen",
            "What actually happened instead",
            "Whether the issue is reproducible",
          ],
        },
        {
          title: "Business and advertising",
          paragraphs: [
            "Use the same email address for partnership, sponsorship, or advertising questions. Relevant context such as company name, timeline, and expected scope helps speed up the response.",
          ],
        },
      ],
      callout: {
        title: "Response time",
        body: "Most messages receive a reply within one to two business days. Urgent functional issues may be answered faster when enough detail is included in the first message.",
      },
    },
  },
  de: {
    about: {
      metaTitle: "Über uns",
      title: "Über FinePocket Toolbox",
      description:
        "Erfahren Sie, wie FinePocket Toolbox schnelle browserbasierte Tools mit Fokus auf Datenschutz, Klarheit und praktischen Nutzen entwickelt.",
      intro: [
        "FinePocket Toolbox ist eine Sammlung browserbasierter Tools für Entwickler, Autoren, Studierende und alle, die schnelle Antworten ohne Installation oder Konto benötigen.",
        "Das Projekt soll Alltagsaufgaben einfach halten: ein Tool öffnen, das Problem lösen und weitermachen. Wo immer möglich, erfolgt die Verarbeitung direkt im Browser, damit sensible Eingaben auf dem Gerät bleiben.",
      ],
      sections: [
        {
          title: "Was wir entwickeln",
          paragraphs: [
            "Die Website konzentriert sich auf praktische Tools für Entwickler-Workflows, Textarbeit sowie Finanz- und Rechner-Anwendungsfälle. Jede Seite kombiniert ein interaktives Tool mit erklärenden Inhalten.",
            "Diese Struktur ist wichtig für Benutzerfreundlichkeit und Vertrauen. Eine Seite sollte bereits hilfreich sein, bevor jemand auf eine Schaltfläche klickt.",
          ],
        },
        {
          title: "Datenschutz zuerst",
          paragraphs: [
            "Wenn eine Funktion sicher im Browser ausgeführt werden kann, bleibt sie im Browser. Formatter, Encoder, Decoder, Textwerkzeuge und viele Rechner folgen diesem Grundsatz.",
            "Wenn ein Tool externe Referenzdaten benötigt, sollte die Seite diese Abhängigkeit klar erläutern.",
          ],
        },
        {
          title: "Qualität und Werbung",
          paragraphs: [
            "Neue Tools werden auf Barrierefreiheit, responsives Verhalten, Dark Mode und verständliche Erklärungen geprüft. Finanzbezogene Seiten enthalten zusätzlich Hinweise, dass die Ergebnisse nur zu Referenzzwecken dienen.",
            "Die langfristige Monetarisierung basiert auf unaufdringlicher Werbung. Anzeigen sollen das Projekt unterstützen, ohne die eigentliche Aufgabe zu stören oder versehentliche Klicks zu fördern.",
          ],
          bullets: [
            "Keine erzwungene Registrierung vor der Nutzung",
            "Klare Erklärungen zur Bedeutung eines Ergebnisses",
            "Sichtbare Richtlinien- und Kontaktseiten im Footer",
            "Verwandte Tools sind intern miteinander verlinkt",
          ],
        },
      ],
      callout: {
        title: "Kontakt und Feedback",
        body: "Fragen, Fehlermeldungen, Partnerschaftsanfragen und Vorschläge für neue Tools können an support@finepocket.app gesendet werden.",
      },
    },
    privacy: {
      metaTitle: "Datenschutzerklärung",
      title: "Datenschutzerklärung",
      description:
        "Lesen Sie, wie FinePocket Toolbox browserbasierte Verarbeitung, Hosting-Logs, Werbung, Analysen und Kontaktanfragen behandelt.",
      lastUpdatedLabel: "Zuletzt aktualisiert",
      lastUpdated: LAST_UPDATED,
      intro: [
        "FinePocket betreibt FinePocket Toolbox, und viele Tools sind so aufgebaut, dass sie direkt im Browser laufen. Diese Richtlinie erklärt, welche Daten bei der Nutzung der Website verarbeitet werden und welche nicht.",
      ],
      sections: [
        {
          title: "Browserbasierte Verarbeitung",
          paragraphs: [
            "Bei browserbasierten Tools wie Formatierern, Encodern, Decodern, Textwerkzeugen und vielen Rechnern werden Ihre Eingaben lokal im Browser verarbeitet. FinePocket sendet diese Eingaben nicht absichtlich an einen Anwendungsserver, um sie zu speichern oder auszuwerten.",
            "Wenn ein Tool externe Referenzdaten benötigt, etwa Wechselkurse, sollte die Seite diese Abhängigkeit deutlich machen.",
          ],
        },
        {
          title: "Hosting und Logs",
          paragraphs: [
            "Die Website wird auf Vercel gehostet. Wie die meisten Hosting-Anbieter kann Vercel technische Anfragedaten wie IP-Adresse, Pfad, Zeitstempel und Sicherheitsereignisse für Betrieb, Zuverlässigkeit und Missbrauchsschutz verarbeiten.",
          ],
        },
        {
          title: "Cookies, Einstellungen und Werbung",
          paragraphs: [
            "FinePocket kann für FinePocket Toolbox lokalen Browser-Speicher für Produkteinstellungen wie Theme oder Sprache verwenden.",
            "Wenn Werbung aktiviert ist, können Partner wie Google AdSense Cookies oder ähnliche Technologien nutzen, um Anzeigen bereitzustellen, zu messen oder zu personalisieren, soweit dies nach ihren Richtlinien und geltenden Einwilligungsanforderungen zulässig ist.",
          ],
        },
        {
          title: "Analysen",
          paragraphs: [
            "Die Website kann datenschutzbewusste Analysen verwenden, um allgemeine Nutzungsmuster wie Seitenaufrufe, beliebte Tools, Gerätekategorien und Navigationspfade zu verstehen. Das Ziel ist die Produktverbesserung, nicht die Auswertung von Tool-Eingaben.",
          ],
        },
        {
          title: "Kontaktanfragen",
          paragraphs: [
            "Wenn Sie eine E-Mail an support@finepocket.app senden, können Ihre E-Mail-Adresse und der Inhalt der Nachricht genutzt werden, um Ihre Anfrage zu beantworten und bei Bedarf einen Support-Verlauf zu führen.",
          ],
        },
        {
          title: "Ihre Wahlmöglichkeiten",
          paragraphs: [
            "Sie können die Website jederzeit nicht mehr nutzen, lokale Websitedaten über die Browsereinstellungen löschen, Cookies über den Browser blockieren und den Support bei Fragen zur Richtlinie kontaktieren.",
          ],
          bullets: [
            "Lokale Websitedaten im Browser löschen",
            "Cookies über Browsereinstellungen blockieren oder löschen",
            "Datenschutz-Tools nach Ihren Vorlieben verwenden",
            "Fragen an support@finepocket.app senden",
          ],
        },
      ],
    },
    terms: {
      metaTitle: "Nutzungsbedingungen",
      title: "Nutzungsbedingungen",
      description:
        "Lesen Sie die Bedingungen für die Nutzung von FinePocket Toolbox, einschließlich zulässiger Nutzung, Haftungsausschlüssen und Haftungsgrenzen.",
      lastUpdatedLabel: "Zuletzt aktualisiert",
      lastUpdated: LAST_UPDATED,
      intro: [
        "Diese Bedingungen regeln den Zugriff auf und die Nutzung von FinePocket Toolbox. Durch die Nutzung der Website stimmen Sie diesen Bedingungen zu. Wenn Sie nicht zustimmen, nutzen Sie den Dienst bitte nicht.",
      ],
      sections: [
        {
          title: "Leistungsumfang",
          paragraphs: [
            "FinePocket Toolbox bietet Online-Werkzeuge, Rechner und Referenzinhalte für allgemeine Informations- und Produktivitätszwecke. Der Dienst wird ohne Gewähr und nach Verfügbarkeit bereitgestellt.",
          ],
        },
        {
          title: "Zulässige Nutzung",
          paragraphs: [
            "Sie dürfen den Dienst für persönliche, schulische und geschäftliche Zwecke nutzen, solange Ihre Nutzung rechtmäßig ist und Betrieb, Sicherheit oder Verfügbarkeit der Website nicht beeinträchtigt.",
          ],
          bullets: [
            "Versuchen Sie nicht, den Dienst zu stören oder zu überlasten",
            "Verwenden Sie die Website nicht zur Verletzung von Gesetzen oder Rechten Dritter",
            "Nutzen Sie die Tools nicht für täuschende, schädliche oder missbräuchliche Aktivitäten",
          ],
        },
        {
          title: "Genauigkeit und Referenzcharakter",
          paragraphs: [
            "Tool-Ergebnisse dienen der Bequemlichkeit und allgemeinen Information. FinePocket Toolbox garantiert nicht, dass jedes Ergebnis vollständig, fehlerfrei oder für jeden Kontext geeignet ist.",
            "Finanz-, Gesundheits- und Planungstools sind nur als Referenzhilfen gedacht und ersetzen keine professionelle Beratung.",
          ],
        },
        {
          title: "Haftung und Drittanbieter",
          paragraphs: [
            "Einige Funktionen können von Drittanbietern wie Hosting-, Analyse- oder Werbediensten abhängen. FinePocket ist nicht verantwortlich für Ausfälle, Richtlinienänderungen oder Maßnahmen dieser Anbieter.",
            "Soweit gesetzlich zulässig, haftet FinePocket nicht für indirekte, zufällige, besondere, Folge- oder exemplarische Schäden, die aus der Nutzung der Website oder dem Vertrauen auf ihre Ergebnisse entstehen.",
          ],
        },
        {
          title: "Aktualisierungen und Kontakt",
          paragraphs: [
            "Diese Bedingungen können aktualisiert werden, wenn sich das Produkt oder rechtliche Anforderungen ändern. Wenn Sie die Website nach einer Aktualisierung weiter nutzen, akzeptieren Sie die geänderten Bedingungen. Fragen können an support@finepocket.app gesendet werden.",
          ],
        },
      ],
    },
    contact: {
      metaTitle: "Kontakt",
      title: "Kontakt",
      description:
        "Kontaktieren Sie FinePocket für Support, Fehlermeldungen, Partnerschaften oder Vorschläge rund um FinePocket Toolbox.",
      intro: [
        "Fragen, Fehlermeldungen, Produktfeedback, Werbeanfragen und Partnerschaftsanfragen sind willkommen. E-Mail ist der primäre Support-Kanal von FinePocket Toolbox.",
      ],
      email: SUPPORT_EMAIL,
      sections: [
        {
          title: "Allgemeiner Support",
          paragraphs: [
            "Verwenden Sie support@finepocket.app für allgemeine Fragen, Feedback, Richtlinienanfragen oder Hilfe beim Verständnis eines Tools.",
          ],
        },
        {
          title: "Fehlermeldungen",
          paragraphs: [
            "Wenn sich etwas unerwartet verhält, senden Sie bitte die Tool-URL, eine kurze Problembeschreibung, die verwendete Eingabe, sofern diese sicher geteilt werden kann, sowie den Browser oder das Gerät mit.",
          ],
          bullets: [
            "Tool-Name oder Seiten-URL",
            "Erwartetes Ergebnis und tatsächliches Ergebnis",
            "Browsername und Version",
            "Screenshot oder Bildschirmaufnahme, falls vorhanden",
          ],
        },
        {
          title: "Funktionswünsche",
          paragraphs: [
            "Vorschläge für neue Tools oder Verbesserungen sind besonders hilfreich, wenn sie die Aufgabe, den wahrscheinlichen Nutzer und die heutige Schwierigkeit des Workflows beschreiben.",
          ],
        },
        {
          title: "Geschäftliches und Werbung",
          paragraphs: [
            "Nutzen Sie dieselbe E-Mail-Adresse für Partnerschaften, Sponsoring oder Werbeanfragen. Relevante Angaben wie Firmenname, Zeitplan und erwarteter Umfang beschleunigen die Antwort.",
          ],
        },
      ],
      callout: {
        title: "Antwortzeit",
        body: "Die meisten Nachrichten werden innerhalb von ein bis zwei Werktagen beantwortet. Dringende Funktionsprobleme können schneller beantwortet werden, wenn die erste Nachricht genügend Details enthält.",
      },
    },
  },
  ja: {
    about: {
      metaTitle: "紹介",
      title: "FinePocket Toolbox について",
      description:
        "FinePocket Toolbox が、プライバシー、分かりやすさ、実用性を重視した高速なブラウザベースのツールをどのように作っているかを紹介します。",
      intro: [
        "FinePocket Toolbox は、開発者、ライター、学生、そしてソフトウェアをインストールしたりアカウントを作成したりせずに素早く答えを得たい人のためのブラウザベースツール集です。",
        "このプロジェクトの目的は、日常的な作業をシンプルにすることです。ツールを開き、問題を解決し、そのまま先へ進めるように設計しています。可能な限り処理はブラウザ内で完結し、機密性の高い入力を端末内に留めます。",
      ],
      sections: [
        {
          title: "提供するもの",
          paragraphs: [
            "このサイトは、開発作業向けツール、テキスト作業向けツール、そして金融・計算用途のツールに重点を置いています。各ページではインタラクティブなツールと解説コンテンツを組み合わせています。",
            "この構成は使いやすさと信頼性の両方に重要です。ボタンを押す前でも、そのページ自体が役に立つべきだと考えています。",
          ],
        },
        {
          title: "プライバシー優先の設計",
          paragraphs: [
            "機能を安全にブラウザ内で動かせる場合、FinePocket Toolbox はその処理をブラウザ内に留めます。フォーマッタ、エンコーダ、デコーダ、テキストユーティリティ、多くの計算ツールがこの方針に基づいています。",
            "外部の参照データが必要な場合は、その依存関係をページ上で明確に説明するべきだと考えています。",
          ],
        },
        {
          title: "品質と広告",
          paragraphs: [
            "新しいツールは、アクセシビリティ、レスポンシブ対応、ダークモード、分かりやすい説明という基準で確認します。金融系ページには、結果が参考情報であることを示す注意書きも含めます。",
            "長期的な収益化は、邪魔にならない広告を前提としています。広告は重要な操作の近くで誤クリックを誘発したり、作業を妨げたりしてはいけません。",
          ],
          bullets: [
            "利用前の強制登録なし",
            "結果の意味を分かりやすく説明",
            "ポリシーと問い合わせページをフッターに常設",
            "関連するワークフロー同士を内部リンクで接続",
          ],
        },
      ],
      callout: {
        title: "お問い合わせとフィードバック",
        body: "質問、不具合報告、提携の相談、新しいツールの提案は support@finepocket.app までお送りください。",
      },
    },
    privacy: {
      metaTitle: "プライバシーポリシー",
      title: "プライバシーポリシー",
      description:
        "FinePocket が、FinePocket Toolbox に関するブラウザ内処理、ホスティングログ、広告、分析、お問い合わせをどのように扱うかを説明します。",
      lastUpdatedLabel: "最終更新",
      lastUpdated: LAST_UPDATED,
      intro: [
        "FinePocket は FinePocket Toolbox を運営しており、多くのツールがブラウザ内で直接動作するように設計されています。このポリシーでは、サイト利用時にどのようなデータが処理され、どのようなデータが処理されないかを説明します。",
      ],
      sections: [
        {
          title: "ブラウザ内処理",
          paragraphs: [
            "フォーマッタ、エンコーダ、デコーダ、テキストユーティリティ、多くの計算ツールでは、入力したデータはブラウザ内でローカルに処理されます。FinePocket がその入力を保存や分析のためにアプリケーションサーバーへ意図的に送信することはありません。",
            "為替レートのような外部参照データが必要なツールでは、その依存関係をページ上で明確に示すようにします。",
          ],
        },
        {
          title: "ホスティングとログ",
          paragraphs: [
            "このサイトは Vercel 上でホストされています。多くのホスティング事業者と同様に、Vercel は運用、信頼性、悪用防止のために IP アドレス、リクエストパス、タイムスタンプ、セキュリティイベントなどの技術的なデータを処理する場合があります。",
          ],
        },
        {
          title: "Cookie、設定、広告",
          paragraphs: [
            "FinePocket は、FinePocket Toolbox のテーマや言語設定などのプロダクト設定のためにブラウザのローカルストレージを使用する場合があります。",
            "広告が有効な場合、Google AdSense などのパートナーは、自社ポリシーと適用される同意要件に従って、広告の配信、測定、またはパーソナライズのために Cookie や類似技術を使用する場合があります。",
          ],
        },
        {
          title: "分析",
          paragraphs: [
            "このサイトでは、ページビュー、人気ツール、デバイス種別、移動経路などの大まかな利用傾向を把握するために、プライバシーに配慮した分析を利用する場合があります。目的は製品改善であり、ツール入力の内容を調べることではありません。",
          ],
        },
        {
          title: "お問い合わせ",
          paragraphs: [
            "support@finepocket.app にメールを送信した場合、メールアドレスとメッセージ内容は回答やサポート履歴の管理のために利用されることがあります。",
          ],
        },
        {
          title: "利用者の選択肢",
          paragraphs: [
            "いつでもサイトの利用をやめることができ、ブラウザ設定からローカルデータを削除し、Cookie をブロックし、ポリシーに関する質問をサポートへ送ることができます。",
          ],
          bullets: [
            "ブラウザでローカルデータを削除する",
            "ブラウザ設定で Cookie を削除またはブロックする",
            "自分に合ったプライバシーツールを利用する",
            "ポリシーに関する質問を support@finepocket.app に送る",
          ],
        },
      ],
    },
    terms: {
      metaTitle: "利用規約",
      title: "利用規約",
      description:
        "FinePocket Toolbox の利用条件、許容される利用、免責事項、責任制限を確認できます。",
      lastUpdatedLabel: "最終更新",
      lastUpdated: LAST_UPDATED,
      intro: [
        "本規約は FinePocket Toolbox へのアクセスおよび利用を規定します。サイトを利用することで、本規約に同意したものとみなされます。同意できない場合は利用しないでください。",
      ],
      sections: [
        {
          title: "サービスの範囲",
          paragraphs: [
            "FinePocket は、FinePocket Toolbox を通じて一般的な情報取得や生産性向上のためのオンラインツール、計算機、参考コンテンツを提供します。サービスは現状有姿かつ提供可能な範囲で提供されます。",
          ],
        },
        {
          title: "許容される利用",
          paragraphs: [
            "利用が適法であり、サイトの運用、安全性、可用性を妨げない限り、個人、教育、商用の目的でサービスを利用できます。",
          ],
          bullets: [
            "サービスを妨害したり過負荷を与えたりしないこと",
            "法律や第三者の権利を侵害する目的で利用しないこと",
            "欺瞞的、有害、または乱用的な活動にツールを使わないこと",
          ],
        },
        {
          title: "正確性と参考情報",
          paragraphs: [
            "ツールの結果は利便性と一般的な情報提供のために提供されます。FinePocket は、すべての結果が完全、無誤、またはあらゆる文脈に適していることを保証しません。",
            "金融、健康、計画に関するツールは参考用途に限られ、専門家の助言に代わるものではありません。",
          ],
        },
        {
          title: "責任と第三者サービス",
          paragraphs: [
            "一部の機能は、ホスティング、分析、広告などの第三者プロバイダーに依存する場合があります。FinePocket は、それらの提供者による停止、方針変更、または行為について責任を負いません。",
            "法令で認められる最大限の範囲で、FinePocket は、サイト利用または結果への依拠から生じる間接的、付随的、特別、結果的、または懲罰的損害について責任を負いません。",
          ],
        },
        {
          title: "更新と連絡先",
          paragraphs: [
            "製品や法的要件の変化に応じて、本規約は更新される場合があります。更新後も利用を続けることで、改訂後の規約に同意したものとみなされます。質問は support@finepocket.app までお送りください。",
          ],
        },
      ],
    },
    contact: {
      metaTitle: "お問い合わせ",
      title: "お問い合わせ",
      description:
        "サポート、不具合報告、提携、新しいツールの提案について FinePocket Toolbox に連絡できます。",
      intro: [
        "質問、不具合報告、製品フィードバック、広告の相談、提携の相談を歓迎します。FinePocket の主なサポート窓口はメールです。",
      ],
      email: SUPPORT_EMAIL,
      sections: [
        {
          title: "一般サポート",
          paragraphs: [
            "一般的な質問、フィードバック、ポリシーに関する依頼、ツールの使い方の確認には support@finepocket.app をご利用ください。",
          ],
        },
        {
          title: "不具合報告",
          paragraphs: [
            "想定外の動作があった場合は、ツールの URL、問題の概要、安全に共有できる範囲での入力内容、使用したブラウザまたは端末をお知らせください。",
          ],
          bullets: [
            "ツール名またはページ URL",
            "期待した結果と実際の結果",
            "ブラウザ名とバージョン",
            "可能であればスクリーンショットや録画",
          ],
        },
        {
          title: "機能要望",
          paragraphs: [
            "新しいツールや改善案は、解決したい仕事、想定ユーザー、現在のワークフローの難しさを含めていただくと特に役立ちます。",
          ],
        },
        {
          title: "ビジネスと広告",
          paragraphs: [
            "提携、スポンサーシップ、広告に関するお問い合わせにも同じメールアドレスをご利用ください。会社名、希望時期、想定範囲などの情報があると回答が早くなります。",
          ],
        },
      ],
      callout: {
        title: "返信時間",
        body: "通常は 1〜2 営業日以内に返信します。十分な情報が最初のメッセージに含まれていれば、緊急の機能障害にはより早く対応できる場合があります。",
      },
    },
  },
  es: {
    about: {
      metaTitle: "Acerca de",
      title: "Acerca de FinePocket Toolbox",
      description:
        "Conoce cómo FinePocket Toolbox crea herramientas rápidas basadas en el navegador con foco en privacidad, claridad y utilidad práctica.",
      intro: [
        "FinePocket Toolbox es una colección de herramientas basadas en el navegador para desarrolladores, escritores, estudiantes y cualquier persona que quiera respuestas rápidas sin instalar software ni crear una cuenta.",
        "El proyecto busca simplificar tareas cotidianas: abrir una herramienta, resolver el problema y seguir adelante. Siempre que es posible, el procesamiento ocurre directamente en el navegador para que los datos sensibles permanezcan en el dispositivo del usuario.",
      ],
      sections: [
        {
          title: "Qué construimos",
          paragraphs: [
            "El sitio se centra en herramientas prácticas para flujos de desarrollo, trabajo con texto y casos de uso financieros o de cálculo. Cada página combina una herramienta interactiva con contenido explicativo.",
            "Esa estructura importa tanto para la usabilidad como para la confianza. Una página debe seguir siendo útil incluso antes de pulsar un botón.",
          ],
        },
        {
          title: "Diseño orientado a la privacidad",
          paragraphs: [
            "Cuando una función puede ejecutarse de forma segura en el navegador, FinePocket Toolbox la mantiene en el navegador. Formateadores, codificadores, decodificadores, utilidades de texto y muchas calculadoras siguen ese principio.",
            "Si una herramienta depende de datos de referencia externos, la página debe explicar claramente esa dependencia.",
          ],
        },
        {
          title: "Calidad y publicidad",
          paragraphs: [
            "Las nuevas herramientas se revisan por accesibilidad, comportamiento responsivo, soporte de modo oscuro y explicaciones claras. Las páginas financieras también incluyen avisos de uso meramente orientativo.",
            "El modelo de monetización a largo plazo se basa en publicidad no intrusiva. Los anuncios deben apoyar el proyecto sin interrumpir la tarea principal ni generar clics accidentales cerca de controles importantes.",
          ],
          bullets: [
            "Sin registro obligatorio antes de usar una herramienta",
            "Explicaciones claras sobre el significado del resultado",
            "Páginas de políticas y contacto visibles en el pie",
            "Enlaces internos entre flujos de trabajo relacionados",
          ],
        },
      ],
      callout: {
        title: "Contacto y comentarios",
        body: "Las preguntas, informes de errores, propuestas de colaboración y sugerencias de nuevas herramientas pueden enviarse a support@finepocket.app.",
      },
    },
    privacy: {
      metaTitle: "Política de privacidad",
      title: "Política de privacidad",
      description:
        "Consulta cómo FinePocket Toolbox gestiona el procesamiento en el navegador, los registros de hosting, la publicidad, la analítica y las solicitudes de contacto.",
      lastUpdatedLabel: "Última actualización",
      lastUpdated: LAST_UPDATED,
      intro: [
        "FinePocket opera FinePocket Toolbox, y muchas herramientas están diseñadas para funcionar directamente en el navegador. Esta política explica qué datos se procesan y cuáles no cuando utilizas el sitio.",
      ],
      sections: [
        {
          title: "Procesamiento en el navegador",
          paragraphs: [
            "En herramientas basadas en el navegador como formateadores, codificadores, decodificadores, utilidades de texto y muchas calculadoras, los datos que introduces se procesan localmente en tu navegador. FinePocket no envía intencionadamente esa entrada a un servidor de aplicaciones para almacenarla o analizarla.",
            "Si una herramienta necesita datos de referencia externos, como tipos de cambio, la página debe indicarlo claramente.",
          ],
        },
        {
          title: "Hosting y registros",
          paragraphs: [
            "El sitio está alojado en Vercel. Como la mayoría de proveedores de hosting, Vercel puede procesar datos técnicos de la solicitud como dirección IP, ruta solicitada, marcas de tiempo y eventos de seguridad para operaciones, fiabilidad y prevención de abusos.",
          ],
        },
        {
          title: "Cookies, preferencias y publicidad",
          paragraphs: [
            "FinePocket Toolbox puede utilizar almacenamiento local del navegador para preferencias del producto como el tema o el idioma.",
            "Si la publicidad está habilitada, socios como Google AdSense pueden utilizar cookies o tecnologías similares para ofrecer, medir o personalizar anuncios conforme a sus políticas y a los requisitos de consentimiento aplicables.",
          ],
        },
        {
          title: "Analítica",
          paragraphs: [
            "El sitio puede utilizar analítica respetuosa con la privacidad para entender patrones generales de uso, como páginas vistas, herramientas populares, categorías de dispositivos y recorridos de navegación. El objetivo es mejorar el producto, no inspeccionar la entrada de las herramientas.",
          ],
        },
        {
          title: "Solicitudes de contacto",
          paragraphs: [
            "Si envías un correo a support@finepocket.app, tu dirección de correo y el contenido del mensaje pueden utilizarse para responder a tu solicitud y mantener un historial de soporte cuando sea necesario.",
          ],
        },
        {
          title: "Tus opciones",
          paragraphs: [
            "Puedes dejar de usar el sitio en cualquier momento, borrar los datos locales del sitio desde la configuración del navegador, bloquear cookies mediante los controles del navegador y contactar al soporte si tienes preguntas sobre esta política.",
          ],
          bullets: [
            "Borrar los datos locales del sitio en tu navegador",
            "Bloquear o eliminar cookies desde la configuración del navegador",
            "Usar herramientas de privacidad acordes a tus preferencias",
            "Enviar preguntas de privacidad a support@finepocket.app",
          ],
        },
      ],
    },
    terms: {
      metaTitle: "Términos de servicio",
      title: "Términos de servicio",
      description:
        "Consulta las condiciones que rigen el uso de FinePocket Toolbox, incluido el uso permitido, los avisos de exención y los límites de responsabilidad.",
      lastUpdatedLabel: "Última actualización",
      lastUpdated: LAST_UPDATED,
      intro: [
        "Estos términos regulan el acceso y uso de FinePocket Toolbox. Al usar el sitio, aceptas estos términos. Si no estás de acuerdo, no utilices el servicio.",
      ],
      sections: [
        {
          title: "Alcance del servicio",
          paragraphs: [
            "FinePocket Toolbox ofrece utilidades en línea, calculadoras y contenido de referencia para fines generales de información y productividad. El servicio se proporciona tal cual y según disponibilidad.",
          ],
        },
        {
          title: "Uso permitido",
          paragraphs: [
            "Puedes utilizar el servicio con fines personales, educativos y comerciales siempre que tu uso sea legal y no interfiera con el funcionamiento, la seguridad o la disponibilidad del sitio.",
          ],
          bullets: [
            "No intentes interrumpir ni sobrecargar el servicio",
            "No utilices el sitio para infringir la ley o derechos de terceros",
            "No utilices las herramientas para actividades engañosas, dañinas o abusivas",
          ],
        },
        {
          title: "Exactitud e información de referencia",
          paragraphs: [
            "Los resultados de las herramientas se proporcionan por conveniencia e información general. FinePocket no garantiza que cada resultado sea completo, libre de errores o adecuado para cualquier contexto.",
            "Las herramientas financieras, de salud y de planificación deben considerarse solo ayudas de referencia y no sustituyen asesoramiento profesional.",
          ],
        },
        {
          title: "Responsabilidad y servicios de terceros",
          paragraphs: [
            "Algunas funciones pueden depender de proveedores externos como servicios de hosting, analítica o publicidad. FinePocket no es responsable de caídas, cambios de políticas o acciones de dichos proveedores.",
            "En la máxima medida permitida por la ley, FinePocket no será responsable de daños indirectos, incidentales, especiales, consecuentes o ejemplares derivados del uso del sitio o de la confianza en sus resultados.",
          ],
        },
        {
          title: "Actualizaciones y contacto",
          paragraphs: [
            "Estos términos pueden actualizarse cuando evolucione el producto o cambien los requisitos legales. El uso continuado tras una actualización implica la aceptación de los términos revisados. Las preguntas pueden enviarse a support@finepocket.app.",
          ],
        },
      ],
    },
    contact: {
      metaTitle: "Contacto",
      title: "Contacto",
      description:
        "Contacta con FinePocket para soporte, informes de errores, alianzas o sugerencias relacionadas con FinePocket Toolbox.",
      intro: [
        "Las preguntas, informes de errores, comentarios sobre el producto, consultas publicitarias y solicitudes de colaboración son bienvenidos. El correo electrónico es el canal principal de soporte de FinePocket Toolbox.",
      ],
      email: SUPPORT_EMAIL,
      sections: [
        {
          title: "Soporte general",
          paragraphs: [
            "Utiliza support@finepocket.app para preguntas generales, comentarios, solicitudes relacionadas con políticas o ayuda para entender cómo funciona una herramienta.",
          ],
        },
        {
          title: "Informes de errores",
          paragraphs: [
            "Si algo se comporta de forma inesperada, incluye la URL de la herramienta, una breve descripción del problema, la entrada utilizada si es segura de compartir y el navegador o dispositivo donde ocurrió.",
          ],
          bullets: [
            "Nombre de la herramienta o URL de la página",
            "Resultado esperado y resultado real",
            "Nombre y versión del navegador",
            "Captura de pantalla o grabación si está disponible",
          ],
        },
        {
          title: "Solicitudes de funciones",
          paragraphs: [
            "Las sugerencias de nuevas herramientas o mejoras son más útiles cuando describen el trabajo que se quiere resolver, el usuario probable y qué dificulta hoy ese flujo.",
          ],
        },
        {
          title: "Negocio y publicidad",
          paragraphs: [
            "Utiliza la misma dirección de correo para consultas sobre colaboraciones, patrocinios o publicidad. Datos como el nombre de la empresa, el plazo y el alcance esperado ayudan a responder más rápido.",
          ],
        },
      ],
      callout: {
        title: "Tiempo de respuesta",
        body: "La mayoría de los mensajes reciben respuesta en uno o dos días laborables. Los problemas funcionales urgentes pueden recibir respuesta más rápida si el primer mensaje incluye suficiente detalle.",
      },
    },
  },
  fr: {
    about: {
      metaTitle: "À propos",
      title: "À propos de FinePocket Toolbox",
      description:
        "Découvrez comment FinePocket Toolbox conçoit des outils rapides basés sur le navigateur avec un accent sur la confidentialité, la clarté et l'utilité pratique.",
      intro: [
        "FinePocket Toolbox est une collection d'outils basés sur le navigateur destinée aux développeurs, rédacteurs, étudiants et à toute personne qui veut une réponse rapide sans installer de logiciel ni créer de compte.",
        "Le projet vise à simplifier les tâches du quotidien : ouvrir un outil, résoudre le problème, puis continuer. Lorsque c'est possible, le traitement se fait directement dans le navigateur afin que les données sensibles restent sur l'appareil de l'utilisateur.",
      ],
      sections: [
        {
          title: "Ce que nous construisons",
          paragraphs: [
            "Le site se concentre sur des outils pratiques pour les workflows de développement, les tâches de texte et les usages financiers ou de calcul. Chaque page associe un outil interactif à un contenu explicatif.",
            "Cette structure compte autant pour l'utilisabilité que pour la confiance. Une page doit rester utile même avant qu'un visiteur clique sur un bouton.",
          ],
        },
        {
          title: "Une conception axée sur la confidentialité",
          paragraphs: [
            "Lorsqu'une fonctionnalité peut être exécutée en toute sécurité dans le navigateur, FinePocket Toolbox la garde dans le navigateur. Les formatteurs, encodeurs, décodeurs, utilitaires de texte et de nombreuses calculatrices suivent ce principe.",
            "Si un outil dépend de données de référence externes, la page doit l'indiquer clairement.",
          ],
        },
        {
          title: "Qualité et publicité",
          paragraphs: [
            "Les nouveaux outils sont vérifiés sur l'accessibilité, le comportement responsive, le mode sombre et la clarté des explications. Les pages financières comportent aussi des avertissements rappelant que les résultats restent indicatifs.",
            "Le modèle de monétisation à long terme repose sur une publicité non intrusive. Les annonces doivent soutenir le projet sans gêner la tâche principale ni provoquer de clics accidentels près des contrôles importants.",
          ],
          bullets: [
            "Aucune inscription obligatoire avant usage",
            "Des explications claires sur la signification d'un résultat",
            "Des pages de politique et de contact visibles dans le pied de page",
            "Des liens internes entre workflows proches",
          ],
        },
      ],
      callout: {
        title: "Contact et retours",
        body: "Les questions, signalements de bugs, demandes de partenariat et suggestions de nouveaux outils peuvent être envoyés à support@finepocket.app.",
      },
    },
    privacy: {
      metaTitle: "Politique de confidentialité",
      title: "Politique de confidentialité",
      description:
        "Consultez la manière dont FinePocket Toolbox gère le traitement dans le navigateur, les journaux d'hébergement, la publicité, l'analytique et les demandes de contact.",
      lastUpdatedLabel: "Dernière mise à jour",
      lastUpdated: LAST_UPDATED,
      intro: [
        "FinePocket Toolbox est conçu pour que de nombreux outils fonctionnent directement dans le navigateur. Cette politique explique quelles données sont traitées ou non lorsque vous utilisez le site.",
      ],
      sections: [
        {
          title: "Traitement dans le navigateur",
          paragraphs: [
            "Pour les outils basés sur le navigateur comme les formatteurs, encodeurs, décodeurs, utilitaires de texte et de nombreuses calculatrices, les données saisies sont traitées localement dans votre navigateur. FinePocket Toolbox n'envoie pas volontairement ces données à un serveur applicatif pour les stocker ou les analyser.",
            "Si un outil nécessite des données de référence externes, comme des taux de change, la page doit l'indiquer clairement.",
          ],
        },
        {
          title: "Hébergement et journaux",
          paragraphs: [
            "Le site est hébergé sur Vercel. Comme la plupart des hébergeurs, Vercel peut traiter des données techniques de requête telles que l'adresse IP, le chemin demandé, les horodatages et les événements de sécurité pour l'exploitation, la fiabilité et la prévention des abus.",
          ],
        },
        {
          title: "Cookies, préférences et publicité",
          paragraphs: [
            "FinePocket Toolbox peut utiliser le stockage local du navigateur pour des préférences produit telles que le thème ou la langue.",
            "Si la publicité est activée, des partenaires tels que Google AdSense peuvent utiliser des cookies ou technologies similaires pour diffuser, mesurer ou personnaliser les annonces conformément à leurs politiques et aux exigences de consentement applicables.",
          ],
        },
        {
          title: "Analytique",
          paragraphs: [
            "Le site peut utiliser une analytique respectueuse de la vie privée afin de comprendre des tendances générales d'utilisation comme les pages vues, les outils populaires, les catégories d'appareils et les parcours de navigation. L'objectif est d'améliorer le produit, pas d'inspecter les saisies dans les outils.",
          ],
        },
        {
          title: "Demandes de contact",
          paragraphs: [
            "Si vous envoyez un e-mail à support@finepocket.app, votre adresse e-mail et le contenu du message peuvent être utilisés pour répondre à votre demande et conserver un historique de support lorsque nécessaire.",
          ],
        },
        {
          title: "Vos choix",
          paragraphs: [
            "Vous pouvez cesser d'utiliser le site à tout moment, effacer les données locales du site via les paramètres du navigateur, bloquer les cookies via le navigateur et contacter le support si vous avez des questions sur cette politique.",
          ],
          bullets: [
            "Effacer les données locales du site dans le navigateur",
            "Bloquer ou supprimer les cookies via les paramètres du navigateur",
            "Utiliser les outils de confidentialité adaptés à vos préférences",
            "Envoyer vos questions à support@finepocket.app",
          ],
        },
      ],
    },
    terms: {
      metaTitle: "Conditions d'utilisation",
      title: "Conditions d'utilisation",
      description:
        "Consultez les conditions qui régissent l'utilisation de FinePocket Toolbox, y compris les usages autorisés, les avertissements et les limites de responsabilité.",
      lastUpdatedLabel: "Dernière mise à jour",
      lastUpdated: LAST_UPDATED,
      intro: [
        "Les présentes conditions régissent l'accès à FinePocket Toolbox et son utilisation. En utilisant le site, vous acceptez ces conditions. Si vous n'êtes pas d'accord, n'utilisez pas le service.",
      ],
      sections: [
        {
          title: "Portée du service",
          paragraphs: [
            "FinePocket fournit, via FinePocket Toolbox, des utilitaires en ligne, des calculatrices et des contenus de référence à des fins générales d'information et de productivité. Le service est fourni tel quel et selon disponibilité.",
          ],
        },
        {
          title: "Usage autorisé",
          paragraphs: [
            "Vous pouvez utiliser le service à des fins personnelles, éducatives et commerciales tant que votre usage est légal et n'interfère pas avec le fonctionnement, la sécurité ou la disponibilité du site.",
          ],
          bullets: [
            "Ne tentez pas de perturber ou surcharger le service",
            "N'utilisez pas le site pour violer la loi ou les droits de tiers",
            "N'utilisez pas les outils pour des activités trompeuses, nuisibles ou abusives",
          ],
        },
        {
          title: "Exactitude et information de référence",
          paragraphs: [
            "Les résultats des outils sont fournis pour des raisons de commodité et d'information générale. FinePocket Toolbox ne garantit pas que chaque résultat soit complet, exempt d'erreur ou adapté à tous les contextes.",
            "Les outils liés à la finance, à la santé ou à la planification doivent être considérés comme des aides de référence et ne remplacent pas un avis professionnel.",
          ],
        },
        {
          title: "Responsabilité et services tiers",
          paragraphs: [
            "Certaines fonctionnalités peuvent dépendre de fournisseurs tiers tels que l'hébergement, l'analytique ou la publicité. FinePocket n'est pas responsable des interruptions, changements de politique ou actions de ces fournisseurs.",
            "Dans toute la mesure permise par la loi, FinePocket Toolbox ne saurait être tenu responsable des dommages indirects, accessoires, spéciaux, consécutifs ou exemplaires résultant de l'utilisation du site ou de la confiance accordée à ses résultats.",
          ],
        },
        {
          title: "Mises à jour et contact",
          paragraphs: [
            "Ces conditions peuvent être mises à jour à mesure que le produit évolue ou que les obligations légales changent. Le fait de continuer à utiliser le site après une mise à jour signifie que vous acceptez la version révisée. Les questions peuvent être envoyées à support@finepocket.app.",
          ],
        },
      ],
    },
    contact: {
      metaTitle: "Contact",
      title: "Contact",
      description:
        "Contactez FinePocket pour le support, les signalements de bugs, les partenariats ou les suggestions liées à FinePocket Toolbox.",
      intro: [
        "Les questions, signalements de bugs, retours produit, demandes publicitaires et propositions de partenariat sont les bienvenus. L'e-mail est le principal canal de support de FinePocket Toolbox.",
      ],
      email: SUPPORT_EMAIL,
      sections: [
        {
          title: "Support général",
          paragraphs: [
            "Utilisez support@finepocket.app pour les questions générales, les retours, les demandes liées aux politiques ou l'aide pour comprendre le fonctionnement d'un outil.",
          ],
        },
        {
          title: "Signalements de bugs",
          paragraphs: [
            "Si quelque chose se comporte de façon inattendue, indiquez l'URL de l'outil, une brève description du problème, la saisie utilisée si elle peut être partagée en toute sécurité, ainsi que le navigateur ou l'appareil concerné.",
          ],
          bullets: [
            "Nom de l'outil ou URL de la page",
            "Résultat attendu et résultat réel",
            "Nom et version du navigateur",
            "Capture d'écran ou enregistrement si disponible",
          ],
        },
        {
          title: "Demandes de fonctionnalités",
          paragraphs: [
            "Les suggestions de nouveaux outils ou d'améliorations sont plus utiles lorsqu'elles décrivent la tâche à accomplir, l'utilisateur visé et la difficulté actuelle du workflow.",
          ],
        },
        {
          title: "Commercial et publicité",
          paragraphs: [
            "Utilisez la même adresse e-mail pour les demandes de partenariat, de sponsoring ou de publicité. Des informations comme le nom de l'entreprise, le calendrier et le périmètre attendu permettent d'accélérer la réponse.",
          ],
        },
      ],
      callout: {
        title: "Délai de réponse",
        body: "La plupart des messages reçoivent une réponse sous un à deux jours ouvrés. Les problèmes fonctionnels urgents peuvent être traités plus vite si le premier message contient suffisamment de détails.",
      },
    },
  },
  pt: {
    about: {
      metaTitle: "Sobre",
      title: "Sobre o FinePocket Toolbox",
      description:
        "Saiba como o FinePocket Toolbox cria ferramentas rápidas baseadas no navegador com foco em privacidade, clareza e utilidade prática.",
      intro: [
        "FinePocket Toolbox é uma coleção de ferramentas baseadas no navegador para desenvolvedores, escritores, estudantes e qualquer pessoa que queira respostas rápidas sem instalar software nem criar conta.",
        "O projeto busca simplificar tarefas do dia a dia: abrir uma ferramenta, resolver o problema e seguir em frente. Sempre que possível, o processamento acontece diretamente no navegador para que dados sensíveis permaneçam no dispositivo do usuário.",
      ],
      sections: [
        {
          title: "O que criamos",
          paragraphs: [
            "O site se concentra em ferramentas práticas para fluxos de desenvolvimento, trabalho com texto e casos de uso financeiros ou de cálculo. Cada página combina uma ferramenta interativa com conteúdo explicativo.",
            "Essa estrutura é importante tanto para a usabilidade quanto para a confiança. Uma página deve continuar útil mesmo antes de alguém clicar em um botão.",
          ],
        },
        {
          title: "Design com privacidade em primeiro lugar",
          paragraphs: [
            "Quando uma funcionalidade pode ser executada com segurança no navegador, o FinePocket Toolbox a mantém no navegador. Formatadores, codificadores, decodificadores, utilitários de texto e muitas calculadoras seguem esse princípio.",
            "Se uma ferramenta depender de dados de referência externos, a página deve explicar essa dependência de forma clara.",
          ],
        },
        {
          title: "Qualidade e publicidade",
          paragraphs: [
            "Novas ferramentas são revisadas quanto à acessibilidade, comportamento responsivo, suporte a modo escuro e clareza nas explicações. Páginas financeiras também incluem avisos de uso apenas referencial.",
            "O modelo de monetização de longo prazo é baseado em publicidade não intrusiva. Os anúncios devem apoiar o projeto sem interromper a tarefa principal nem provocar cliques acidentais perto de controles importantes.",
          ],
          bullets: [
            "Sem cadastro obrigatório antes do uso",
            "Explicações claras sobre o significado do resultado",
            "Páginas de política e contato visíveis no rodapé",
            "Links internos entre fluxos de trabalho relacionados",
          ],
        },
      ],
      callout: {
        title: "Contato e feedback",
        body: "Dúvidas, relatos de bugs, pedidos de parceria e sugestões de novas ferramentas podem ser enviados para support@finepocket.app.",
      },
    },
    privacy: {
      metaTitle: "Política de Privacidade",
      title: "Política de Privacidade",
      description:
        "Veja como o FinePocket Toolbox lida com processamento no navegador, logs de hospedagem, publicidade, análises e solicitações de contato.",
      lastUpdatedLabel: "Última atualização",
      lastUpdated: LAST_UPDATED,
      intro: [
        "A FinePocket opera o FinePocket Toolbox, e muitas ferramentas foram projetadas para funcionar diretamente no navegador. Esta política explica quais dados são processados e quais não são quando você usa o site.",
      ],
      sections: [
        {
          title: "Processamento no navegador",
          paragraphs: [
            "Em ferramentas baseadas no navegador, como formatadores, codificadores, decodificadores, utilitários de texto e muitas calculadoras, os dados inseridos são processados localmente no navegador. A FinePocket não envia intencionalmente essa entrada para um servidor de aplicação para armazenamento ou análise.",
            "Se uma ferramenta precisar de dados de referência externos, como taxas de câmbio, a página deve deixar essa dependência clara.",
          ],
        },
        {
          title: "Hospedagem e logs",
          paragraphs: [
            "O site é hospedado na Vercel. Como a maioria dos provedores de hospedagem, a Vercel pode processar dados técnicos de requisição, como endereço IP, caminho solicitado, carimbos de data e hora e eventos de segurança, para operação, confiabilidade e prevenção de abuso.",
          ],
        },
        {
          title: "Cookies, preferências e publicidade",
          paragraphs: [
            "A FinePocket pode usar armazenamento local do navegador para preferências do produto no FinePocket Toolbox, como tema ou idioma.",
            "Se a publicidade estiver ativada, parceiros como o Google AdSense poderão usar cookies ou tecnologias semelhantes para entregar, medir ou personalizar anúncios de acordo com suas políticas e requisitos de consentimento aplicáveis.",
          ],
        },
        {
          title: "Análises",
          paragraphs: [
            "O site pode usar análises com foco em privacidade para entender padrões gerais de uso, como visualizações de páginas, ferramentas populares, categorias de dispositivos e fluxos de navegação. O objetivo é melhorar o produto, não inspecionar a entrada das ferramentas.",
          ],
        },
        {
          title: "Solicitações de contato",
          paragraphs: [
            "Se você enviar um e-mail para support@finepocket.app, seu endereço de e-mail e o conteúdo da mensagem poderão ser usados para responder à solicitação e manter um histórico de suporte quando necessário.",
          ],
        },
        {
          title: "Suas escolhas",
          paragraphs: [
            "Você pode parar de usar o site a qualquer momento, limpar os dados locais do site nas configurações do navegador, bloquear cookies pelos controles do navegador e entrar em contato com o suporte se tiver dúvidas sobre esta política.",
          ],
          bullets: [
            "Limpar os dados locais do site no navegador",
            "Bloquear ou excluir cookies nas configurações do navegador",
            "Usar ferramentas de privacidade adequadas às suas preferências",
            "Enviar dúvidas para support@finepocket.app",
          ],
        },
      ],
    },
    terms: {
      metaTitle: "Termos de Serviço",
      title: "Termos de Serviço",
      description:
        "Consulte os termos que regem o uso do FinePocket Toolbox, incluindo uso permitido, avisos e limites de responsabilidade.",
      lastUpdatedLabel: "Última atualização",
      lastUpdated: LAST_UPDATED,
      intro: [
        "Estes termos regem o acesso e o uso do FinePocket Toolbox. Ao usar o site, você concorda com estes termos. Se não concordar, não utilize o serviço.",
      ],
      sections: [
        {
          title: "Escopo do serviço",
          paragraphs: [
            "A FinePocket oferece, por meio do FinePocket Toolbox, utilitários online, calculadoras e conteúdo de referência para fins gerais de informação e produtividade. O serviço é fornecido no estado em que se encontra e conforme disponibilidade.",
          ],
        },
        {
          title: "Uso permitido",
          paragraphs: [
            "Você pode usar o serviço para fins pessoais, educacionais e comerciais desde que o uso seja legal e não interfira na operação, segurança ou disponibilidade do site.",
          ],
          bullets: [
            "Não tente interromper ou sobrecarregar o serviço",
            "Não use o site para violar a lei ou direitos de terceiros",
            "Não use as ferramentas para atividades enganosas, nocivas ou abusivas",
          ],
        },
        {
          title: "Precisão e informação de referência",
          paragraphs: [
            "Os resultados das ferramentas são fornecidos por conveniência e informação geral. A FinePocket não garante que cada resultado seja completo, livre de erros ou adequado para qualquer contexto.",
            "Ferramentas de finanças, saúde e planejamento devem ser tratadas apenas como apoio de referência e não substituem aconselhamento profissional.",
          ],
        },
        {
          title: "Responsabilidade e serviços de terceiros",
          paragraphs: [
            "Alguns recursos podem depender de provedores terceiros, como hospedagem, análises ou publicidade. A FinePocket não é responsável por indisponibilidades, mudanças de política ou ações desses provedores.",
            "Na máxima medida permitida por lei, o FinePocket Toolbox não será responsável por danos indiretos, incidentais, especiais, consequenciais ou exemplares decorrentes do uso do site ou da confiança em seus resultados.",
          ],
        },
        {
          title: "Atualizações e contato",
          paragraphs: [
            "Estes termos podem ser atualizados conforme o produto evolui ou requisitos legais mudam. O uso contínuo após uma atualização significa aceitação da versão revisada. Dúvidas podem ser enviadas para support@finepocket.app.",
          ],
        },
      ],
    },
    contact: {
      metaTitle: "Contato",
      title: "Contato",
      description:
        "Entre em contato com a FinePocket para suporte, relatos de bugs, parcerias ou sugestões relacionadas ao FinePocket Toolbox.",
      intro: [
        "Dúvidas, relatos de bugs, feedback sobre o produto, consultas de publicidade e pedidos de parceria são bem-vindos. O e-mail é o principal canal de suporte do FinePocket Toolbox.",
      ],
      email: SUPPORT_EMAIL,
      sections: [
        {
          title: "Suporte geral",
          paragraphs: [
            "Use support@finepocket.app para dúvidas gerais, feedback, solicitações relacionadas a políticas ou ajuda para entender como uma ferramenta funciona.",
          ],
        },
        {
          title: "Relatos de bugs",
          paragraphs: [
            "Se algo se comportar de forma inesperada, inclua a URL da ferramenta, uma breve descrição do problema, a entrada usada se ela puder ser compartilhada com segurança e o navegador ou dispositivo em que ocorreu.",
          ],
          bullets: [
            "Nome da ferramenta ou URL da página",
            "Resultado esperado e resultado real",
            "Nome e versão do navegador",
            "Captura de tela ou gravação, se disponível",
          ],
        },
        {
          title: "Solicitações de recursos",
          paragraphs: [
            "Sugestões de novas ferramentas ou melhorias são mais úteis quando descrevem a tarefa a ser resolvida, o usuário provável e o que torna o fluxo difícil hoje.",
          ],
        },
        {
          title: "Negócios e publicidade",
          paragraphs: [
            "Use o mesmo endereço de e-mail para consultas sobre parceria, patrocínio ou publicidade. Informações como nome da empresa, prazo e escopo esperado ajudam a acelerar a resposta.",
          ],
        },
      ],
      callout: {
        title: "Tempo de resposta",
        body: "A maioria das mensagens recebe resposta em um ou dois dias úteis. Problemas funcionais urgentes podem ser respondidos mais rápido quando a primeira mensagem já contém detalhes suficientes.",
      },
    },
  },
  ko: {
    about: {
      metaTitle: "소개",
      title: "FinePocket Toolbox 소개",
      description:
        "FinePocket Toolbox가 개인정보 보호, 명확성, 실용성을 중심에 두고 빠른 브라우저 기반 도구를 어떻게 만드는지 소개합니다.",
      lastUpdatedLabel: "최종 업데이트",
      lastUpdated: LAST_UPDATED,
      intro: [
        "FinePocket Toolbox는 개발자, 작성자, 학생, 그리고 프로그램 설치나 회원가입 없이 빠르게 답을 얻고 싶은 사람들을 위한 브라우저 기반 도구 모음입니다.",
        "이 프로젝트의 목표는 일상적인 작업을 단순하게 만드는 것입니다. 도구를 열고, 문제를 해결하고, 바로 다음 작업으로 넘어갈 수 있도록 설계했습니다. 가능한 경우 처리 과정은 브라우저 안에서 끝나며, 민감한 입력값은 사용자의 기기에 남도록 합니다.",
      ],
      sections: [
        {
          title: "무엇을 만드는가",
          paragraphs: [
            "이 사이트는 개발 워크플로우, 텍스트 작업, 금융 및 계산 관련 사용 사례를 위한 실용적인 도구에 집중합니다. 각 페이지는 인터랙티브 도구와 설명 콘텐츠를 함께 제공합니다.",
            "이 구조는 사용성과 신뢰 모두에 중요합니다. 사용자가 버튼을 누르기 전에도 페이지 자체가 충분히 도움이 되어야 한다고 생각합니다.",
          ],
        },
        {
          title: "개인정보 보호 우선 설계",
          paragraphs: [
            "기능을 브라우저 안에서 안전하게 실행할 수 있다면 FinePocket는 FinePocket Toolbox 안에서 그 처리를 유지합니다. 포매터, 인코더, 디코더, 텍스트 유틸리티, 많은 계산 도구가 이 원칙을 따릅니다.",
            "도구가 외부 참조 데이터에 의존하는 경우에는 그 사실을 페이지에서 명확하게 설명해야 한다고 봅니다.",
          ],
        },
        {
          title: "페이지를 검토하는 기준",
          paragraphs: [
            "이 사이트는 버튼을 누르기 전과 후 모두 페이지가 도움이 되어야 한다고 봅니다. 그래서 계산식과 결과 로직을 확인하고, 인터페이스의 경계 사례를 점검하며, 도구가 실제로 하는 일을 설명 콘텐츠와 맞춰 둡니다.",
            "금융이나 건강처럼 신뢰 기대치가 높은 주제는 더 보수적으로 다룹니다. 이런 페이지는 전문 조언을 대체하는 것이 아니라 참고용 보조 수단으로 제시하는 것을 원칙으로 합니다.",
          ],
          bullets: [
            "결과 로직과 자주 발생하는 경계 사례 점검",
            "설명 문구와 실제 구현 동작 정합성 확인",
            "금융·건강 결과에는 참고용 안내 추가",
            "정책 및 문의 링크를 사이트 전반에 노출",
          ],
        },
        {
          title: "품질과 광고",
          paragraphs: [
            "새로운 도구는 접근성, 반응형 동작, 다크 모드, 이해하기 쉬운 설명을 기준으로 점검합니다. 금융 관련 페이지에는 결과가 참고용이라는 점을 분명히 하는 안내도 포함합니다.",
            "장기적인 수익화 모델은 비침해형 광고를 전제로 합니다. 광고는 핵심 작업을 방해하거나, 주요 조작과 섞이거나, 결과 자체를 유료 콘텐츠처럼 오해하게 만들어서는 안 됩니다.",
          ],
          bullets: [
            "도구 사용 전에 회원가입 강제 없음",
            "결과가 의미하는 바를 명확하게 설명",
            "정책 및 문의 페이지를 푸터에 상시 노출",
            "유사한 작업 흐름을 내부 링크로 연결",
          ],
        },
      ],
      callout: {
        title: "문의 및 피드백",
        body: "질문, 버그 제보, 제휴 문의, 새로운 도구 제안은 support@finepocket.app 으로 보내실 수 있습니다.",
      },
    },
    privacy: {
      metaTitle: "개인정보 처리방침",
      title: "개인정보 처리방침",
      description:
        "FinePocket가 FinePocket Toolbox와 관련된 브라우저 내 처리, 호스팅 로그, 광고, 분석, 문의 요청을 어떻게 다루는지 확인할 수 있습니다.",
      lastUpdatedLabel: "최종 업데이트",
      lastUpdated: LAST_UPDATED,
      intro: [
        "FinePocket는 FinePocket Toolbox를 운영하며, 많은 도구가 브라우저 안에서 직접 동작하도록 설계되어 있습니다. 이 방침은 사이트 이용 시 어떤 데이터가 처리되고 어떤 데이터가 처리되지 않는지 설명합니다.",
      ],
      sections: [
        {
          title: "브라우저 내 처리",
          paragraphs: [
            "포매터, 인코더, 디코더, 텍스트 유틸리티, 많은 계산 도구와 같은 브라우저 기반 도구에서는 사용자가 입력한 데이터가 브라우저 안에서 로컬로 처리됩니다. FinePocket는 그 입력을 저장하거나 분석하기 위해 애플리케이션 서버로 의도적으로 전송하지 않습니다.",
            "환율처럼 외부 참조 데이터가 필요한 도구의 경우에는 해당 의존성을 페이지에서 명확히 안내해야 합니다.",
          ],
        },
        {
          title: "호스팅과 로그",
          paragraphs: [
            "이 사이트는 Vercel에서 호스팅됩니다. 대부분의 호스팅 제공자와 마찬가지로 Vercel은 운영, 안정성, 오남용 방지를 위해 IP 주소, 요청 경로, 타임스탬프, 보안 이벤트와 같은 기술적 요청 데이터를 처리할 수 있습니다.",
          ],
        },
        {
          title: "쿠키, 환경설정, 광고",
          paragraphs: [
            "FinePocket는 FinePocket Toolbox의 테마나 언어 같은 제품 환경설정을 위해 브라우저 로컬 저장소를 사용할 수 있습니다.",
            "광고가 활성화되면 Google AdSense 같은 파트너가 광고 제공, 측정, 개인화를 위해 쿠키나 유사 기술을 사용할 수 있으며, 이는 각 파트너의 정책과 적용 가능한 동의 요구사항을 따릅니다.",
            "지역별 동의 규칙이 적용되는 경우 FinePocket는 그 요구사항을 선택사항처럼 취급하지 않고, 광고 노출 방식에 반영하려고 합니다.",
          ],
        },
        {
          title: "참조 데이터와 네트워크 요청",
          paragraphs: [
            "대부분의 도구는 로컬 브라우저 처리로 동작하지만, 일부 페이지는 외부 참조 데이터에 의존합니다. 예를 들어 환율 페이지는 현재 참고 값을 보여주기 위해 사이트 API 경로를 통해 캐시된 환율 데이터를 요청할 수 있습니다.",
            "이 경우 페이지는 해당 의존성을 명확하게 설명해야 합니다. 참조 데이터 요청 자체로 일반적인 인프라 로그가 남을 수는 있지만, 기능상 꼭 필요하지 않은 한 사용자가 입력한 내용까지 전송하지 않는 것을 원칙으로 합니다.",
          ],
        },
        {
          title: "분석",
          paragraphs: [
            "이 사이트는 페이지 조회수, 인기 도구, 기기 유형, 이동 경로 같은 고수준 사용 패턴을 이해하기 위해 개인정보를 배려한 분석 도구를 사용할 수 있습니다. 목적은 제품 개선이지 도구 입력 내용을 들여다보는 것이 아닙니다.",
          ],
        },
        {
          title: "문의 요청",
          paragraphs: [
            "support@finepocket.app 으로 이메일을 보내면 답변 제공과 필요 시 지원 이력 관리를 위해 이메일 주소와 메시지 내용이 사용될 수 있습니다.",
          ],
        },
        {
          title: "사용자의 선택",
          paragraphs: [
            "사용자는 언제든 사이트 이용을 중단할 수 있으며, 브라우저 설정에서 로컬 데이터를 지우고, 쿠키를 차단하고, 이 방침에 관한 질문을 지원 채널로 보낼 수 있습니다.",
          ],
          bullets: [
            "브라우저에서 로컬 사이트 데이터 삭제",
            "브라우저 설정에서 쿠키 차단 또는 삭제",
            "개인 취향에 맞는 개인정보 보호 도구 사용",
            "정책 관련 문의를 support@finepocket.app 으로 전송",
          ],
        },
      ],
    },
    terms: {
      metaTitle: "이용 약관",
      title: "이용 약관",
      description:
        "허용되는 사용 범위, 면책 고지, 책임 제한을 포함해 FinePocket Toolbox 이용에 적용되는 조건을 확인할 수 있습니다.",
      lastUpdatedLabel: "최종 업데이트",
      lastUpdated: LAST_UPDATED,
      intro: [
        "본 약관은 FinePocket Toolbox에 대한 접근과 이용을 규율합니다. 사이트를 이용하면 본 약관에 동의한 것으로 간주됩니다. 동의하지 않으면 서비스를 이용하지 마십시오.",
      ],
      sections: [
        {
          title: "서비스 범위",
          paragraphs: [
            "FinePocket는 FinePocket Toolbox를 통해 일반적인 정보 제공과 생산성 향상을 위한 온라인 유틸리티, 계산기, 참고 콘텐츠를 제공합니다. 서비스는 현 상태 그대로, 그리고 제공 가능한 범위 안에서 제공됩니다.",
          ],
        },
        {
          title: "허용되는 사용",
          paragraphs: [
            "이용이 적법하고 사이트의 운영, 보안, 가용성을 방해하지 않는 한 개인, 교육, 상업 목적으로 서비스를 이용할 수 있습니다.",
          ],
          bullets: [
            "서비스를 방해하거나 과부하를 주지 않을 것",
            "법률 또는 제3자의 권리를 침해하는 목적으로 사이트를 사용하지 않을 것",
            "도구를 기만적이거나 유해하거나 남용적인 활동에 사용하지 않을 것",
          ],
        },
        {
          title: "정확성 및 참고 정보",
          paragraphs: [
            "도구 결과는 편의와 일반적인 정보 제공을 위해 제공됩니다. FinePocket는 모든 결과가 완전하거나 오류가 없거나 모든 상황에 적합하다고 보장하지 않습니다.",
            "금융, 건강, 계획 관련 도구는 참고용 보조 수단으로만 사용해야 하며 전문적인 조언을 대체하지 않습니다.",
          ],
        },
        {
          title: "책임과 제3자 서비스",
          paragraphs: [
            "일부 기능은 호스팅, 분석, 광고와 같은 제3자 제공자에 의존할 수 있습니다. FinePocket는 그러한 제공자의 장애, 정책 변경, 또는 행위에 대해 책임지지 않습니다.",
            "법이 허용하는 최대 범위에서 FinePocket는 사이트 이용이나 결과에 대한 신뢰로 인해 발생하는 간접적, 부수적, 특별, 결과적, 징벌적 손해에 대해 책임지지 않습니다.",
          ],
        },
        {
          title: "광고와 외부 이동",
          paragraphs: [
            "사이트에 광고가 표시되는 경우에도 그 배치는 주요 워크플로우 및 도구 결과와 구분되도록 운영하는 것을 원칙으로 합니다.",
            "광고주, 제휴사, 외부 서비스로 이동한 이후의 약관과 개인정보 처리 방식은 해당 제3자의 정책이 적용되며, 이 사이트 약관이 직접 적용되지는 않습니다.",
          ],
        },
        {
          title: "업데이트와 연락처",
          paragraphs: [
            "제품 변화나 법적 요구사항의 변화에 따라 본 약관은 업데이트될 수 있습니다. 업데이트 이후에도 사이트를 계속 사용하면 개정된 약관에 동의한 것으로 봅니다. 문의는 support@finepocket.app 으로 보낼 수 있습니다.",
          ],
        },
      ],
    },
    contact: {
      metaTitle: "문의하기",
      title: "문의하기",
      description:
        "지원, 버그 제보, 제휴, 새로운 도구 제안과 관련해 FinePocket Toolbox에 문의할 수 있습니다.",
      intro: [
        "질문, 버그 제보, 제품 피드백, 광고 문의, 제휴 요청을 모두 환영합니다. FinePocket의 주요 지원 채널은 이메일입니다.",
      ],
      email: SUPPORT_EMAIL,
      sections: [
        {
          title: "일반 문의",
          paragraphs: [
            "일반적인 질문, 피드백, 정책 관련 요청, 도구 사용 방법에 대한 문의는 support@finepocket.app 으로 보내주세요.",
          ],
        },
        {
          title: "버그 제보",
          paragraphs: [
            "예상과 다른 동작이 있었다면 도구 URL, 문제에 대한 짧은 설명, 안전하게 공유 가능한 입력값, 그리고 문제가 발생한 브라우저 또는 기기 정보를 함께 보내주세요.",
          ],
          bullets: [
            "도구 이름 또는 페이지 URL",
            "기대한 결과와 실제 결과",
            "브라우저 이름 및 버전",
            "가능하면 스크린샷 또는 화면 녹화",
          ],
        },
        {
          title: "기능 제안",
          paragraphs: [
            "새로운 도구나 개선 아이디어는 해결하려는 작업, 예상 사용자, 현재 워크플로우가 왜 불편한지를 함께 설명해 주시면 더 큰 도움이 됩니다.",
          ],
        },
        {
          title: "더 빠른 검토에 도움이 되는 정보",
          paragraphs: [
            "첫 메시지에 구체적인 맥락이 많을수록 더 빠르고 정확한 답변이 가능합니다. 재현 단계, 페이지 URL, 기대 동작, 스크린샷이 있으면 문제를 파악하기 위한 왕복을 줄일 수 있습니다.",
          ],
          bullets: [
            "정확한 페이지 URL과 언어 경로",
            "기대한 동작",
            "실제로 발생한 동작",
            "같은 문제가 반복 재현되는지 여부",
          ],
        },
        {
          title: "비즈니스 및 광고",
          paragraphs: [
            "제휴, 스폰서십, 광고 문의도 같은 이메일 주소를 사용해 주세요. 회사명, 일정, 기대 범위 같은 정보가 있으면 더 빠르게 답변할 수 있습니다.",
          ],
        },
      ],
      callout: {
        title: "응답 시간",
        body: "대부분의 문의는 1~2영업일 안에 답변드립니다. 긴급한 기능 문제는 첫 메시지에 충분한 정보가 포함되어 있으면 더 빨리 대응할 수 있습니다.",
      },
    },
  },
};

export function getSitePageContent(
  page: SitePageKey,
  locale: Locale = DEFAULT_LOCALE
): SitePageContent {
  return SITE_PAGE_CONTENT[locale]?.[page] ?? SITE_PAGE_CONTENT[DEFAULT_LOCALE][page];
}

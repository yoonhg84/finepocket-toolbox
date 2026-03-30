"use client";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language = "json", className = "" }: CodeBlockProps) {
  return (
    <pre
      className={`bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-auto text-sm font-mono whitespace-pre-wrap break-all ${className}`}
    >
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
}

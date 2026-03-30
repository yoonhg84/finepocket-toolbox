"use client";

import { useState } from "react";
import { copyToClipboard } from "@/lib/copy-to-clipboard";

interface CopyButtonProps {
  text?: string;
  getText?: () => string;
  label?: string;
  className?: string;
}

export function CopyButton({ text, getText, label = "Copy", className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const value = getText ? getText() : text ?? "";
    const success = await copyToClipboard(value);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
        copied
          ? "bg-green-100 text-green-700 border border-green-300"
          : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
      } ${className}`}
      aria-label={copied ? "Copied!" : label}
    >
      {copied ? "Copied!" : label}
    </button>
  );
}

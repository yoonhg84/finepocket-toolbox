"use client";

import { useState } from "react";
import { copyToClipboard } from "@/lib/copy-to-clipboard";
import { useI18n } from "@/components/layout/LocaleProvider";

interface CopyButtonProps {
  text?: string;
  getText?: () => string;
  label?: string;
  className?: string;
}

export function CopyButton({ text, getText, label, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const { t } = useI18n();
  const defaultLabel = label ?? t("common.copy");
  const currentLabel = copied ? t("common.copied") : defaultLabel;

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
          ? "bg-green-100 text-green-700 border border-green-300 dark:bg-green-900/40 dark:text-green-300 dark:border-green-700"
          : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
      } ${className}`}
      aria-label={currentLabel}
    >
      {currentLabel}
    </button>
  );
}

"use client";

import { downloadFile } from "@/lib/download-file";

interface DownloadButtonProps {
  content: string;
  filename: string;
  mimeType?: string;
  label?: string;
  className?: string;
}

export function DownloadButton({
  content,
  filename,
  mimeType,
  label = "Download",
  className = "",
}: DownloadButtonProps) {
  return (
    <button
      onClick={() => downloadFile(content, filename, mimeType)}
      className={`px-3 py-1.5 text-sm font-medium rounded-md bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 transition-colors ${className}`}
      aria-label={label}
    >
      {label}
    </button>
  );
}

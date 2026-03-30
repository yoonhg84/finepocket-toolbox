"use client";

import { useCallback, useState, useRef } from "react";
import { useI18n } from "@/components/layout/LocaleProvider";

interface FileUploadProps {
  accept?: string;
  onFileRead: (content: string, filename: string) => void;
  readAs?: "text" | "dataURL" | "arrayBuffer";
  label?: string;
}

export function FileUpload({
  accept = "*",
  onFileRead,
  readAs = "text",
  label,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useI18n();
  const resolvedLabel = label ?? t("common.dragDropFile");

  const handleFile = useCallback(
    (file: File) => {
      setLoading(true);
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        onFileRead(reader.result as string, file.name);
        setLoading(false);
      };
      reader.onerror = () => {
        setLoading(false);
      };
      if (readAs === "dataURL") {
        reader.readAsDataURL(file);
      } else if (readAs === "arrayBuffer") {
        reader.readAsArrayBuffer(file);
        return;
      } else {
        reader.readAsText(file);
      }
    },
    [onFileRead, readAs]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors text-sm ${
        isDragging
          ? "border-blue-400 bg-blue-50 text-blue-600 dark:border-blue-500 dark:bg-blue-900/30 dark:text-blue-400"
          : "border-gray-300 text-gray-500 hover:border-gray-400 dark:border-gray-600 dark:text-gray-400 dark:hover:border-gray-500"
      }`}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span>{t("common.loading", undefined, "Loading...")}</span>
        </div>
      ) : fileName ? (
        <div className="flex items-center justify-center gap-2">
          <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="truncate max-w-[200px]">{fileName}</span>
        </div>
      ) : (
        <p>{resolvedLabel}</p>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
}

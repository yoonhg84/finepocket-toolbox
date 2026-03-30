"use client";

import { useCallback, useState, useRef } from "react";

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
  label = "Drop a file here or click to browse",
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        onFileRead(reader.result as string, file.name);
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
          ? "border-blue-400 bg-blue-50 text-blue-600"
          : "border-gray-300 text-gray-500 hover:border-gray-400"
      }`}
    >
      <p>{label}</p>
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
